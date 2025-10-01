import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProducts, fetchProductsByTitle } from '../api/products';
import ProductCard from '../components/product/ProductCard';
import Hero from '../components/home/Hero'; 

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ... (all existing useEffects and handlers remain the same)
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }
    if (selectedProduct) return;
    const delayDebounceFn = setTimeout(async () => {
      const suggestedProducts = await fetchProductsByTitle(searchTerm);
      setSuggestions(suggestedProducts);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedProduct]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const productData = await fetchAllProducts();
      setProducts(productData);
      setLoading(false);
    };
    getProducts();
  }, []);

  const handleSuggestionClick = (product) => {
    setSelectedProduct(product);
    setSearchTerm('');
    setSuggestions([]);
  };
  
  const clearSelection = () => {
    setSelectedProduct(null);
  };


  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div>
      <Hero /> {}

      <div id="products-section" className="products-container">
        <div className="section-header">
            <h2>Our Products</h2>
            <p>Check out our latest arrivals</p>
        </div>

        <div className="search-wrapper">
            <div className="search-container">
            <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                disabled={!!selectedProduct}
            />
            </div>
            {suggestions.length > 0 && (
            <ul className="suggestions-list">
                {suggestions.map((product) => (
                <li key={product.id} onClick={() => handleSuggestionClick(product)}>
                    {product.title}
                </li>
                ))}
            </ul>
            )}
        </div>

        {selectedProduct && (
            <div className="selected-product-view">
            <button onClick={clearSelection} className="btn-back">← Back to All Products</button>
            <div className="product-grid">
                <ProductCard product={selectedProduct} />
            </div>
            </div>
        )}

        {!selectedProduct && (
            <div className="product-grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;