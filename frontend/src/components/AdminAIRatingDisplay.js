import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminAIRatingDisplay = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/admin/products-with-ratings');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const analyzeProduct = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/admin/analyze-product/${productId}`);
      
      setProducts(prev => prev.map(p => 
        p._id === productId ? response.data.product : p
      ));
      
      alert('AI analysis completed!');
    } catch (error) {
      alert(error.response?.data?.message || 'AI analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (score) => {
    if (score >= 9) return '#28a745';
    if (score >= 7) return '#20c997';
    if (score >= 5) return '#ffc107';
    if (score >= 3) return '#fd7e14';
    return '#dc3545';
  };

  const getRatingText = (score) => {
    if (score >= 9) return 'Excellent';
    if (score >= 7) return 'Good';
    if (score >= 5) return 'Medium';
    if (score >= 3) return 'Low';
    return 'Poor';
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">🤖 AI Quality Rating System</h4>
              <p className="mb-0">Automatic banana quality assessment</p>
            </div>
            <div className="card-body">
              <div className="row">
                {products.map(product => (
                  <div key={product._id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">{product.name}</h6>
                        <span className={`badge ${
                          product.status === 'APPROVED' ? 'bg-success' : 
                          product.status === 'REJECTED' ? 'bg-danger' : 'bg-warning'
                        }`}>
                          {product.status}
                        </span>
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
                        <p className="card-text">
                          <strong>Farmer:</strong> {product.farmerName}<br/>
                          <strong>Category:</strong> {product.category}<br/>
                          <strong>Price:</strong> ₹{product.price}
                        </p>

                        {/* AI Rating Display */}
                        {product.aiRating ? (
                          <div className="ai-rating-result">
                            <div 
                              className="p-3 text-white text-center rounded mb-2"
                              style={{ backgroundColor: getRatingColor(product.aiRating.score) }}
                            >
                              <h5 className="mb-1">AI Quality Score</h5>
                              <h2 className="mb-1">{product.aiRating.score}/10</h2>
                              <h6>{getRatingText(product.aiRating.score)}</h6>
                            </div>
                            
                            <div className="p-2 bg-light rounded">
                              <small className="text-muted">AI Assessment:</small>
                              <p className="mb-1"><strong>{product.aiRating.description}</strong></p>
                              <small>Confidence: {(product.aiRating.confidence * 100).toFixed(1)}%</small>
                              <br/>
                              <small>Analyzed: {new Date(product.aiRating.analyzedAt).toLocaleString()}</small>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <p className="text-muted mb-3">No AI rating available</p>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => analyzeProduct(product._id)}
                              disabled={loading}
                            >
                              {loading ? 'Analyzing...' : '🤖 Analyze with AI'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {products.length === 0 && (
                <div className="text-center py-5">
                  <h5>No products found</h5>
                  <p>Farmers haven't uploaded any products yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAIRatingDisplay;