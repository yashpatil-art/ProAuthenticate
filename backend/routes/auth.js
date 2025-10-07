import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// ✅ Register User (Updated to handle all farmer fields)
router.post('/register', async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      role, 
      phone, 
      farmName, 
      location, 
      products,
      address,
      shippingAddress
    } = req.body;

    console.log('📝 Registration request received:', { 
      name, email, role, phone, farmName, location 
    });

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user data object
    const userData = {
      name,
      email,
      password: hashedPassword,
      role: role || 'buyer'
    };

    // Add role-specific fields
    if (role === 'farmer') {
      userData.phone = phone;
      userData.farmName = farmName;
      userData.location = location;
      userData.products = products || [];
      userData.verificationStatus = 'pending';
    } else if (role === 'buyer') {
      userData.address = address;
      if (shippingAddress) {
        userData.shippingAddress = shippingAddress;
      }
    }

    const user = new User(userData);
    await user.save();

    console.log('✅ User registered successfully:', user.email);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    // Prepare user response data
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt
    };

    // Add farmer-specific fields to response
    if (role === 'farmer') {
      userResponse.phone = user.phone;
      userResponse.farmName = user.farmName;
      userResponse.location = user.location;
      userResponse.products = user.products;
      userResponse.verificationStatus = user.verificationStatus;
      userResponse.canSubmitProducts = user.verificationStatus === 'approved';
    } else if (role === 'buyer') {
      userResponse.address = user.address;
      userResponse.shippingAddress = user.shippingAddress;
    }

    res.status(201).json({
      success: true,
      message: role === 'farmer' 
        ? 'Farmer registered successfully! Please wait for admin verification.' 
        : 'User registered successfully',
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    
    // Handle duplicate key error (MongoDB)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
});

// ✅ Login User (Updated to include all user fields)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Login attempt for:', email);

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    // Prepare user response data
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt
    };

    // Add role-specific fields
    if (user.role === 'farmer') {
      userResponse.phone = user.phone;
      userResponse.farmName = user.farmName;
      userResponse.location = user.location;
      userResponse.products = user.products;
      userResponse.verificationStatus = user.verificationStatus;
      userResponse.canSubmitProducts = user.verificationStatus === 'approved';
      userResponse.documents = user.documents;
    } else if (user.role === 'buyer') {
      userResponse.address = user.address;
      userResponse.shippingAddress = user.shippingAddress;
    }

    console.log('✅ Login successful for:', user.email);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
});

// ✅ Get Current User Profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prepare user response
    const userResponse = user.toObject();
    
    // Add virtual fields
    if (user.role === 'buyer') {
      userResponse.fullAddress = user.fullAddress;
    }
    if (user.role === 'farmer') {
      userResponse.canSubmitProducts = user.canSubmitProducts();
    }

    res.json({
      success: true,
      data: { user: userResponse }
    });
  } catch (error) {
    console.error('❌ Profile error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// ✅ Update User Profile
router.put('/profile', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update allowed fields based on role
    const allowedFields = ['name', 'phone', 'location', 'preferences'];
    
    if (user.role === 'farmer') {
      allowedFields.push('farmName', 'products');
    } else if (user.role === 'buyer') {
      allowedFields.push('address', 'shippingAddress');
    }

    // Update fields
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    console.error('❌ Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during profile update',
      error: error.message
    });
  }
});

// Test endpoint
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Auth routes are working! 🎉',
    endpoints: {
      'POST /register': 'Register a new user',
      'POST /login': 'Login user', 
      'GET /profile': 'Get user profile (requires token)',
      'PUT /profile': 'Update user profile (requires token)'
    }
  });
});

export default router;