import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; 
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const { user } = useAuth(); // Get the current user
  const navigate = useNavigate(); // For programmatic navigation

  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (user) {
      alert('Proceeding to checkout!');
    } else {
      navigate('/login');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty.</h2>
        <Link to="/" className="btn">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.images[0]} alt={item.title} />
          <div className="cart-item-details">
            <h3>{item.title}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
          </div>
          <button onClick={() => removeFromCart(item.id)} className="btn-remove">Remove</button>
        </div>
      ))}
      <div className="cart-summary">
        <h2>Total: ${totalCost.toFixed(2)}</h2>
        <button onClick={handleCheckout} className="btn btn-primary">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;