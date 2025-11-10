import express from 'express';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

// Load env variables
dotenv.config();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Server Configuration
const serverConfig = {
  port: process.env.PORT || 5001,
  env: process.env.NODE_ENV || 'development',
  cors: {
    enabled: true,
    origins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000', 'http://localhost:3001']
  },
  upload: {
    maxFileSize: '10mb'
  },
  security: {
    helmet: true,
    rateLimit: true
  }
};

// Database Configuration
const dbConfig = {
  url: process.env.MONGODB_URI || 'mongodb://localhost:27017/proauthenticate',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
};

// Cloudinary Configuration
const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
};

// Apply middleware
app.use(cors({
  origin: serverConfig.cors.origins,
  credentials: true
}));

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5 // limit auth requests to 5 per windowMs
});

app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: serverConfig.upload.maxFileSize }));
app.use(express.urlencoded({ extended: true, limit: serverConfig.upload.maxFileSize }));

// Configure Cloudinary
cloudinary.config(cloudinaryConfig);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});



// ✅ STATIC FILE SERVING
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/api/uploads', express.static(uploadsDir));

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory:', uploadsDir);
}

// ✅ IMPORT AND MOUNT AUTH ROUTES
import authRoutes from './routes/auth.js';
app.use('/api/auth', authRoutes);
app.use('/api/auth', authLimiter); // Apply rate limiting to auth routes

// ✅ SIMPLE AI MOCK SERVICE
class BananaQualityPredictor {
  constructor() {
    this.isModelLoaded = true;
    this.classNames = ['1-2_poor', '3-4_low', '5-6_medium', '7-8_good', '9-10_excellent'];
    console.log('🤖 AI Service: MOCK MODE ENABLED');
  }

  async predictQuality(imageBuffer) {
    // Mock AI analysis - returns realistic quality scores
    const qualities = [
      { 
        score: 9.2, 
        quality: '9-10_excellent', 
        description: 'Unripe - Excellent quality for storage', 
        confidence: 0.92,
        quality_display: 'Excellent (9-10)'
      },
      { 
        score: 7.8, 
        quality: '7-8_good', 
        description: 'Slightly Unripe - Good quality', 
        confidence: 0.87,
        quality_display: 'Good (7-8)'
      },
      { 
        score: 5.5, 
        quality: '5-6_medium', 
        description: 'Perfectly Ripe - Good for eating', 
        confidence: 0.85,
        quality_display: 'Medium (5-6)'
      },
      { 
        score: 3.2, 
        quality: '3-4_low', 
        description: 'Ripe - Low quality, acceptable', 
        confidence: 0.78,
        quality_display: 'Low (3-4)'
      },
      { 
        score: 1.5, 
        quality: '1-2_poor', 
        description: 'Overripe - Not suitable for consumption', 
        confidence: 0.91,
        quality_display: 'Poor (1-2)'
      }
    ];
    
    // Weighted random selection
    const weights = [0.25, 0.35, 0.25, 0.10, 0.05];
    let randomIndex = 0;
    const random = Math.random();
    
    if (random < weights[0]) randomIndex = 0;
    else if (random < weights[0] + weights[1]) randomIndex = 1;
    else if (random < weights[0] + weights[1] + weights[2]) randomIndex = 2;
    else if (random < weights[0] + weights[1] + weights[2] + weights[3]) randomIndex = 3;
    else randomIndex = 4;
    
    const selectedQuality = qualities[randomIndex];
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    
    return {
      ...selectedQuality,
      is_banana: true
    };
  }
}

// Initialize AI Predictor
const bananaPredictor = new BananaQualityPredictor();

// ✅ SAFE PRODUCT MODEL DEFINITION
let Product;

try {
  // Try to get existing model first
  Product = mongoose.model('Product');
} catch {
  // If model doesn't exist, create it
  const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    status: { 
      type: String, 
      default: 'PENDING',
      enum: ['PENDING', 'APPROVED', 'REJECTED']
    },
    farmerName: {
      type: String,
      required: true
    },
    farmName: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    contact: String,
    images: [String],
    aiRating: {
      score: { type: Number, min: 1, max: 10 },
      quality: String,
      quality_display: String,
      description: String,
      confidence: Number,
      analyzedAt: Date
    },
    verificationId: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  Product = mongoose.model('Product', productSchema);
}

// ✅ SAFE USER MODEL DEFINITION
let User;

try {
  // Try to get existing model first
  User = mongoose.model('User');
} catch {
  // If model doesn't exist, create it
  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ['farmer', 'admin', 'customer'],
      default: 'farmer'
    },
    phone: {
      type: String,
      trim: true
    },
    farmName: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date
    }
  }, {
    timestamps: true
  });

  User = mongoose.model('User', userSchema);
}

// MongoDB Connection
const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(dbConfig.url, dbConfig.options);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.log('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// ✅ CREATE DEFAULT ADMIN USER
const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (!existingAdmin) {
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.default.hash('admin123', 10);
      
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@proauthenticate.com',
        password: hashedPassword,
        role: 'admin',
        verificationStatus: 'verified',
        isActive: true
      });
      
      await adminUser.save();
      console.log('✅ Default admin user created: admin@proauthenticate.com / admin123');
    }
  } catch (error) {
    console.log('⚠️ Could not create default admin:', error.message);
  }
};

// Add this after the admin routes (around line 350)

// ✅ AUTHENTICATION MIDDLEWARE FOR ALL AUTHENTICATED USERS
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const jwt = await import('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. User not found.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

// ✅ GET FARMER'S PRODUCTS
app.get('/api/farmer/products', authenticateToken, async (req, res) => {
  try {
    console.log('👨‍🌾 Fetching farmer products for:', req.user.name);
    
    // Get products by farmer name
    const products = await Product.find({ farmerName: req.user.name })
      .sort({ createdAt: -1 })
      .select('name category price status farmerName farmName location images aiRating verificationId createdAt description unit');

    console.log(`✅ Found ${products.length} products for farmer:`, req.user.name);

    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    console.error('❌ Get farmer products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch farmer products'
    });
  }
});

// ✅ CREATE PRODUCT FOR FARMER
app.post('/api/farmer/products', authenticateToken, upload.single('images'), async (req, res) => {
  try {
    console.log('📦 Creating product for farmer:', req.user.name);
    
    const { name, category, quantity, price, farmName, location, contact, description, unit } = req.body;

    // Validate required fields
    if (!name || !category || !quantity || !price || !location) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, category, quantity, price, location'
      });
    }

    // Create image URL if file exists
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/api/uploads/${req.file.filename}`;
      console.log('📸 Image uploaded:', imageUrl);
    }

    // Analyze image with AI if available
    let aiResult = null;
    if (req.file) {
      try {
        aiResult = await bananaPredictor.predictQuality(req.file.buffer);
        console.log('🤖 AI Analysis result:', aiResult.quality_display);
      } catch (aiError) {
        console.warn('⚠️ AI analysis failed, continuing without AI rating:', aiError.message);
      }
    }

    // Generate verification ID
    const verificationId = `PA-${category.toUpperCase().substring(0, 4)}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    // Create product data
    const productData = {
      name,
      category,
      quantity,
      unit: unit || 'kg',
      price: parseFloat(price),
      farmerName: req.user.name,
      farmName: farmName || req.user.farmName || 'Unknown Farm',
      location,
      contact: contact || req.user.phone || '',
      description: description || '',
      images: imageUrl ? [imageUrl] : [],
      verificationId,
      status: 'PENDING', // Start as pending for manual verification
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add AI rating if available
    if (aiResult) {
      productData.aiRating = {
        score: aiResult.score,
        quality: aiResult.quality,
        quality_display: aiResult.quality_display,
        description: aiResult.description,
        confidence: aiResult.confidence,
        analyzedAt: new Date()
      };
      // Auto-approve if AI rating is good
      if (aiResult.score >= 7) {
        productData.status = 'APPROVED';
      }
    }

    const newProduct = new Product(productData);
    await newProduct.save();

    console.log('✅ Product created successfully:', newProduct.name);

    res.json({
      success: true,
      data: newProduct,
      message: 'Product created successfully! ' + (productData.status === 'APPROVED' ? 'Auto-approved with AI rating.' : 'Pending admin verification.')
    });

  } catch (error) {
    console.error('❌ Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product: ' + error.message
    });
  }
});
// ✅ AUTHENTICATION MIDDLEWARE FOR ADMIN ROUTES
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Dynamic import for JWT
    const jwt = await import('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    
    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Admin authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

// ✅ ADMIN STATISTICS ENDPOINT
app.get('/api/admin/stats', authenticateAdmin, async (req, res) => {
  try {
    console.log('📊 Fetching admin statistics...');
    
    // Get total farmers count
    const totalFarmers = await User.countDocuments({ role: 'farmer' });
    
    // Get verified farmers count
    const verifiedFarmers = await User.countDocuments({ 
      role: 'farmer', 
      verificationStatus: 'verified' 
    });
    
    // Get total products count
    const totalProducts = await Product.countDocuments();
    
    // Get pending products count
    const pendingProducts = await Product.countDocuments({ status: 'PENDING' });

    const stats = {
      farmers: {
        total: totalFarmers,
        verified: verifiedFarmers,
        pending: totalFarmers - verifiedFarmers
      },
      products: {
        total: totalProducts,
        pending: pendingProducts,
        approved: totalProducts - pendingProducts
      }
    };

    console.log('✅ Admin stats fetched:', stats);

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('❌ Admin stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin statistics'
    });
  }
});

// ✅ ADMIN ALL PRODUCTS ENDPOINT
app.get('/api/admin/all-products', authenticateAdmin, async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .select('name category price status farmerName farmName location images aiRating verificationId createdAt');

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('❌ Get all products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

// ✅ ADMIN PENDING PRODUCTS ENDPOINT
app.get('/api/admin/pending-products', authenticateAdmin, async (req, res) => {
  try {
    const products = await Product.find({ status: 'PENDING' })
      .sort({ createdAt: -1 })
      .select('name category price status farmerName farmName location images aiRating verificationId createdAt');

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('❌ Get pending products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending products'
    });
  }
});

// ✅ UPDATE PRODUCT VERIFICATION STATUS
app.patch('/api/admin/products/:productId/verify', authenticateAdmin, async (req, res) => {
  try {
    const { productId } = req.params;
    const { status } = req.body;

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be APPROVED or REJECTED'
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        status,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    console.log(`✅ Product ${status.toLowerCase()}:`, updatedProduct.name);

    res.json({
      success: true,
      data: updatedProduct,
      message: `Product ${status.toLowerCase()} successfully`
    });

  } catch (error) {
    console.error('❌ Verify product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product status'
    });
  }
});

// ✅ UPLOAD PRODUCT WITH IMAGE
app.post('/api/products/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    const { name, category, quantity, price, farmerName, farmName, location, contact } = req.body;

    // Validate required fields
    if (!name || !category || !quantity || !price || !farmerName || !farmName || !location) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create image URL
    const imageUrl = `/api/uploads/${req.file.filename}`;

    console.log('📸 Processing product upload with image:', req.file.filename);

    // Analyze image with AI
    const aiResult = await bananaPredictor.predictQuality(req.file.buffer);

    // Generate verification ID
    const verificationId = `PA-${category.toUpperCase().substring(0, 4)}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    // Create product with AI rating
    const productData = {
      name,
      category,
      quantity,
      price: parseFloat(price),
      farmerName,
      farmName,
      location,
      contact: contact || '',
      images: [imageUrl],
      aiRating: {
        score: aiResult.score,
        quality: aiResult.quality,
        quality_display: aiResult.quality_display,
        description: aiResult.description,
        confidence: aiResult.confidence,
        analyzedAt: new Date()
      },
      verificationId,
      status: 'APPROVED' // Auto-approve with AI rating
    };

    const newProduct = new Product(productData);
    await newProduct.save();

    console.log('✅ Product created with AI rating:', aiResult.quality_display);

    res.json({
      success: true,
      product: newProduct,
      ai_analysis: aiResult,
      message: 'Product uploaded and AI quality analysis completed successfully'
    });

  } catch (error) {
    console.error('❌ Product upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload product: ' + error.message
    });
  }
});

// ✅ MANUAL AI ANALYSIS FOR EXISTING PRODUCTS
app.post('/api/admin/analyze-product/:productId', authenticateAdmin, async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    console.log('🔍 Manual AI analysis for product:', productId);

    // Analyze with AI (mock)
    const aiResult = await bananaPredictor.predictQuality(Buffer.from('mock'));

    // Update product with AI rating
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          'aiRating': {
            score: aiResult.score,
            quality: aiResult.quality,
            quality_display: aiResult.quality_display,
            description: aiResult.description,
            confidence: aiResult.confidence,
            analyzedAt: new Date()
          },
          'status': 'APPROVED',
          updatedAt: new Date()
        }
      },
      { new: true }
    );

    console.log('✅ Manual AI analysis complete:', aiResult.quality_display);

    res.json({
      success: true,
      product: updatedProduct,
      ai_analysis: aiResult,
      message: 'AI quality analysis completed successfully'
    });

  } catch (error) {
    console.error('❌ Manual analysis error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'AI analysis failed'
    });
  }
});

// ✅ GET APPROVED PRODUCTS WITH AI RATINGS (CUSTOMERS)
app.get('/api/customer/products', async (req, res) => {
  try {
    const products = await Product.find({ status: 'APPROVED' })
      .sort({ 'aiRating.score': -1, createdAt: -1 })
      .select('name category price farmerName farmName location images aiRating verificationId');

    res.json({
      success: true,
      products: products,
      count: products.length
    });
  } catch (error) {
    console.error('❌ Get customer products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

// ✅ AI HEALTH CHECK ENDPOINT
app.get('/api/ai/health', (req, res) => {
  res.json({
    success: true,
    ai_service: 'Banana Quality Analyzer',
    model_loaded: true,
    status: '🟢 AI Ready (Mock Mode)',
    available_classes: bananaPredictor.classNames,
    timestamp: new Date().toISOString(),
    note: 'Running in mock mode with realistic quality assessments'
  });
});

// Health check and test routes
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy 🟢',
    timestamp: new Date().toISOString(),
    environment: serverConfig.env,
    port: serverConfig.port,
    database: mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected',
    cloudinary: !!cloudinaryConfig.cloud_name ? '✅ Configured' : '❌ Not configured',
    staticFiles: '✅ Enabled',
    ai_service: '✅ Mock Mode'
  });
});

app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'All systems operational! 🚀',
    server: {
      port: serverConfig.port,
      environment: serverConfig.env,
      cors: serverConfig.cors.enabled
    },
    features: {
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      cloudinary: !!cloudinaryConfig.cloud_name ? 'configured' : 'not configured',
      uploads: 'enabled',
      staticFiles: 'enabled',
      ai_service: 'mock mode'
    }
  });
});

// Static files test endpoint
app.get('/api/test-static-files', (req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir).slice(0, 5); // Show first 5 files
    
    const fileStatus = files.map(file => {
      const filePath = path.join(uploadsDir, file);
      const stats = fs.statSync(filePath);
      return {
        file,
        size: (stats.size / 1024).toFixed(2) + ' KB',
        url: `http://localhost:${serverConfig.port}/api/uploads/${file}`,
        accessible: true
      };
    });

    res.json({
      success: true,
      message: 'Static files configuration test',
      uploadsDirectory: uploadsDir,
      staticRoute: '/api/uploads',
      files: fileStatus,
      totalFiles: fs.readdirSync(uploadsDir).length
    });
  } catch (error) {
    res.json({
      success: true,
      message: 'Static files configuration test',
      uploadsDirectory: uploadsDir,
      files: [],
      note: 'No files in uploads directory yet'
    });
  }
});

// Enhanced Cloudinary test endpoint
app.get('/api/cloudinary/test', async (req, res) => {
  try {
    if (!cloudinaryConfig.cloud_name) {
      return res.status(500).json({
        success: false,
        message: 'Cloudinary not configured',
        note: 'Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env'
      });
    }

    const result = await cloudinary.api.ping();
    res.json({
      success: true,
      message: 'Cloudinary connected successfully',
      cloud_name: cloudinaryConfig.cloud_name,
      status: '✅ Connected'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Cloudinary configuration issue',
      error: error.message,
      config: {
        cloud_name: cloudinaryConfig.cloud_name ? '✅ Set' : '❌ Missing',
        api_key: cloudinaryConfig.api_key ? '✅ Set' : '❌ Missing',
        api_secret: cloudinaryConfig.api_secret ? '✅ Set' : '❌ Missing'
      }
    });
  }
});

// In your FarmerDashboard.js, update the fetchProducts function:
const fetchProducts = async () => {
  try {
    const token = localStorage.getItem('authToken');
    
    const response = await axios.get('/api/farmer/products', {
      headers: { 
        Authorization: `Bearer ${token}` 
      }
    });
    
    setProducts(response.data.products);
  } catch (error) {
    console.error('Error fetching products:', error);
    console.error('Error details:', error.response?.data);
  }
};

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🚨 Global Error Handler:', err);

  // Multer file filter error
  if (err.message === 'Only image files are allowed!') {
    return res.status(400).json({
      success: false,
      message: 'Only image files are allowed!'
    });
  }

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File too large. Maximum size is 10MB.'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(serverConfig.env === 'development' && { stack: err.stack })
  });
});

// Start Server
const startServer = async () => {
  await connectDB();
  await createDefaultAdmin(); // Create default admin user
  
  const PORT = serverConfig.port;
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 PROAUTHENTICATE BACKEND SERVER STARTED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log(`📍 Server Port: ${PORT}`);
    console.log(`🌍 Environment: ${serverConfig.env}`);
    console.log(`🌐 CORS Enabled: ${serverConfig.cors.enabled}`);
    console.log(`🗄️  Database: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Not connected'}`);
    console.log(`☁️  Cloudinary: ${cloudinaryConfig.cloud_name ? '✅ Configured' : '❌ Not configured'}`);
    console.log(`📁 Static Files: ✅ Enabled (${uploadsDir})`);
    console.log(`🤖 AI Service: 🟢 MOCK MODE (Realistic Quality Ratings)`);
    console.log(`⭐ AI Rating System: ✅ Fully Functional`);
    console.log(`👤 Default Admin: admin@proauthenticate.com / admin123`);
    console.log(`📱 API URL: http://localhost:${PORT}/api`);
    console.log('='.repeat(60));
    console.log('\n📋 Available Endpoints:');
    console.log('   ✅ GET  /api/admin/stats - Admin statistics');
    console.log('   ✅ GET  /api/admin/all-products - All products (admin)');
    console.log('   ✅ GET  /api/admin/pending-products - Pending products (admin)');
    console.log('   ✅ PATCH /api/admin/products/:id/verify - Verify product');
    console.log('   ✅ POST /api/auth/register - Register user');
    console.log('   ✅ POST /api/auth/login - User login');
    console.log('   ✅ POST /api/auth/admin-login - Admin login');
    console.log('   ✅ POST /api/products/upload - Upload product + Auto AI analysis');
    console.log('   ✅ POST /api/admin/analyze-product/:id - Manual AI analysis');
    console.log('   ✅ GET  /api/customer/products - Customer view (approved + AI rated)');
    console.log('   ✅ GET  /api/ai/health - AI service status');
    console.log('   ✅ GET  /api/health - Server health check');
    console.log('='.repeat(60) + '\n');
  });
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('❌ Unhandled Promise Rejection:', err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('❌ Uncaught Exception:', err.message);
  process.exit(1);
});

startServer();