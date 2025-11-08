import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

// CORS configuration - UPDATED with more origins
export const corsConfig = cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001', 
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'https://proauthenticate.com',
      'https://www.proauthenticate.com',
      process.env.FRONTEND_URL
    ].filter(Boolean);

    // Log CORS requests for debugging
    console.log('🌐 CORS Request from origin:', origin);
    
    if (allowedOrigins.includes(origin) || allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      callback(null, true);
    } else {
      console.warn('🚫 CORS Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
});

// Rate limiting configuration
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased for development
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'development' // Skip in development
});

// Strict rate limiting for auth endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Increased for development
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'development' // Skip in development
});

// Security headers with Helmet - RELAXED FOR DEVELOPMENT
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "http://localhost:5001", "ws://localhost:5001"]
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" } // Allow cross-origin resources
});

// Compression configuration
export const compressionConfig = compression({
  level: 6,
  threshold: 100 * 1024 // Compress responses larger than 100KB
});

// Morgan logging configuration - ENHANCED
export const loggingConfig = morgan((tokens, req, res) => {
  return [
    `📨 ${tokens.method(req, res)}`,
    tokens.url(req, res),
    `📊 ${tokens.status(req, res)}`,
    `⏱️ ${tokens['response-time'](req, res)}ms`,
    `📍 ${req.ip}`,
    `👤 ${req.user ? req.user.id : 'Anonymous'}`
  ].join(' | ');
});

// Server configuration - UPDATED PORT to 5001
export const serverConfig = {
  port: process.env.PORT || 5001, // CHANGED FROM 5000 to 5001
  env: process.env.NODE_ENV || 'development',
  api: {
    prefix: '/api',
    version: 'v1'
  },
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  },
  cors: {
    enabled: true,
    origins: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000']
  }
};

// Error handling configuration
export const errorConfig = {
  showStack: process.env.NODE_ENV !== 'production',
  logErrors: true,
  exitOnError: false
};

// Database configuration
export const dbConfig = {
  url: process.env.MONGODB_URI || 'mongodb://localhost:27017/proauthenticate',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }
};

// JWT configuration
export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-fallback-secret-key-change-in-production',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  issuer: 'proauthenticate-api'
};

// Cloudinary configuration
export const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
};

// Export all configurations
export default {
  corsConfig,
  limiter,
  authLimiter,
  securityHeaders,
  compressionConfig,
  loggingConfig,
  serverConfig,
  errorConfig,
  dbConfig,
  jwtConfig,
  cloudinaryConfig
};