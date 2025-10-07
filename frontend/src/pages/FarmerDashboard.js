import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ProductModal from '../components/ProductModal';

const FarmerDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    verifiedProducts: 0,
    pendingVerification: 0,
    totalSales: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          navigate('/farmer-login');
          return;
        }
        
        setUser(JSON.parse(userData));
        await fetchProducts();
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/farmer-login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const fetchProducts = async () => {
  try {
    console.log('Fetching products...');
    const token = localStorage.getItem('authToken');
    console.log('Current token:', token ? token.substring(0, 20) + '...' : 'No token');
    
    const response = await api.get('/products/my-products');
    console.log('Products response:', response.data);
    
    if (response.data.success) {
      const productsData = response.data.data;
      setProducts(productsData);
      
      // Calculate stats
      const totalProducts = productsData.length;
      const verifiedProducts = productsData.filter(p => p.verificationStatus === 'approved').length;
      const pendingVerification = productsData.filter(p => p.verificationStatus === 'pending').length;
      
      setStats({
        totalProducts,
        verifiedProducts,
        pendingVerification,
        totalSales: 125000 // Mock data for now
      });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    console.error('Error details:', error.response?.data);
    alert('Failed to fetch products. Please check console for details.');
  }
};

  // CORRECT handleAddProduct function - ONLY ONE VERSION
  const handleAddProduct = async (formData) => {
    try {
      const response = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setShowProductModal(false);
        await fetchProducts(); // Refresh products list
        alert('Product added successfully! Waiting for verification.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="font-bold text-xl text-gray-800">ProAuthenticate</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-800">Welcome, {user.name}</p>
                <p className="text-sm text-gray-600">{user.farmName}</p>
              </div>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0).toUpperCase()}
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
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-green-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-green-100 text-lg">
            Manage your farm products, track verifications, and connect with buyers.
          </p>
          <div className="flex items-center space-x-4 mt-4">
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <span className="font-semibold">{user.farmName}</span>
            </div>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <span>{user.location}</span>
            </div>
            {user.profileCompleted && (
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <span>✓ Profile Complete</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Verified Products</p>
                <p className="text-3xl font-bold text-green-600">{stats.verifiedProducts}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">✓</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Verification</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingVerification}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-xl">⏳</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Sales</p>
                <p className="text-3xl font-bold text-purple-600">₹{stats.totalSales.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: '📊' },
                { id: 'products', name: 'My Products', icon: '📦' },
                { id: 'verification', name: 'Verification', icon: '🔍' },
                { id: 'sales', name: 'Sales', icon: '💰' },
                { id: 'profile', name: 'Profile', icon: '👤' }
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
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && <OverviewTab user={user} products={products} />}
            {activeTab === 'products' && (
              <ProductsTab 
                products={products} 
                onAddProduct={() => setShowProductModal(true)}
                onRefresh={fetchProducts}
              />
            )}
            {activeTab === 'verification' && <VerificationTab products={products} />}
            {activeTab === 'sales' && <SalesTab />}
            {activeTab === 'profile' && <ProfileTab user={user} />}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setShowProductModal(true)}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary hover:bg-opacity-5 transition text-center group"
            >
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20">
                <span className="text-primary text-xl">+</span>
              </div>
              <p className="font-semibold text-gray-700 group-hover:text-primary">Add New Product</p>
              <p className="text-sm text-gray-500">Register a new product for verification</p>
            </button>

            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-center group">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 text-xl">📊</span>
              </div>
              <p className="font-semibold text-gray-700 group-hover:text-green-600">View Analytics</p>
              <p className="text-sm text-gray-500">Check your sales and performance</p>
            </button>

            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center group">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
              <p className="font-semibold text-gray-700 group-hover:text-blue-600">Buyer Requests</p>
              <p className="text-sm text-gray-500">View offers from potential buyers</p>
            </button>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <ProductModal
          onClose={() => setShowProductModal(false)}
          onSubmit={handleAddProduct}
          farmLocation={user.location}
        />
      )}
    </div>
  );
};

// Tab Components (Updated ProductsTab)
const OverviewTab = ({ user, products }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-800 mb-6">Dashboard Overview</h3>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Recent Products</h4>
        <div className="space-y-3">
          {products.slice(0, 3).map((product) => (
            <div key={product._id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div>
                <p className="font-medium text-gray-800">{product.name}</p>
                <p className="text-sm text-gray-600">{product.category} • {product.quantity} {product.unit}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                product.verificationStatus === 'approved' 
                  ? 'bg-green-100 text-green-800' 
                  : product.verificationStatus === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.verificationStatus}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Farm Information</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Farm Name:</span>
            <span className="font-medium">{user.farmName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Location:</span>
            <span className="font-medium">{user.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Products:</span>
            <span className="font-medium">{user.products?.join(', ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Member Since:</span>
            <span className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProductsTab = ({ products, onAddProduct, onRefresh }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold text-gray-800">My Products</h3>
      <button
        onClick={onAddProduct}
        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center space-x-2 transition"
      >
        <span>+</span>
        <span>Add Product</span>
      </button>
    </div>
    
    {products.length === 0 ? (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-gray-400 text-2xl">📦</span>
        </div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">No Products Yet</h4>
        <p className="text-gray-600 mb-4">Start by adding your first product for verification.</p>
        <button
          onClick={onAddProduct}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition"
        >
          Add Your First Product
        </button>
      </div>
    ) : (
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification ID</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {product.images && product.images.length > 0 && (
                      <img 
                        src={`http://localhost:5001${product.images[0]}`} 
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover mr-3"
                      />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 capitalize">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.quantity} {product.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">₹{product.price}/{product.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.verificationStatus === 'approved' 
                      ? 'bg-green-100 text-green-800'
                      : product.verificationStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.verificationStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.verificationId || 'Pending...'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

const VerificationTab = ({ products }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-800 mb-6">Product Verification Status</h3>
    <div className="space-y-4">
      {products.filter(p => p.verificationStatus === 'pending').map((product) => (
        <div key={product._id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-800">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.category} • {product.quantity} {product.unit}</p>
              <p className="text-xs text-yellow-700 mt-1">Verification pending admin approval</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-700 font-medium">Processing</span>
            </div>
          </div>
        </div>
      ))}
      
      {products.filter(p => p.verificationStatus === 'approved').map((product) => (
        <div key={product._id} className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-800">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.category} • {product.quantity} {product.unit}</p>
              <p className="text-xs text-green-700 mt-1">
                Verified on {new Date(product.verifiedAt).toLocaleDateString()} • {product.verificationId}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-green-700 font-medium">Verified</span>
            </div>
          </div>
        </div>
      ))}

      {products.filter(p => p.verificationStatus === 'rejected').map((product) => (
        <div key={product._id} className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-800">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.category} • {product.quantity} {product.unit}</p>
              <p className="text-xs text-red-700 mt-1">Verification rejected. Please contact support.</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✗</span>
              </div>
              <span className="text-red-700 font-medium">Rejected</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SalesTab = () => (
  <div>
    <h3 className="text-xl font-semibold text-gray-800 mb-6">Sales & Revenue</h3>
    <div className="bg-gray-50 rounded-lg p-8 text-center">
      <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-primary text-2xl">💰</span>
      </div>
      <h4 className="text-lg font-semibold text-gray-800 mb-2">Sales Analytics Coming Soon</h4>
      <p className="text-gray-600">
        Detailed sales reports, revenue tracking, and buyer analytics will be available here.
      </p>
    </div>
  </div>
);

const ProfileTab = ({ user }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-800 mb-6">Farm Profile</h3>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg border p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Basic Information</h4>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <p className="font-medium">{user.phone || 'Not provided'}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Farm Details</h4>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Farm Name</label>
            <p className="font-medium">{user.farmName}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Location</label>
            <p className="font-medium">{user.location}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Products Grown</label>
            <p className="font-medium">{user.products?.join(', ') || 'None specified'}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div className="mt-6 flex space-x-4">
      <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition">
        Edit Profile
      </button>
      <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-gray-700 transition">
        Change Password
      </button>
    </div>
  </div>
);

export default FarmerDashboard;