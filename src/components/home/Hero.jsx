import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Find Your Style</h1>
        <p>Browse our collection of curated modern apparel.</p>
        <button className="btn btn-primary" onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Hero;