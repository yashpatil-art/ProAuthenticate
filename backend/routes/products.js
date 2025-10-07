import express from 'express';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/products/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
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

// ✅ TEST ROUTE - Check if routes are working
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Products route is working!'
  });
});

// ✅ Create a new product (with image upload)
router.post('/', auth, upload.array('images', 5), async (req, res) => {
  try {
    console.log('=== PRODUCT CREATION STARTED ===');
    
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

    // Basic validation
    if (!name || !description || !category || !price || !quantity || !farmLocation || !harvestDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Get image URLs from uploaded files
    const images = req.files ? req.files.map(file => `/uploads/products/${file.filename}`) : [];

    // Create product
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
      harvestDate: new Date(harvestDate),
      qualityParameters: qualityParameters ? JSON.parse(qualityParameters) : {},
      verificationStatus: 'pending'
    });

    await product.save();

    // Populate farmer details
    await product.populate('farmer', 'name farmName location');

    console.log('=== PRODUCT CREATION SUCCESS ===');
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
    console.log('Fetching products for user:', req.user.userId);
    
    const products = await Product.find({ farmer: req.user.userId })
      .populate('farmer', 'name farmName location')
      .sort({ createdAt: -1 });

    console.log('Found products:', products.length);
    res.json({
      success: true,
      data: products
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

export default router;