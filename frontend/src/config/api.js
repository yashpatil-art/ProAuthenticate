const API_CONFIG = {
  // Use environment variable or default to localhost
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      PROFILE: '/auth/profile'
    },
    PRODUCTS: {
      CREATE: '/products',
      LIST: '/products',
      MY_PRODUCTS: '/products/my-products',
      DETAIL: '/products/:id',
      VERIFY: '/products/verify/:id'
    },
    HEALTH: '/health'
  },
  TIMEOUT: 10000
};

export default API_CONFIG;