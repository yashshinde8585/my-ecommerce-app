import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img 
            src={product.images[0]} 
            alt={product.title}
            onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/300" }} 
        />
        <h3>{product.title}</h3>
      </Link>
      <div className="card-footer">
        <p className="price">${product.price}</p>
        <button onClick={handleAddToCart} className="btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;