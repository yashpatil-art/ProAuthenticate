import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any customer authentication data
    localStorage.removeItem('customerToken');
    navigate('/customer-login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome to your personalized shopping experience</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">My Orders</h3>
            <p className="text-gray-600 mb-4">Track and manage your orders</p>
            <button className="text-primary hover:underline font-medium">
              View Orders →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Browse Products</h3>
            <p className="text-gray-600 mb-4">Shop verified agricultural products</p>
            <button 
              onClick={() => navigate('/products')}
              className="text-green-600 hover:underline font-medium"
            >
              Shop Now →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Profile Settings</h3>
            <p className="text-gray-600 mb-4">Update your personal information</p>
            <button className="text-blue-600 hover:underline font-medium">
              Edit Profile →
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Order #12345</p>
                <p className="text-sm text-gray-600">Placed on October 15, 2024</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Processing
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Order #12344</p>
                <p className="text-sm text-gray-600">Delivered on October 10, 2024</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Delivered
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;