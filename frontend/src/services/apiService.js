import axios from 'axios';

const API_BASE = 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// API methods
export const productAPI = {
  getMyProducts: async () => {
    try {
      const response = await api.get('/products/my-products');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};


export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder-image.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  return imagePath;
};

export const authAPI = {
  login: async (email, password) => {
    try {
      console.log('🔄 authAPI.login called with:', { email });
      const response = await api.post('/auth/login', { email, password });
      console.log('✅ authAPI.login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ authAPI.login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      console.log('🔄 authAPI.register called with:', userData);
      const response = await api.post('/auth/register', userData);
      console.log('✅ authAPI.register response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ authAPI.register error:', error);
      throw error;
    }
  },
};
export default api;