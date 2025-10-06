import Product from '../models/Product.js';
import User from '../models/User.js';

// Get all products with filters
export const getProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    
    // Build filter object
    let filter = { verificationStatus: 'approved', isActive: true };
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(filter)
      .populate('farmer', 'name location')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      pages: Math.ceil(total / limit),
      products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// Get single product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('farmer', 'name email phone location');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

// Farmer uploads product
export const createProduct = async (req, res) => {
  try {
    const farmer = await User.findById(req.userId);
    
    if (farmer.role !== 'farmer') {
      return res.status(403).json({
        success: false,
        message: 'Only farmers can upload products'
      });
    }

    const productData = {
      ...req.body,
      farmer: req.userId,
      images: req.files ? req.files.map(file => `/uploads/${file.filename}`) : []
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product submitted for verification',
      product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

// Verify product authenticity
export const verifyProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ verificationId: req.params.id })
      .populate('farmer', 'name location')
      .populate('verifiedBy', 'name');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      product: {
        id: product._id,
        name: product.name,
        verificationId: product.verificationId,
        verificationStatus: product.verificationStatus,
        blockchainTransactionHash: product.blockchainTransactionHash,
        verifiedAt: product.verifiedAt,
        farmer: product.farmer,
        verifiedBy: product.verifiedBy
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying product',
      error: error.message
    });
  }
};