import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerAIRatedProducts = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/customer/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const getRatingColor = (score) => {
    if (score >= 9) return '#28a745';
    if (score >= 7) return '#20c997';
    if (score >= 5) return '#ffc107';
    return '#fd7e14';
  };

  const getRatingStars = (score) => {
    const stars = Math.round(score / 2);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  const filteredProducts = products.filter(product => {
    if (!product.aiRating) return false;
    if (filter === 'all') return true;
    if (filter === 'premium') return product.aiRating.score >= 8;
    if (filter === 'good') return product.aiRating.score >= 6 && product.aiRating.score < 8;
    if (filter === 'standard') return product.aiRating.score < 6;
    return true;
  });

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body text-center">
              <h4>🍌 AI-Quality Rated Bananas</h4>
              <p className="mb-3">Every banana is automatically quality-checked by our AI system</p>
              
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFilter('all')}
                >
                  All Quality
                </button>
                <button
                  type="button"
                  className={`btn ${filter === 'premium' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setFilter('premium')}
                >
                  ⭐ Premium (8-10)
                </button>
                <button
                  type="button"
                  className={`btn ${filter === 'good' ? 'btn-warning' : 'btn-outline-warning'}`}
                  onClick={() => setFilter('good')}
                >
                  👍 Good (6-7.9)
                </button>
                <button
                  type="button"
                  className={`btn ${filter === 'standard' ? 'btn-info' : 'btn-outline-info'}`}
                  onClick={() => setFilter('standard')}
                >
                  ✅ Standard (1-5.9)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {filteredProducts.map(product => (
          <div key={product._id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className="card h-100 shadow-sm">
              {/* AI Rating Badge */}
              <div 
                className="card-header text-white text-center"
                style={{ backgroundColor: getRatingColor(product.aiRating.score) }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <small>AI Rated</small>
                  <small>{(product.aiRating.confidence * 100).toFixed(0)}% confidence</small>
                </div>
                <h4 className="my-1">{product.aiRating.score}/10</h4>
                <small>{getRatingStars(product.aiRating.score)}</small>
              </div>
              
              {/* Product Image */}
              {product.images && product.images[0] && (
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  <strong>Farmer:</strong> {product.farmerName}<br/>
                  <strong>Farm:</strong> {product.farmName}<br/>
                  <strong>Location:</strong> {product.location}
                </p>
                
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="text-primary mb-0">₹{product.price}</h4>
                  <span className="badge bg-success">Quality Assured</span>
                </div>
              </div>
              
              <div className="card-footer bg-transparent">
                <small className="text-muted">
                  <strong>AI Assessment:</strong> {product.aiRating.description}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-5">
          <h5>No products found</h5>
          <p>Try selecting a different quality range</p>
        </div>
      )}
    </div>
  );
};

export default CustomerAIRatedProducts;