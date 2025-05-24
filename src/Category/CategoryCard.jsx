import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from "../Footer/Footer.jsx";
import BottomNav from "../BottomNav.jsx";
import {
  FaCartPlus,
  FaBolt,
  FaShieldAlt,
  FaMedal,
  FaLock,
  FaArrowLeft,
} from 'react-icons/fa';
import './CategoryCard.css';
import { products } from '../Product/productsData.js';

const ProductCard = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [showProducts, setShowProducts] = useState(false);
  const [loading, setLoading] = useState(false); // loading state

  const handleAddToCart = async () => {
    setLoading(true); // Start loading

    const googleId = localStorage.getItem('googleId');
    if (!googleId) {
      alert("Please login to add items to cart");
      setLoading(false);
      return;
    }

    const cartItem = {
      productId: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      originalPrice: selectedProduct.originalPrice,
      discount: selectedProduct.discount,
      quantity: cartQuantity,
      imageUrl: selectedProduct.imageUrl || '',
      inStock: selectedProduct.stock,
      imageText: selectedProduct.imageText || "",
    };

    try {
      const response = await fetch('https://algotronn-backend.vercel.app/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ googleId, cartItem }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Item added to cart!");
      } else {
        console.error(data);
        alert("Failed to add to cart: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while adding to cart");
    }

    setLoading(false); // Stop loading
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <main className="content">

          {/* Category View */}
          {!showProducts && !selectedProduct && (
            <div
              className="product-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowProducts(true)}
            >
              <div className="product-image">
                <p style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }} >Customization</p>
              </div>
              <h3 className="product-title">Explore Custom Strategies</h3>
            </div>
          )}

          {/* Product List View */}
          {showProducts && !selectedProduct && (
            <div className="product-grid">
              <button
                onClick={() => setShowProducts(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  color: '#054ca7',
                  fontWeight: '600',
                  fontSize: '16px',
                  cursor: 'pointer',
                  marginBottom: '20px',
                  fontFamily: "'Tinos', serif",
                }}
              >
                <FaArrowLeft style={{ marginRight: '8px' }} />
                Back to Categories
              </button>

              <h2 className="section-title" style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }} >Customization</h2>

              {products.map((product) => (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => {
                    setSelectedProduct(product);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ cursor: 'pointer', marginBottom: '20px' }}
                >
                  <div className={`product-image ${product.imageUrl ? 'no-padding' : ''}`}>
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="product-img" />
                    ) : (
                      <p>{product.imageText}</p>
                    )}
                  </div>
                  <h3 className="product-title">{product.name}</h3>
                  <div className="product-price-container">
                    <span className="product-price-current">₹{product.price}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <>
                        <span className="product-price-original" style={{ textDecoration: 'line-through', marginLeft: '10px', color: 'gray' }}>
                          ₹{product.originalPrice}
                        </span>
                        <span className="product-discount" style={{ color: 'green', marginLeft: '10px' }}>
                          ({product.discount}% off)
                        </span>
                      </>
                    )}
                  </div>
                  {!product.stock && (
                    <span className="out-of-stock">Out of stock</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Product Detail View */}
          {selectedProduct && (
            <div className="product-detail">
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  color: '#054ca7',
                  fontWeight: '600',
                  fontSize: '16px',
                  cursor: 'pointer',
                  marginBottom: '20px',
                  fontFamily: "'Tinos', serif",
                }}
              >
                <FaArrowLeft style={{ marginRight: '8px' }} />
                Back to Products
              </button>

              <div className={`product-image ${selectedProduct.imageUrl ? 'no-padding' : ''}`}>
                {selectedProduct.imageUrl ? (
                  <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="product-img" />
                ) : (
                  <p>{selectedProduct.imageText}</p>
                )}
              </div>

              <h3 className="product-title">{selectedProduct.name}</h3>

              <div className="product-price-container">
                <span className="product-price-current">₹{selectedProduct.price}</span>
                {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                  <>
                    <span className="product-price-original" style={{ textDecoration: 'line-through', marginLeft: '10px', color: 'gray' }}>
                      ₹{selectedProduct.originalPrice}
                    </span>
                    <span className="product-discount" style={{ color: 'green', marginLeft: '10px' }}>
                      ({selectedProduct.discount}% off)
                    </span>
                  </>
                )}
              </div>

              <div className="purchase-buttons">
                {cartQuantity > 0 && selectedProduct.addedToCart ? (
                  <>
                    <div className="quantity-control">
                      <button onClick={() => setCartQuantity(prev => Math.max(prev - 1, 1))}>-</button>
                      <span>{cartQuantity}</span>
                      <button onClick={() => setCartQuantity(prev => prev + 1)}>+</button>
                    </div>
                    <button
                      className="buy-now"
                      onClick={handleAddToCart}
                      disabled={loading}
                    >
                      <FaBolt className="button-icon" />
                      {loading ? "Processing..." : "Update Cart & Buy"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="add-to-cart"
                      onClick={() => {
                        setCartQuantity(1);
                        setSelectedProduct(prev => ({ ...prev, addedToCart: true }));
                        setTimeout(() => handleAddToCart(), 100);
                      }}
                      disabled={loading}
                    >
                      <FaCartPlus className="button-icon" />
                      {loading ? "Processing..." : "Add to Cart"}
                    </button>

                    <button
                      className="buy-now"
                      onClick={() => {
                        setCartQuantity(1);
                        setSelectedProduct(prev => ({ ...prev, addedToCart: true }));
                        setTimeout(() => handleAddToCart(), 100);
                      }}
                      disabled={loading}
                    >
                      <FaBolt className="button-icon" />
                      {loading ? "Processing..." : "Buy Now"}
                    </button>
                  </>
                )}
              </div>

              <div className="badge-container">
                <div className="badge-item">
                  <FaShieldAlt className="badge-icon" />
                  <span>Secure Checkout</span>
                </div>
                <div className="badge-item">
                  <FaMedal className="badge-icon" />
                  <span>Genuine Quality</span>
                </div>
                <div className="badge-item">
                  <FaLock className="badge-icon" />
                  <span>Privacy Protected</span>
                </div>
              </div>

              <pre>{selectedProduct.description}</pre>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ProductCard;