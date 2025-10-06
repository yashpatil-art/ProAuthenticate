import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      id: 1,
      name: 'Organic Cane Sugar',
      category: 'sugar',
      price: '₹45/kg',
      verified: true,
      farmer: 'Green Fields Farm',
      location: 'Maharashtra',
      description: 'Pure organic sugarcane with 99.8% purity, blockchain verified from harvest to packaging.',
      features: ['99.8% Purity', 'Organic Certified', 'No Chemicals', 'Blockchain Tracked'],
      image: '/images/sugar.jpg',
      harvestDate: '2024-01-15',
      verificationId: 'PA-SUG-2024-001'
    },
    {
      id: 2,
      name: 'W240 Premium Cashews',
      category: 'cashew',
      price: '₹120/kg',
      verified: true,
      farmer: 'Cashew Valley Estates',
      location: 'Kerala',
      description: 'Grade W240 raw cashews, 180-200 nuts per pound. Direct from coastal farms.',
      features: ['W240 Grade', 'Raw & Natural', 'Export Quality', 'Size Verified'],
      image: '/images/cashew.jpg',
      harvestDate: '2024-01-10',
      verificationId: 'PA-CAS-2024-002'
    },
    {
      id: 3,
      name: 'High Curcumin Turmeric',
      category: 'turmeric',
      price: '₹85/kg',
      verified: true,
      farmer: 'Golden Spice Farms',
      location: 'Tamil Nadu',
      description: 'Organic turmeric with 5.2% curcumin content. Lab tested for purity and potency.',
      features: ['5.2% Curcumin', 'Lab Verified', 'No Adulteration', 'Medical Grade'],
      image: '/images/turmeric.jpg',
      harvestDate: '2024-01-08',
      verificationId: 'PA-TUR-2024-003'
    },
    {
      id: 4,
      name: 'Organic Cavendish Bananas',
      category: 'banana',
      price: '₹25/dozen',
      verified: true,
      farmer: 'Tropical Harvest',
      location: 'Karnataka',
      description: 'Fresh organic Cavendish bananas, harvested at perfect ripeness stage 5.',
      features: ['Organic', 'Stage 5 Ripeness', 'Cold Chain', 'Fresh Harvest'],
      image: '/images/banana.jpg',
      harvestDate: '2024-01-20',
      verificationId: 'PA-BAN-2024-004'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'sugar', name: 'Sugar Products', count: products.filter(p => p.category === 'sugar').length },
    { id: 'cashew', name: 'Cashew Nuts', count: products.filter(p => p.category === 'cashew').length },
    { id: 'turmeric', name: 'Turmeric', count: products.filter(p => p.category === 'turmeric').length },
    { id: 'banana', name: 'Bananas', count: products.filter(p => p.category === 'banana').length }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Verified Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our collection of blockchain-verified agricultural products. Every item comes with complete transparency.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Bar */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid - CONDITIONAL RENDERING */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover border border-gray-200">
                  
                  {/* Product Image */}
                  <div className="h-48 bg-gray-200 overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                    {product.verified && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <span>✓</span>
                        <span>Verified</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                      <span className="text-2xl font-bold text-primary">{product.price}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <span className="mr-2">👨‍🌾</span>
                      <span>{product.farmer}</span>
                      <span className="mx-2">•</span>
                      <span>{product.location}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature, index) => (
                          <span
                            key={index}
                            className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Verification Info */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Harvest:</span> {product.harvestDate}
                        </div>
                        <div>
                          <span className="font-medium">ID:</span> {product.verificationId}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-6">
                      <button className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition text-center">
                        Verify Authenticity
                      </button>
                      <button className="flex-1 border border-primary text-primary py-3 px-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition text-center">
                        Contact Farmer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA - Only shows when products are displayed */}
            <div className="text-center mt-12 bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Can't find what you're looking for?
              </h3>
              <p className="text-gray-600 mb-6">
                Contact us directly and we'll help you source verified agricultural products.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Contact Our Team
                </Link>
                <Link to="/farmer-login" className="btn-secondary">
                  Become a Verified Farmer
                </Link>
              </div>
            </div>
          </>
        ) : (
          /* No Products Found - Only shows when no products match search/filter */
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== 'all' 
                ? "No products match your search criteria. Try different keywords or categories."
                : "No products are currently available in our catalog."
              }
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Products;