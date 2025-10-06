import jwt from 'jsonwebtoken';

// JWT configuration
export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRE || '30d',
  issuer: 'proauthenticate-api',
  audience: 'proauthenticate-users'
};

// Token generation
export const generateToken = (payload, options = {}) => {
  const tokenOptions = {
    expiresIn: jwtConfig.expiresIn,
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience,
    ...options
  };

  return jwt.sign(payload, jwtConfig.secret, tokenOptions);
};

// Token verification
export const verifyToken = (token, options = {}) => {
  const verifyOptions = {
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience,
    ...options
  };

  return jwt.verify(token, jwtConfig.secret, verifyOptions);
};

// Token decoding (without verification)
export const decodeToken = (token) => {
  return jwt.decode(token);
};

// Token refresh configuration
export const refreshTokenConfig = {
  expiresIn: '90d',
  maxRefreshCount: 5
};

// Blacklist configuration (for logout)
export const tokenBlacklist = new Set();

// Add token to blacklist
export const blacklistToken = (token) => {
  const decoded = decodeToken(token);
  if (decoded && decoded.exp) {
    // Store until expiration
    tokenBlacklist.add(token);
    
    // Auto-remove after expiration
    const expiresIn = decoded.exp * 1000 - Date.now();
    setTimeout(() => {
      tokenBlacklist.delete(token);
    }, expiresIn);
  }
};

// Check if token is blacklisted
export const isTokenBlacklisted = (token) => {
  return tokenBlacklist.has(token);
};

export default {
  jwtConfig,
  generateToken,
  verifyToken,
  decodeToken,
  refreshTokenConfig,
  blacklistToken,
  isTokenBlacklisted
};