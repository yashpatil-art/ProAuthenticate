import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
// Remove this import: import ProductsTab from '../components/ProductsTab.js';

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          navigate('/admin-login');
          return;
        }

        const parsedUser = JSON.parse(userData);
        if (parsedUser.role !== 'admin') {
          navigate('/');
          return;
        }

        setUser(parsedUser);
        await fetchAllData();
        
      } catch (error) {
        console.error('Error fetching admin data:', error);
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
      
      // Fetch stats
      const statsResponse = await api.get('/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
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

    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch admin data');
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
              />
            )}
            {activeTab === 'products' && (
              <AllProductsTab 
                products={allProducts}
                onVerifyProduct={handleVerifyProduct}
              />
            )}
            {activeTab === 'analytics' && <AnalyticsTab stats={stats} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Tab Components - Keep these local components
const PendingProductsTab = ({ products, onVerifyProduct }) => (
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
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const AllProductsTab = ({ products, onVerifyProduct }) => (
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
                  <button className="text-blue-600 hover:text-blue-900 ml-3">
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

export default AdminDashboard;