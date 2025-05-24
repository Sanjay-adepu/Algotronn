import React, { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar.jsx';
import { useParams, useNavigate } from "react-router-dom";
import {
  FaCartPlus,
  FaBolt,
  FaShieldAlt,
  FaMedal,
  FaLock,
  FaArrowLeft,
} from 'react-icons/fa';
import Footer from "../Footer/Footer.jsx";
import BottomNav from "../BottomNav.jsx";
import './ProductCard.css';
import { products } from './productsData';

const ProductCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    const product = products.find((p) => p.id === parseInt(id));
    if (product) {
      setSelectedProduct(product);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handleAddToCart = async (redirectToCart = false) => {
    const googleId = localStorage.getItem('googleId');
    if (!googleId) {
      alert("Please login to add items to cart");
      return;
    }

    setIsLoading(true); // Show loader

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleId, cartItem }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Item added to cart!");
        if (redirectToCart) {
          navigate('/cart');
        }
      } else {
        console.error(data);
        alert("Failed to add to cart: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while adding to cart");
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <main className="content">
          <h2 className="section-title" style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }}>Customization</h2>

          {selectedProduct ? (
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
            {!showQuantitySelector ? (
  <>
    <button
      className="add-to-cart"
      onClick={() => {
        setCartQuantity(1);
        setShowQuantitySelector(true);
      }}
    >
      <FaCartPlus className="button-icon" />
      Add to Cart
    </button>

    <button
      className="buy-now"
      onClick={async () => {
        const quantity = cartQuantity > 0 ? cartQuantity : 1;
        setCartQuantity(quantity);
        await handleAddToCart(true);
      }}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          Processing...
          <span className="spinner" />
        </>
      ) : (
        <>
          <FaBolt className="button-icon" />
          Buy Now
        </>
      )}
    </button>
  </>
) : (
  <>
    <div className="quantity-control">
      <button onClick={() => setCartQuantity(prev => Math.max(prev - 1, 1))}>-</button>
      <span>{cartQuantity}</span>
      <button onClick={() => setCartQuantity(prev => prev + 1)}>+</button>
    </div>
    <button
      className="buy-now"
      onClick={() => handleAddToCart()}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          Processing...
          <span className="spinner" />
        </>
      ) : (
        <>
          <FaBolt className="button-icon" />
          Update Cart
        </>
      )}
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
          ) : (
            <div className="product-grid">
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
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ProductCard;