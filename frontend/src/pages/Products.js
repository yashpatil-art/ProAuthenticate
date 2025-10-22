import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products, productCategories } from '../data/productsData';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on category and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || 
      (selectedCategory === 'Fruits' && ['grapes', 'mango', 'pomegranate'].includes(product.slug)) ||
      (selectedCategory === 'Spices' && product.slug === 'turmeric') ||
      (selectedCategory === 'Grains' && product.slug === 'rice') ||
      (selectedCategory === 'Sweeteners' && product.slug === 'sugar') ||
      (selectedCategory === 'Nuts' && product.slug === 'cashew') ||
      (selectedCategory === 'Commercial Crops' && product.slug === 'tobacco');
    
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.varieties.some(variety => variety.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Get category counts
  const getCategoryCount = (category) => {
    if (category === 'All') return products.length;
    if (category === 'Fruits') return products.filter(p => ['grapes', 'mango', 'pomegranate'].includes(p.slug)).length;
    if (category === 'Spices') return products.filter(p => p.slug === 'turmeric').length;
    if (category === 'Grains') return products.filter(p => p.slug === 'rice').length;
    if (category === 'Sweeteners') return products.filter(p => p.slug === 'sugar').length;
    if (category === 'Nuts') return products.filter(p => p.slug === 'cashew').length;
    if (category === 'Commercial Crops') return products.filter(p => p.slug === 'tobacco').length;
    return 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Premium Agricultural Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our collection of agricultural products from Western Maharashtra. Every product comes with complete traceability.
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
                  placeholder="Search products by name, description, or varieties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {productCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white shadow-md transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category} ({getCategoryCount(category)})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid - CONDITIONAL RENDERING */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 card-hover border border-gray-200"
                >
                  
                  {/* Product Image */}
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
                    />
                 
                    <div className="absolute top-4 left-4 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                      <span className="text-lg">{product.icon}</span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <p className="text-green-600 font-medium text-sm mb-3 italic">
                      {product.description}
                    </p>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {product.shortDescription}
                    </p>

                    {/* Varieties */}
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-800 text-sm mb-2">Varieties & Forms:</h4>
                      <div className="flex flex-wrap gap-1">
                        {product.varieties.slice(0, 3).map((variety, idx) => (
                          <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700 border border-gray-200">
                            {variety}
                          </span>
                        ))}
                        {product.varieties.length > 3 && (
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-500 border border-gray-200">
                            +{product.varieties.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Global Appeal */}
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-800 text-sm mb-1">Global Appeal:</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        {product.globalAppeal}
                      </p>
                    </div>

                    {/* Value Additions */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 text-sm mb-2">Value Addition:</h4>
                      <div className="flex flex-wrap gap-1">
                        {product.valueAdditions.slice(0, 2).map((addition, idx) => (
                          <span key={idx} className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs border border-amber-200">
                            {addition}
                          </span>
                        ))}
                        {product.valueAdditions.length > 2 && (
                          <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs border border-amber-200">
                            +{product.valueAdditions.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-6">
                      <Link 
                        to={`/products/${product.slug}`}
                        className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition text-center flex items-center justify-center group/view"
                      >
                        <span className="transform group-hover/view:translate-x-1 transition-transform duration-300">
                          View Details
                        </span>
                        <span className="ml-1 transform group-hover/view:translate-x-1 transition-transform duration-300 delay-100">
                          →
                        </span>
                      </Link>
                      <button className="flex-1 border border-green-600 text-green-600 py-3 px-4 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition text-center">
                        Contact Supplier
                      </button>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
              ))}
            </div>

            {/* Bottom CTA - Only shows when products are displayed */}
            <div className="text-center mt-12 bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Looking for Bulk Quantities or Custom Requirements?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We specialize in connecting buyers with premium agricultural products from Western Maharashtra. 
                Get in touch for bulk orders, custom processing, or exclusive varieties.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition transform hover:scale-105"
                >
                  Contact Our Team
                </Link>
                <Link 
                  to="/farmer-login" 
                  className="border border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition transform hover:scale-105"
                >
                  Become a Verified Supplier
                </Link>
              </div>
            </div>
          </>
        ) : (
          /* No Products Found - Only shows when no products match search/filter */
          <div className="text-center py-16">
            <div className="text-6xl mb-4 text-gray-300">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm || selectedCategory !== 'All' 
                ? "No products match your search criteria. Try different keywords or browse all categories."
                : "No products are currently available in our catalog."
              }
            </p>
            {(searchTerm || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Clear Filters & Show All Products
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Products;