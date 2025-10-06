import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingFarmers, setPendingFarmers] = useState([]);
  const [verifiedFarmers, setVerifiedFarmers] = useState([]);
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
      // Mock data - replace with actual API calls
      const mockPendingFarmers = [
        {
          id: 1,
          name: 'Rajesh Kumar',
          email: 'rajesh@example.com',
          farmName: 'Green Valley Farms',
          location: 'Nashik, Maharashtra',
          phone: '+91 9876543210',
          products: ['Grapes', 'Pomegranate'],
          registrationDate: '2024-01-15',
          documents: ['aadhar.pdf', 'land_record.pdf']
        },
        {
          id: 2,
          name: 'Priya Sharma',
          email: 'priya@example.com',
          farmName: 'Organic Harvest',
          location: 'Nagpur, Maharashtra',
          phone: '+91 9876543211',
          products: ['Orange', 'Cotton'],
          registrationDate: '2024-01-16',
          documents: ['aadhar.pdf', 'farming_certificate.pdf']
        }
      ];

      const mockVerifiedFarmers = [
        {
          id: 3,
          name: 'Amit Patel',
          email: 'amit@example.com',
          farmName: 'Patel Farms',
          location: 'Pune, Maharashtra',
          phone: '+91 9876543212',
          products: ['Sugar', 'Turmeric'],
          registrationDate: '2024-01-10',
          verificationDate: '2024-01-12',
          status: 'verified'
        }
      ];

      const mockProducts = [
        {
          id: 1,
          name: 'Organic Turmeric',
          farmer: 'Amit Patel',
          category: 'Turmeric',
          quantity: '100 kg',
          status: 'verified',
          verificationDate: '2024-01-15'
        },
        {
          id: 2,
          name: 'Premium Grapes',
          farmer: 'Rajesh Kumar',
          category: 'Grapes',
          quantity: '200 kg',
          status: 'pending',
          verificationDate: null
        }
      ];

      setPendingFarmers(mockPendingFarmers);
      setVerifiedFarmers(mockVerifiedFarmers);
      setAllProducts(mockProducts);

      setStats({
        totalFarmers: mockPendingFarmers.length + mockVerifiedFarmers.length,
        pendingVerifications: mockPendingFarmers.length,
        verifiedFarmers: mockVerifiedFarmers.length,
        totalProducts: mockProducts.length
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleApproveFarmer = async (farmerId) => {
    try {
      // Replace with actual API call
      console.log('Approving farmer:', farmerId);
      
      const farmer = pendingFarmers.find(f => f.id === farmerId);
      if (farmer) {
        setVerifiedFarmers(prev => [...prev, { ...farmer, status: 'verified', verificationDate: new Date().toISOString().split('T')[0] }]);
        setPendingFarmers(prev => prev.filter(f => f.id !== farmerId));
        
        setStats(prev => ({
          ...prev,
          pendingVerifications: prev.pendingVerifications - 1,
          verifiedFarmers: prev.verifiedFarmers + 1
        }));

        alert(`Farmer ${farmer.name} has been verified successfully!`);
      }
    } catch (error) {
      console.error('Error approving farmer:', error);
      alert('Error approving farmer. Please try again.');
    }
  };

  const handleRejectFarmer = async (farmerId) => {
    const farmer = pendingFarmers.find(f => f.id === farmerId);
    if (confirm(`Are you sure you want to reject ${farmer?.name}'s application?`)) {
      try {
        // Replace with actual API call
        setPendingFarmers(prev => prev.filter(f => f.id !== farmerId));
        setStats(prev => ({
          ...prev,
          pendingVerifications: prev.pendingVerifications - 1,
          totalFarmers: prev.totalFarmers - 1
        }));
        
        alert(`Farmer ${farmer?.name} has been rejected.`);
      } catch (error) {
        console.error('Error rejecting farmer:', error);
      }
    }
  };

  const handleVerifyProduct = async (productId) => {
    try {
      // Replace with actual API call
      setAllProducts(prev => 
        prev.map(product => 
          product.id === productId 
            ? { ...product, status: 'verified', verificationDate: new Date().toISOString().split('T')[0] }
            : product
        )
      );
      
      alert('Product verified successfully!');
    } catch (error) {
      console.error('Error verifying product:', error);
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
                <p className="text-gray-600 text-sm">Pending Verifications</p>
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
                { id: 'pending', name: 'Pending Verifications', icon: '⏳', count: pendingFarmers.length },
                { id: 'verified', name: 'Verified Farmers', icon: '✓', count: verifiedFarmers.length },
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
              <PendingVerificationsTab 
                farmers={pendingFarmers}
                onApprove={handleApproveFarmer}
                onReject={handleRejectFarmer}
              />
            )}
            {activeTab === 'verified' && <VerifiedFarmersTab farmers={verifiedFarmers} />}
            {activeTab === 'products' && (
              <ProductsTab 
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

// Tab Components
const PendingVerificationsTab = ({ farmers, onApprove, onReject }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-800 mb-6">Pending Farmer Verifications</h3>
    
    {farmers.length === 0 ? (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-green-600 text-2xl">✓</span>
        </div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">All Caught Up!</h4>
        <p className="text-gray-600">No pending farmer verifications at the moment.</p>
      </div>
    ) : (
      <div className="space-y-6">
        {farmers.map((farmer) => (
          <div key={farmer.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{farmer.name}</h4>
                <p className="text-gray-600">{farmer.email} • {farmer.phone}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="bg-white px-3 py-1 rounded-full text-sm border">
                    <span className="font-medium">{farmer.farmName}</span>
                  </div>
                  <div className="bg-white px-3 py-1 rounded-full text-sm border">
                    <span>{farmer.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Registered: {farmer.registrationDate}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Products:</strong> {farmer.products.join(', ')}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Documents:</strong> {farmer.documents.join(', ')}
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => onApprove(farmer.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Approve & Verify
              </button>
              <button
                onClick={() => onReject(farmer.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Reject
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

const VerifiedFarmersTab = ({ farmers }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-800 mb-6">Verified Farmers</h3>
    
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farm Details</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {farmers.map((farmer) => (
            <tr key={farmer.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="font-medium text-gray-900">{farmer.name}</div>
                  <div className="text-sm text-gray-500">{farmer.email}</div>
                  <div className="text-sm text-gray-500">{farmer.phone}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{farmer.farmName}</div>
                <div className="text-sm text-gray-500">{farmer.location}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{farmer.products.join(', ')}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {farmer.verificationDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Verified
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ProductsTab = ({ products, onVerifyProduct }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-800 mb-6">All Products</h3>
    
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{product.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.farmer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  product.status === 'verified' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {product.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {product.status !== 'verified' && (
                  <button
                    onClick={() => onVerifyProduct(product.id)}
                    className="text-primary hover:text-primary-dark"
                  >
                    Verify Product
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
            <span className="text-gray-600">Pending Verifications:</span>
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
              <span>{Math.round((stats.verifiedFarmers / stats.totalFarmers) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${(stats.verifiedFarmers / stats.totalFarmers) * 100}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Pending Verifications</span>
              <span>{Math.round((stats.pendingVerifications / stats.totalFarmers) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-600 h-2 rounded-full" 
                style={{ width: `${(stats.pendingVerifications / stats.totalFarmers) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;