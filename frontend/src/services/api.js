import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:5001/api", // Directly specify the backend URL
  timeout: 10000,
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
      console.log("Auth token added to request");
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      code: error.code,
    });

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
      // Redirect to login page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// API methods for authentication
export const authAPI = {
  // Farmer login
  farmerLogin: async (email, password) => {
    try {
      const response = await api.post("/auth/farmer/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Admin login
  adminLogin: async (email, password) => {
    try {
      const response = await api.post("/auth/admin/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register new farmer
  farmerRegister: async (userData) => {
    try {
      const response = await api.post("/auth/farmer/register", userData);
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

  // Get single product
  getProduct: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new product
  createProduct: async (productData) => {
    try {
      const response = await api.post("/products", productData);
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

export default api;
