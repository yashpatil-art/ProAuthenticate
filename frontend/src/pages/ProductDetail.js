import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/productsData';

const ProductDetail = () => {
  const { productSlug } = useParams();
  const product = products.find(p => p.slug === productSlug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Link to="/products" className="text-green-600 hover:text-green-700">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link to="/products" className="text-green-600 hover:text-green-700">
            ← Back to Products
          </Link>
        </nav>

        {/* Product Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">{product.icon}</span>
                <div>
                  <h1 className="text-3xl font-bold text-dark">{product.name}</h1>
                  <p className="text-green-600 text-xl italic">{product.description}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                  🔗 Blockchain Verified
                </span>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {product.fullDescription}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Export Edge:</h3>
                  <p className="text-gray-600">{product.detailedInfo.exportEdge}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Certifications:</h3>
                  <div className="flex flex-wrap gap-1">
                    {product.detailedInfo.certifications.map((cert, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Varieties & Forms */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-dark mb-4">Varieties & Forms</h2>
            <div className="flex flex-wrap gap-2">
              {product.varieties.map((variety, idx) => (
                <span key={idx} className="bg-gray-100 px-3 py-2 rounded-lg text-gray-700 border">
                  {variety}
                </span>
              ))}
            </div>
          </div>

          {/* Value Addition */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-dark mb-4">Value Addition</h2>
            <div className="flex flex-wrap gap-2">
              {product.valueAdditions.map((addition, idx) => (
                <span key={idx} className="bg-amber-100 text-amber-800 px-3 py-2 rounded-lg border border-amber-200">
                  {addition}
                </span>
              ))}
            </div>
          </div>

          {/* Global Appeal */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-dark mb-4">Global Appeal</h2>
            <p className="text-gray-700">{product.globalAppeal}</p>
          </div>

          {/* Production Regions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-dark mb-4">Production Regions</h2>
            <div className="flex flex-wrap gap-2">
              {product.detailedInfo.regions.map((region, idx) => (
                <span key={idx} className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm">
                  {region}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Specifications */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-xl font-bold text-dark mb-6">Product Specifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Cultivation & Harvest</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Harvest Season: {product.detailedInfo.harvestSeason}</li>
                <li>• Shelf Life: {product.detailedInfo.shelfLife}</li>
                {product.detailedInfo.curcuminContent && (
                  <li>• Curcumin Content: {product.detailedInfo.curcuminContent}</li>
                )}
                {product.detailedInfo.brixLevel && (
                  <li>• Brix Level: {product.detailedInfo.brixLevel}</li>
                )}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Quality Standards</h3>
              <ul className="space-y-2 text-gray-600">
                {product.detailedInfo.certifications.map((cert, idx) => (
                  <li key={idx}>• {cert} Certified</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Packaging Options</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Bulk packaging available</li>
                <li>• Custom packaging solutions</li>
                <li>• Export-grade materials</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link 
            to="/contact" 
            className="inline-flex items-center bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transform hover:scale-105 transition-all duration-300"
          >
            Inquire About {product.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;