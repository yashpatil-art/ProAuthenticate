import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

// CORS configuration
export const corsConfig = cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://proauthenticate.com',
      'https://www.proauthenticate.com',
      process.env.FRONTEND_URL
    ].filter(Boolean);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
});

// Rate limiting configuration
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiting for auth endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs for auth
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Security headers with Helmet
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false
});

// Compression configuration
export const compressionConfig = compression({
  level: 6,
  threshold: 100 * 1024 // Compress responses larger than 100KB
});

// Morgan logging configuration
export const loggingConfig = morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev');

// Server configuration
export const serverConfig = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  api: {
    prefix: '/api',
    version: 'v1'
  },
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
  }
};

// Error handling configuration
export const errorConfig = {
  showStack: process.env.NODE_ENV !== 'production',
  logErrors: true
};

export default {
  corsConfig,
  limiter,
  authLimiter,
  securityHeaders,
  compressionConfig,
  loggingConfig,
  serverConfig,
  errorConfig
};