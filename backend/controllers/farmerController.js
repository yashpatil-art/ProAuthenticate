import Product from '../models/Product.js';
import User from '../models/User.js';

// Get farmer's products
export const getFarmerProducts = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let filter = { farmer: req.userId };
    
    if (status && status !== 'all') {
      filter.verificationStatus = status;
    }

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(filter);

    // Get stats
    const stats = await Product.aggregate([
      { $match: { farmer: req.userId } },
      {
        $group: {
          _id: '$verificationStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      products,
      stats
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching farmer products',
      error: error.message
    });
  }
};

// Get farmer dashboard stats
export const getFarmerStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ farmer: req.userId });
    const approvedProducts = await Product.countDocuments({ 
      farmer: req.userId, 
      verificationStatus: 'approved' 
    });
    const pendingProducts = await Product.countDocuments({ 
      farmer: req.userId, 
      verificationStatus: 'pending' 
    });

    // Recent activity
    const recentProducts = await Product.find({ farmer: req.userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name verificationStatus createdAt');

    res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        approvedProducts,
        pendingProducts,
        rejectionRate: ((totalProducts - approvedProducts) / totalProducts * 100).toFixed(1)
      },
      recentActivity: recentProducts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching farmer stats',
      error: error.message
    });
  }
};

// Update farmer profile
export const updateFarmerProfile = async (req, res) => {
  try {
    const { name, phone, location, walletAddress } = req.body;

    const farmer = await User.findByIdAndUpdate(
      req.userId,
      { name, phone, location, walletAddress },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      farmer: {
        id: farmer._id,
        name: farmer.name,
        email: farmer.email,
        phone: farmer.phone,
        location: farmer.location,
        walletAddress: farmer.walletAddress
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};