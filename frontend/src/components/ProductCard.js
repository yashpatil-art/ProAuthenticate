import React from 'react';
import { getImageUrl } from '../services/api'; // Adjust import path based on your structure
import './ProductCard.css';

const ProductCard = ({ product, onProductClick }) => {
  const handleImageError = (e) => {
    e.target.src = '/placeholder-image.jpg';
  };

  const handleClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-container">
        <img 
          src={getImageUrl(product.image)} 
          alt={product.name}
          onError={handleImageError}
          className="product-image"
        />
        <div className="product-status-badge">{product.verificationStatus}</div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-details">
          <span className="product-category">{product.category}</span>
          <span className="product-price">₹{product.price}</span>
        </div>
        
        <div className="product-meta">
          <span className="farmer-name">By {product.farmer?.name}</span>
          <span className="harvest-date">{new Date(product.harvestDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;