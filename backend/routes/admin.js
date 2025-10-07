import express from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js'; // Make sure you have User model
import auth from '../middleware/auth.js';

const router = express.Router();

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
  next();
};

// ✅ Get all pending products for admin
router.get('/pending-products', auth, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const pendingProducts = await Product.find({ 
      verificationStatus: 'pending',
      isActive: true 
    })
      .populate('farmer', 'name email phone farmName location')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments({ 
      verificationStatus: 'pending',
      isActive: true 
    });

    res.json({
      success: true,
      data: pendingProducts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error fetching pending products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending products',
      error: error.message
    });
  }
});

// ✅ Get all products for admin dashboard
router.get('/all-products', auth, requireAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let filter = { isActive: true };

    if (status && status !== 'all') {
      filter.verificationStatus = status;
    }

    const products = await Product.find(filter)
      .populate('farmer', 'name email phone farmName location')
      .populate('verifiedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      data: products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

// ✅ Verify/Approve a product
router.patch('/products/:id/verify', auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either "approved" or "rejected"'
      });
    }

    const updateData = {
      verificationStatus: status,
      verifiedBy: req.user.userId,
      verifiedAt: new Date()
    };

    // Add rejection reason if provided
    if (status === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    // For approved products, you might want to add blockchain transaction hash
    if (status === 'approved') {
      // Simulate blockchain transaction - replace with actual blockchain integration
      updateData.blockchainTransactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('farmer', 'name email')
     .populate('verifiedBy', 'name email');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: `Product ${status} successfully`,
      data: product
    });
  } catch (error) {
    console.error('Error verifying product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify product',
      error: error.message
    });
  }
});

// ✅ Get dashboard statistics
router.get('/stats', auth, requireAdmin, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ isActive: true });
    const pendingProducts = await Product.countDocuments({ 
      verificationStatus: 'pending',
      isActive: true 
    });
    const approvedProducts = await Product.countDocuments({ 
      verificationStatus: 'approved',
      isActive: true 
    });
    const rejectedProducts = await Product.countDocuments({ 
      verificationStatus: 'rejected',
      isActive: true 
    });

    // Count farmers (users with role 'farmer')
    const totalFarmers = await User.countDocuments({ role: 'farmer' });
    const pendingFarmers = await User.countDocuments({ 
      role: 'farmer', 
      verificationStatus: 'pending' // Add this field to your User model
    });
    const verifiedFarmers = await User.countDocuments({ 
      role: 'farmer', 
      verificationStatus: 'approved' 
    });

    res.json({
      success: true,
      data: {
        products: {
          total: totalProducts,
          pending: pendingProducts,
          approved: approvedProducts,
          rejected: rejectedProducts
        },
        farmers: {
          total: totalFarmers,
          pending: pendingFarmers,
          verified: verifiedFarmers
        }
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
});

export default router;