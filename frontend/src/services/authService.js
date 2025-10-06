import api from './api';
import API_CONFIG from '../config/api';

class AuthService {
  // Register new user
  async register(userData) {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
      
      if (response.data.success) {
        // Store token and user data
        localStorage.setItem('authToken', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
      
      if (response.data.success) {
        // Store token and user data
        localStorage.setItem('authToken', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  }

  // Get user profile
  async getProfile() {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  }

  // Logout user
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get auth token
  getToken() {
    return localStorage.getItem('authToken');
  }
}

export default new AuthService();