import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingProducts, setPendingProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [stats, setStats] = useState({
    totalFarmers: 0,
    pendingVerifications: 0,
    verifiedFarmers: 0,
    totalProducts: 0
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('authToken');
        
        console.log('Checking admin access...', { 
          hasUserData: !!userData, 
          hasToken: !!token 
        });

        if (!userData || !token) {
          console.log('No user data or token, redirecting to admin login');
          navigate('/admin-login');
          return;
        }

        const parsedUser = JSON.parse(userData);
        console.log('User role:', parsedUser.role);

        if (parsedUser.role !== 'admin') {
          console.log('User is not admin, redirecting to home');
          navigate('/');
          return;
        }

        setUser(parsedUser);
        await fetchAllData();
        
      } catch (error) {
        console.error('Error fetching admin data:', error);
        // Clear invalid tokens and redirect
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        navigate('/admin-login');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Fetching admin data with token...');

      // Fetch stats
      const statsResponse = await api.get('/admin/stats', {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const statsData = statsResponse.data.data;
      setStats({
        totalFarmers: statsData.farmers.total,
        pendingVerifications: statsData.products.pending,
        verifiedFarmers: statsData.farmers.verified,
        totalProducts: statsData.products.total
      });

      // Fetch pending products
      const pendingResponse = await api.get('/admin/pending-products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingProducts(pendingResponse.data.data);

      // Fetch all products
      const productsResponse = await api.get('/admin/all-products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllProducts(productsResponse.data.data);

      console.log('Admin data fetched successfully');

    } catch (error) {
      console.error('Error fetching admin data:', error);
      
      // If unauthorized, clear storage and redirect
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        alert('Session expired or access denied. Please login again.');
        navigate('/admin-login');
      } else {
        alert('Failed to fetch admin data. Please try again.');
      }
    }
  };

  const handleVerifyProduct = async (productId, status) => {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await api.patch(
        `/admin/products/${productId}/verify`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        await fetchAllData();
        alert(`Product ${status} successfully!`);
      }
    } catch (error) {
      console.error('Error verifying product:', error);
      alert('Error verifying product. Please try again.');
    }
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    navigate('/admin-login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="font-bold text-xl text-gray-800">Admin Dashboard</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-800">Admin User</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
              <button
                onClick={handleLogout}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-gray-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Farmers</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalFarmers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl">👨‍🌾</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Products</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingVerifications}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-xl">⏳</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Verified Farmers</p>
                <p className="text-3xl font-bold text-green-600">{stats.verifiedFarmers}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">✓</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xl">📦</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'pending', name: 'Pending Products', icon: '⏳', count: pendingProducts.length },
                { id: 'products', name: 'All Products', icon: '📦', count: allProducts.length },
                { id: 'analytics', name: 'Analytics', icon: '📊' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                  {tab.count !== undefined && (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeTab === tab.id 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'pending' && (
              <PendingProductsTab 
                products={pendingProducts}
                onVerifyProduct={handleVerifyProduct}
                onViewDetails={handleViewDetails}
              />
            )}
            {activeTab === 'products' && (
              <AllProductsTab 
                products={allProducts}
                onVerifyProduct={handleVerifyProduct}
                onViewDetails={handleViewDetails}
              />
            )}
            {activeTab === 'analytics' && <AnalyticsTab stats={stats} />}
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {showModal && selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct}
          onClose={handleCloseModal}
          onVerifyProduct={handleVerifyProduct}
        />
      )}
    </div>
  );
};

// Tab Components
const PendingProductsTab = ({ products, onVerifyProduct, onViewDetails }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-800 mb-6">Pending Product Verifications</h3>
    
    {products.length === 0 ? (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-green-600 text-2xl">✓</span>
        </div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">All Caught Up!</h4>
        <p className="text-gray-600">No pending product verifications at the moment.</p>
      </div>
    ) : (
      <div className="space-y-6">
        {products.map((product) => (
          <div key={product._id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
                <p className="text-gray-600">Verification ID: {product.verificationId}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="bg-white px-3 py-1 rounded-full text-sm border">
                    <span className="font-medium capitalize">{product.category}</span>
                  </div>
                  <div className="bg-white px-3 py-1 rounded-full text-sm border">
                    <span>{product.quantity} {product.unit}</span>
                  </div>
                  <div className="bg-white px-3 py-1 rounded-full text-sm border">
                    <span>₹{product.price}/kg</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Created: {new Date(product.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Description:</strong> {product.description}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Farm Location:</strong> {product.farmLocation}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Harvest Date:</strong> {new Date(product.harvestDate).toLocaleDateString()}
              </p>
              {product.farmer && (
                <p className="text-sm text-gray-700 mt-2">
                  <strong>Farmer:</strong> {product.farmer.name} ({product.farmer.farmName}) - {product.farmer.location}
                </p>
              )}
            </div>

            {product.images && product.images.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Product Images:</p>
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`Product ${index + 1}`}
                      className="w-20 h-20 object-cover rounded border"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={() => onVerifyProduct(product._id, 'approved')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Approve Product
              </button>
              <button
                onClick={() => onVerifyProduct(product._id, 'rejected')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Reject Product
              </button>
              <button 
                onClick={() => onViewDetails(product)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const AllProductsTab = ({ products, onVerifyProduct, onViewDetails }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-800 mb-6">All Products</h3>
    
    {products.length === 0 ? (
      <div className="text-center py-12">
        <p className="text-gray-600">No products found.</p>
      </div>
    ) : (
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.verificationId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.farmer?.name}</div>
                  <div className="text-sm text-gray-500">{product.farmer?.farmName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.quantity} {product.unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹{product.price}/{product.unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.verificationStatus === 'approved' 
                      ? 'bg-green-100 text-green-800'
                      : product.verificationStatus === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.verificationStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {product.verificationStatus === 'pending' && (
                    <>
                      <button
                        onClick={() => onVerifyProduct(product._id, 'approved')}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onVerifyProduct(product._id, 'rejected')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => onViewDetails(product)}
                    className="text-blue-600 hover:text-blue-900 ml-3"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

const AnalyticsTab = ({ stats }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-800 mb-6">Platform Analytics</h3>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg border p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Platform Overview</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Farmers:</span>
            <span className="font-medium">{stats.totalFarmers}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Pending Products:</span>
            <span className="font-medium text-yellow-600">{stats.pendingVerifications}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Verified Farmers:</span>
            <span className="font-medium text-green-600">{stats.verifiedFarmers}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Products:</span>
            <span className="font-medium">{stats.totalProducts}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Verification Status</h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Verified Farmers</span>
              <span>{stats.totalFarmers > 0 ? Math.round((stats.verifiedFarmers / stats.totalFarmers) * 100) : 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${stats.totalFarmers > 0 ? (stats.verifiedFarmers / stats.totalFarmers) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Pending Products</span>
              <span>{stats.totalProducts > 0 ? Math.round((stats.pendingVerifications / stats.totalProducts) * 100) : 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-600 h-2 rounded-full" 
                style={{ width: `${stats.totalProducts > 0 ? (stats.pendingVerifications / stats.totalProducts) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
// Product Details Modal Component
const ProductDetailsModal = ({ product, onClose, onVerifyProduct }) => {
  // Get backend base URL from environment or use default
  const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it's a relative path starting with /uploads, prepend backend URL
    if (imagePath.startsWith('/uploads/')) {
      return `${BACKEND_URL}${imagePath}`;
    }
    
    // If it's just a filename, construct the full path
    return `${BACKEND_URL}/uploads/products/${imagePath}`;
  };

  // Function to handle image loading errors
  const handleImageError = (e, imagePath) => {
    console.error('Image failed to load:', imagePath);
    e.target.style.display = 'none';
    
    // Show error message
    const errorDiv = e.target.nextSibling;
    if (errorDiv) {
      errorDiv.style.display = 'block';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Images</h3>
              {product.images && product.images.length > 0 ? (
                <div className="space-y-4">
                  {product.images.map((imagePath, index) => {
                    const fullImageUrl = getImageUrl(imagePath);
                    return (
                      <div key={index} className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-100 p-3 border-b">
                          <span className="text-sm font-medium text-gray-600">
                            Image {index + 1}
                          </span>
                        </div>
                        <div className="p-4">
                          {fullImageUrl ? (
                            <div className="flex flex-col items-center">
                              <img
                                src={fullImageUrl}
                                alt={`Product ${index + 1}`}
                                className="max-w-full max-h-64 object-contain rounded"
                                onError={(e) => handleImageError(e, fullImageUrl)}
                              />
                              <div className="hidden text-center py-4 bg-gray-100 rounded w-full mt-2">
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                                  <span className="text-gray-600 text-xl">⚠️</span>
                                </div>
                                <p className="text-gray-600 font-medium">Image failed to load</p>
                                <p className="text-gray-500 text-xs mt-1 break-all">
                                  URL: {fullImageUrl}
                                </p>
                                <p className="text-gray-400 text-xs mt-1">
                                  Check if the backend is running and serving static files
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-8 bg-gray-100 rounded">
                              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="text-gray-600 text-xl">📷</span>
                              </div>
                              <p className="text-gray-600">Invalid image path</p>
                              <p className="text-gray-400 text-xs mt-1 break-all">
                                {imagePath}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-400 text-2xl">📷</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">No Images Available</h4>
                  <p className="text-gray-500 text-sm">This product doesn't have any images uploaded.</p>
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-lg border p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 font-medium">Product Name:</span>
                    <span className="font-semibold text-gray-800 text-right">{product.name}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 font-medium">Verification ID:</span>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-right">
                      {product.verificationId}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 font-medium">Category:</span>
                    <span className="font-medium capitalize bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 font-medium">Quantity:</span>
                    <span className="font-medium text-gray-800">
                      {product.quantity} {product.unit}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 font-medium">Price:</span>
                    <span className="font-semibold text-green-600">
                      ₹{product.price}/{product.unit}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 font-medium">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.verificationStatus === 'approved' 
                        ? 'bg-green-100 text-green-800'
                        : product.verificationStatus === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.verificationStatus?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Farmer Information */}
              {product.farmer && (
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Farmer Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600 font-medium">Farmer Name:</span>
                      <span className="font-medium text-gray-800">{product.farmer.name}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600 font-medium">Farm Name:</span>
                      <span className="font-medium text-gray-800">{product.farmer.farmName}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600 font-medium">Location:</span>
                      <span className="font-medium text-gray-800">{product.farmer.location}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600 font-medium">Contact:</span>
                      <span className="font-medium text-gray-800">
                        {product.farmer.phone || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Product Details */}
              <div className="bg-white rounded-lg border p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 font-medium block mb-2">Description:</span>
                    <p className="text-gray-800 bg-gray-50 p-3 rounded-lg border text-sm">
                      {product.description || 'No description provided.'}
                    </p>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 font-medium">Farm Location:</span>
                    <span className="font-medium text-gray-800 text-right">
                      {product.farmLocation}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 font-medium">Harvest Date:</span>
                    <span className="font-medium text-gray-800">
                      {new Date(product.harvestDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 font-medium">Created Date:</span>
                    <span className="font-medium text-gray-800">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Debug Information */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2">Image Debug Information:</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Backend URL:</strong> {BACKEND_URL}</p>
              <p><strong>Images count:</strong> {product.images?.length || 0}</p>
              {product.images?.map((imagePath, index) => (
                <div key={index} className="border-t pt-1">
                  <p><strong>Image {index + 1}:</strong></p>
                  <p className="ml-2">Original: {imagePath}</p>
                  <p className="ml-2">Full URL: {getImageUrl(imagePath)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {product.verificationStatus === 'pending' && (
            <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  onVerifyProduct(product._id, 'approved');
                  onClose();
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2"
              >
                <span>✓</span>
                <span>Approve Product</span>
              </button>
              <button
                onClick={() => {
                  onVerifyProduct(product._id, 'rejected');
                  onClose();
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2"
              >
                <span>✕</span>
                <span>Reject Product</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;