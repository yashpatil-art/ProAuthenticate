import express from 'express';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import configurations
import serverConfig from './config/server.js';

// Load env variables
dotenv.config();

// Import Routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import adminRoutes from './routes/admin.js';

// Initialize Express app
const app = express();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Apply middleware from configuration
app.use(serverConfig.corsConfig);
app.use(serverConfig.securityHeaders);
app.use(serverConfig.compressionConfig);
app.use(serverConfig.loggingConfig);

// Apply rate limiting
app.use(serverConfig.limiter);
app.use('/api/auth', serverConfig.authLimiter);

// Body parsing middleware
app.use(express.json({ limit: serverConfig.serverConfig.upload.maxFileSize }));
app.use(express.urlencoded({ extended: true, limit: serverConfig.serverConfig.upload.maxFileSize }));

// Configure Cloudinary
cloudinary.config(serverConfig.cloudinaryConfig);

// ✅ STATIC FILE SERVING - ADD THIS SECTION
// Serve static files from uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/api/uploads', express.static(uploadsDir));

// Create uploads directory if it doesn't exist
import fs from 'fs';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory:', uploadsDir);
}

// MongoDB Connection
const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(serverConfig.dbConfig.url, serverConfig.dbConfig.options);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.log('❌ MongoDB connection error:', error.message);
    console.log('⚠️  Starting without database connection...');
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

// Health check and test routes
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy 🟢',
    timestamp: new Date().toISOString(),
    environment: serverConfig.serverConfig.env,
    port: serverConfig.serverConfig.port,
    database: mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected',
    cloudinary: !!serverConfig.cloudinaryConfig.cloud_name ? '✅ Configured' : '❌ Not configured',
    staticFiles: '✅ Enabled'
  });
});

app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'All systems operational! 🚀',
    server: {
      port: serverConfig.serverConfig.port,
      environment: serverConfig.serverConfig.env,
      cors: serverConfig.serverConfig.cors.enabled
    },
    features: {
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      cloudinary: !!serverConfig.cloudinaryConfig.cloud_name ? 'configured' : 'not configured',
      uploads: 'enabled',
      staticFiles: 'enabled'
    }
  });
});

// ✅ ADD STATIC FILES TEST ENDPOINT
app.get('/api/test-static-files', (req, res) => {
  const testFiles = [
    'products/product-1781649078286-236520009.webp',
    'products/product-1761649078288-506400565.webp'
  ];
  
  const fileStatus = testFiles.map(file => {
    const filePath = path.join(uploadsDir, file);
    const exists = fs.existsSync(filePath);
    return {
      file,
      exists,
      url: `http://localhost:${serverConfig.serverConfig.port}/api/uploads/${file}`,
      directPath: filePath
    };
  });

  res.json({
    success: true,
    message: 'Static files configuration test',
    uploadsDirectory: uploadsDir,
    staticRoute: '/api/uploads',
    files: fileStatus,
    note: 'Access files via: http://localhost:5001/api/uploads/products/filename.webp'
  });
});

// Enhanced Cloudinary test endpoint
app.get('/api/cloudinary/test', async (req, res) => {
  try {
    if (!serverConfig.cloudinaryConfig.cloud_name) {
      return res.status(500).json({
        success: false,
        message: 'Cloudinary not configured',
        note: 'Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env'
      });
    }

    const result = await cloudinary.api.root_folders();
    res.json({
      success: true,
      message: 'Cloudinary connected successfully',
      cloud_name: serverConfig.cloudinaryConfig.cloud_name,
      folders: result.folders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Cloudinary configuration issue',
      error: error.message,
      config: {
        cloud_name: serverConfig.cloudinaryConfig.cloud_name ? '✅ Set' : '❌ Missing',
        api_key: serverConfig.cloudinaryConfig.api_key ? '✅ Set' : '❌ Missing',
        api_secret: serverConfig.cloudinaryConfig.api_secret ? '✅ Set' : '❌ Missing'
      }
    });
  }
});

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

  // CORS error
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'CORS Error: Origin not allowed'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(serverConfig.errorConfig.showStack && { stack: err.stack })
  });
});

// Start Server
const startServer = async () => {
  await connectDB();
  
  const PORT = serverConfig.serverConfig.port;
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 PROAUTHENTICATE BACKEND SERVER STARTED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log(`📍 Server Port: ${PORT}`);
    console.log(`🌍 Environment: ${serverConfig.serverConfig.env}`);
    console.log(`🌐 CORS Enabled: ${serverConfig.serverConfig.cors.enabled}`);
    console.log(`🗄️  Database: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Not connected'}`);
    console.log(`☁️  Cloudinary: ${serverConfig.cloudinaryConfig.cloud_name ? '✅ Configured' : '❌ Not configured'}`);
    console.log(`📁 Static Files: ✅ Enabled (${uploadsDir})`);
    console.log(`📱 API URL: http://localhost:${PORT}/api`);
    console.log('='.repeat(60));
    console.log('\n📋 Available Endpoints:');
    console.log('   ✅ GET  /api/health           - Server health check');
    console.log('   ✅ GET  /api/test             - Test all features');
    console.log('   ✅ GET  /api/cloudinary/test  - Test Cloudinary');
    console.log('   ✅ GET  /api/test-static-files - Test static file serving');
    console.log('   ✅ POST /api/auth/login       - Login user');
    console.log('   ✅ POST /api/auth/register    - Register user');
    console.log('   ✅ POST /api/products         - Create product');
    console.log('='.repeat(60) + '\n');
    
    // Show static file access examples
    console.log('📁 Static File Access Examples:');
    console.log(`   📷 http://localhost:${PORT}/api/uploads/products/product-1781649078286-236520009.webp`);
    console.log(`   📷 http://localhost:${PORT}/api/uploads/products/product-1761649078288-506400565.webp`);
    console.log('='.repeat(60) + '\n');
  });
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('❌ Unhandled Promise Rejection:', err.message);
  if (serverConfig.errorConfig.exitOnError) {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('❌ Uncaught Exception:', err.message);
  if (serverConfig.errorConfig.exitOnError) {
    process.exit(1);
  }
});

startServer();