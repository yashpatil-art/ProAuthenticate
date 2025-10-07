import express from 'express';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'; // Regular import, not dynamic

const router = express.Router();

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist (do this once at startup)
const uploadsDir = path.join(__dirname, '../uploads/products/');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory:', uploadsDir);
}

// Configure multer for file uploads - SIMPLIFIED VERSION
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = 'product-' + uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
  }
});

// SIMPLIFIED multer configuration
const upload = multer({ 
  storage: storage
});

// ✅ Create a new product (with image upload)
router.post('/', auth, upload.array('images', 5), async (req, res) => {
  try {
    console.log('=== PRODUCT CREATION STARTED ===');
    console.log('Request files:', req.files);
    console.log('Request body:', req.body);
    console.log('Authenticated user:', req.user);

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

    // Validate required fields
    if (!name || !description || !category || !price || !quantity || !farmLocation || !harvestDate) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Get image URLs from uploaded files
    const images = req.files ? req.files.map(file => `/uploads/products/${file.filename}`) : [];

    // Create product object
    const productData = {
      name: name.trim(),
      description: description.trim(),
      category: category.trim(),
      price: parseFloat(price),
      quantity: parseFloat(quantity),
      unit: (unit || 'kg').trim(),
      images,
      farmer: req.user.userId,
      farmLocation: farmLocation.trim(),
      harvestDate: new Date(harvestDate),
      verificationStatus: 'pending'
    };

    // Add quality parameters if provided
    if (qualityParameters && qualityParameters !== '{}') {
      try {
        productData.qualityParameters = typeof qualityParameters === 'string' 
          ? JSON.parse(qualityParameters) 
          : qualityParameters;
      } catch (parseError) {
        console.warn('Failed to parse qualityParameters:', parseError);
        productData.qualityParameters = {};
      }
    } else {
      productData.qualityParameters = {};
    }

    const product = new Product(productData);
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
    console.error('=== PRODUCT CREATION ERROR ===');
    console.error('Error details:', error);
    
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

export default router;