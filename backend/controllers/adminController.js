import Product from '../models/Product.js';
import User from '../models/User.js';
import { verifyOnBlockchain } from '../utils/web3.js';

// Get pending products for verification
export const getPendingProducts = async (req, res) => {
  try {
    const pendingProducts = await Product.find({ verificationStatus: 'pending' })
      .populate('farmer', 'name email phone location')
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: pendingProducts.length,
      products: pendingProducts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pending products',
      error: error.message
    });
  }
};

// Verify/Reject product
export const verifyProduct = async (req, res) => {
  try {
    const { productId, action, rejectionReason } = req.body;
    const adminId = req.userId;

    const product = await Product.findById(productId).populate('farmer');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (action === 'approve') {
      // Verify on blockchain
      const blockchainResult = await verifyOnBlockchain({
        productId: product.verificationId,
        farmerWallet: product.farmer.walletAddress,
        productData: {
          name: product.name,
          category: product.category,
          harvestDate: product.harvestDate
        }
      });

      // Update product
      product.verificationStatus = 'approved';
      product.blockchainTransactionHash = blockchainResult.transactionHash;
      product.verifiedBy = adminId;
      product.verifiedAt = new Date();

      // TODO: Send approval email to farmer

    } else if (action === 'reject') {
      product.verificationStatus = 'rejected';
      product.rejectionReason = rejectionReason;
      
      // TODO: Send rejection email to farmer
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: `Product ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
      product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying product',
      error: error.message
    });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const { role, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    if (role && role !== 'all') {
      filter.role = role;
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filter);

    // Stats
    const userStats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      users,
      stats: userStats
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// Get admin dashboard stats
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalFarmers = await User.countDocuments({ role: 'farmer' });
    const totalProducts = await Product.countDocuments();
    const pendingVerifications = await Product.countDocuments({ verificationStatus: 'pending' });

    const productStats = await Product.aggregate([
      {
        $group: {
          _id: '$verificationStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    const recentActivity = await Product.find()
      .populate('farmer', 'name')
      .populate('verifiedBy', 'name')
      .sort({ updatedAt: -1 })
      .limit(10)
      .select('name verificationStatus farmer verifiedBy updatedAt');

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalFarmers,
        totalProducts,
        pendingVerifications
      },
      productStats,
      recentActivity
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admin stats',
      error: error.message
    });
  }
};