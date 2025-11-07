// API Configuration
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 10000,
  ENDPOINTS: {
    AUTH: {
      FARMER_LOGIN: '/auth/farmer/login',
      FARMER_REGISTER: '/auth/farmer/register',
      ADMIN_LOGIN: '/auth/admin/login',
      PROFILE: '/auth/profile',
      LOGOUT: '/auth/logout'
    },
    PRODUCTS: {
      BASE: '/products',
      PENDING: '/admin/products/pending',
      VERIFY: '/admin/products/verify'
    },
    ADMIN: {
      USERS: '/admin/users',
      STATS: '/admin/stats'
    }
  }
};

export default API_CONFIG;