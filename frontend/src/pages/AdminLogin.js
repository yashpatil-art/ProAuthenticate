import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, testConnection } from '../services/api';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const navigate = useNavigate();

  // Test backend connection on component mount
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        await testConnection();
        setConnectionStatus('connected');
      } catch (error) {
        setConnectionStatus('disconnected');
        setError('Backend server is not running. Please start the server on port 5001.');
      }
    };

    checkBackendConnection();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (connectionStatus === 'disconnected') {
      setError('Cannot connect to server. Please make sure the backend is running on port 5001.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('🔄 Attempting admin login...');
      
      // Use the specific admin login method
      const response = await authAPI.adminLogin(formData.email, formData.password);

      console.log('✅ Login response:', response);

      if (response.success && response.data.user.role === 'admin') {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userType', 'admin');
        
        alert('Admin login successful!');
        navigate('/admin');
      } else {
        setError('Access denied. Admin privileges required.');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      
      // More specific error messages
      if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNREFUSED') {
        setError('Cannot connect to server. Please make sure the backend is running on port 5001.');
      } else if (error.response?.status === 401) {
        setError('Invalid email or password.');
      } else if (error.response?.status === 403) {
        setError('Access denied. Admin privileges required.');
      } else {
        setError(error.response?.data?.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const retryConnection = async () => {
    setConnectionStatus('checking');
    setError('');
    try {
      await testConnection();
      setConnectionStatus('connected');
    } catch (error) {
      setConnectionStatus('disconnected');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Access the admin dashboard
        </p>

        {/* Connection Status */}
        <div className="mt-4 text-center">
          {connectionStatus === 'checking' && (
            <div className="text-yellow-600 text-sm">
              🔄 Checking server connection...
            </div>
          )}
          {connectionStatus === 'connected' && (
            <div className="text-green-600 text-sm">
              ✅ Connected to server
            </div>
          )}
          {connectionStatus === 'disconnected' && (
            <div className="text-red-600 text-sm">
              ❌ Server disconnected
              <button 
                onClick={retryConnection}
                className="ml-2 text-blue-600 hover:text-blue-800 underline"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Admin Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={connectionStatus === 'disconnected'}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="admin@elitesglobal.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={connectionStatus === 'disconnected'}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter admin password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || connectionStatus === 'disconnected'}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in as Admin'}
              </button>
            </div>
          </form>

          {/* <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">Demo Credentials</h4>
            <p className="text-yellow-700 text-sm">
              Email: admin@proauthenticate.com<br />
              Password: admin123
            </p>
          </div> */}

          {/* Troubleshooting Tips */}
          {connectionStatus === 'disconnected' && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Troubleshooting Tips</h4>
              <ul className="text-blue-700 text-sm list-disc list-inside space-y-1">
                <li>Make sure your backend server is running on port 5001</li>
                <li>Check if the backend started without errors</li>
                <li>Verify the backend URL: http://localhost:5001</li>
                <li>Try restarting the backend server</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;