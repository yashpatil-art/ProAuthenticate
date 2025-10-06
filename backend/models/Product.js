import express from 'express';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// ✅ Create a new product (with image upload)
router.post('/', auth, upload.array('images', 5), async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      quantity,
      unit,
      farmLocation,
      harvestDate,
      qualityParameters
    } = req.body;

    // Get image URLs from uploaded files
    const images = req.files ? req.files.map(file => `/uploads/products/${file.filename}`) : [];

    const product = new Product({
      name,
      description,
      category,
      price: parseFloat(price),
      quantity: parseFloat(quantity),
      unit: unit || 'kg',
      images,
      farmer: req.user.userId,
      farmLocation,
      harvestDate,
      qualityParameters: qualityParameters ? JSON.parse(qualityParameters) : {}
    });

    await product.save();

    // Populate farmer details
    await product.populate('farmer', 'name farmName location');

    res.status(201).json({
      success: true,
      message: 'Product created successfully and submitted for verification!',
      data: product
    });
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
});

// ✅ Get all products for a farmer
router.get('/my-products', auth, async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.user.userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

// ✅ Get all products (for marketplace)
router.get('/', async (req, res) => {
  try {
    const { category, verified, farmer } = req.query;
    let filter = { isActive: true };

    if (category) filter.category = category;
    if (verified === 'true') filter.verificationStatus = 'approved';
    if (farmer) filter.farmer = farmer;

    const products = await Product.find(filter)
      .populate('farmer', 'name farmName location')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

// ✅ Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('farmer', 'name farmName location phone')
      .populate('verifiedBy', 'name');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
});

// ✅ Update product
router.put('/:id', auth, upload.array('images', 5), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if farmer owns the product
    if (product.farmer.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    const updates = { ...req.body };
    
    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/products/${file.filename}`);
      updates.images = [...product.images, ...newImages];
    }

    // Parse quality parameters if provided
    if (updates.qualityParameters) {
      updates.qualityParameters = JSON.parse(updates.qualityParameters);
    }

    // Parse numbers
    if (updates.price) updates.price = parseFloat(updates.price);
    if (updates.quantity) updates.quantity = parseFloat(updates.quantity);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('farmer', 'name farmName location');

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
});

// ✅ Delete product
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if farmer owns the product
    if (product.farmer.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this product'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
});

// ✅ Verify product (Admin only)
router.patch('/:id/verify', auth, async (req, res) => {
  try {
    const { verificationStatus, blockchainTransactionHash } = req.body;
    const user = req.user;

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admin can verify products'
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.verificationStatus = verificationStatus;
    product.verifiedBy = user.userId;
    product.verifiedAt = new Date();
    
    if (blockchainTransactionHash) {
      product.blockchainTransactionHash = blockchainTransactionHash;
    }

    await product.save();
    await product.populate('farmer', 'name email farmName');
    await product.populate('verifiedBy', 'name');

    res.json({
      success: true,
      message: `Product ${verificationStatus} successfully`,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to verify product',
      error: error.message
    });
  }
});

export default router;