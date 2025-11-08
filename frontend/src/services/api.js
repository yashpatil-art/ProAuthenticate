import axios from "axios";

// API Configuration - FIXED BASE_URL
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api', // Added full URL
  UPLOADS_URL: "http://localhost:5001/uploads", // For serving images
  TIMEOUT: 10000
};

// Helper function for image URLs
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder-image.jpg';
  
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Handle different path formats
  if (imagePath.startsWith('/uploads/')) {
    return `${API_CONFIG.UPLOADS_URL}${imagePath.replace('/uploads', '')}`;
  }
  
  if (imagePath.startsWith('/')) {
    return `${API_CONFIG.UPLOADS_URL}${imagePath}`;
  }
  
  return `${API_CONFIG.UPLOADS_URL}/${imagePath}`;
};

// Create axios instance with base configuration - FIXED
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request for debugging
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data
    });

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
      // Redirect to login page
      if (window.location.pathname !== "/login" && window.location.pathname !== "/admin-login") {
        window.location.href = "/login";
      }
    }

    // Handle network errors specifically
    if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNREFUSED') {
      console.error('🌐 Network Error: Backend server is not running or inaccessible');
    }

    return Promise.reject(error);
  }
);

// API methods for authentication
export const authAPI = {
  // Unified login - FIXED: Use the correct endpoint
  login: async (email, password, userType = 'farmer') => {
    try {
      console.log(`🔐 Attempting ${userType} login for:`, email);
      
      // Your backend uses /auth/login, not separate endpoints
      const response = await api.post('/auth/login', { 
        email, 
        password,
        userType // Send userType if your backend needs it
      });
      
      console.log('✅ Login successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Login failed:', error.response?.data || error.message);
      throw error;
    }
  },

  // Admin login (specific endpoint if needed)
  adminLogin: async (email, password) => {
    try {
      console.log(`🔐 Attempting admin login for:`, email);
      const response = await api.post("/auth/login", { 
        email, 
        password,
        role: 'admin' // Make sure your backend checks this
      });
      return response.data;
    } catch (error) {
      console.error('❌ Admin login failed:', error.response?.data || error.message);
      throw error;
    }
  },

  // Farmer login
  farmerLogin: async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register new farmer
  farmerRegister: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await api.get("/auth/profile");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await api.post("/auth/logout");
      // Clear local storage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// API methods for products
export const productAPI = {
  // Get all products
  getProducts: async () => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get farmer's products
  getMyProducts: async () => {
    try {
      const response = await api.get("/products/my-products");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single product
  getProduct: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new product (with file upload support)
  createProduct: async (productData) => {
    try {
      const response = await api.post("/products", productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update product
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// API methods for admin
export const adminAPI = {
  // Get pending products
  getPendingProducts: async () => {
    try {
      const response = await api.get("/admin/products/pending");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Verify product
  verifyProduct: async (productId, action, rejectionReason = "") => {
    try {
      const response = await api.post("/admin/products/verify", {
        productId,
        action,
        rejectionReason,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all users
  getUsers: async (role = "all", page = 1, limit = 10) => {
    try {
      const response = await api.get(
        `/admin/users?role=${role}&page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get admin stats
  getAdminStats: async () => {
    try {
      const response = await api.get("/admin/stats");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Test backend connection
export const testConnection = async () => {
  try {
    console.log('🧪 Testing backend connection...');
    const response = await api.get('/health');
    console.log('✅ Backend connection successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    throw error;
  }
};

export default api;