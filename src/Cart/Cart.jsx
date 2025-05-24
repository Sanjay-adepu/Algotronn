
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { FaArrowLeft } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi'; // For empty cart
import './Cart.css';
import { FiCheckCircle } from 'react-icons/fi';
const Cart = () => {
const [cartItems, setCartItems] = useState([]);
const [loading, setLoading] = useState(true);
const [couponCode, setCouponCode] = useState('');
const [discountInfo, setDiscountInfo] = useState(null);
const [userAddress, setUserAddress] = useState(null);
const [addressForm, setAddressForm] = useState({
name: '',
address: '',
locality: '',
landmark: '',
city: '',
state: '',
pincode: '',
mobile: '',
email: ''
});
const [viewState, setViewState] = useState('cart');

const getGoogleId = () => localStorage.getItem('googleId');

useEffect(() => {
const fetchCart = async () => {
const googleId = getGoogleId();
if (!googleId) return;

try {    
    const res = await axios.post('https://algotronn-backend.vercel.app/get-cart', { googleId });    
    if (res.data.success) {    
      setCartItems(res.data.cart);    
    }    
  } catch (error) {    
    console.error('Error fetching cart:', error);    
  } finally {    
    setLoading(false);    
  }    
};    

fetchCart();

}, []);

const handleRemoveItem = async (productId) => {
const googleId = getGoogleId();
if (!googleId) return;

try {    
  const res = await axios.post('https://algotronn-backend.vercel.app/remove-cart-item', {    
    googleId,    
    productId,    
  });    

  if (res.data.success) {    
    setCartItems(res.data.cart);    
    setDiscountInfo(null);    
  }    
} catch (error) {    
  console.error('Error removing item:', error);    
}

};

const handleQuantityChange = async (productId, newQuantity) => {
const googleId = getGoogleId();
if (!googleId) return;

try {    
  const res = await axios.post('https://algotronn-backend.vercel.app/update-cart-quantity', {    
    googleId,    
    productId,    
    quantity: newQuantity,    
  });    

  if (res.data.success) {    
    setCartItems(res.data.cart);    
    setDiscountInfo(null);    
  }    
} catch (error) {    
  console.error('Error updating quantity:', error);    
}

};

const applyCoupon = async () => {
const googleId = getGoogleId();
if (!googleId || !couponCode) return;

try {
const res = await axios.post('https://algotronn-backend.vercel.app/apply-coupon', {
googleId,
couponCode,
});

if (res.data.success) {    
  const updatedCart = res.data.updatedCart || [];    
  setDiscountInfo({    
    discount: res.data.discount,    
    finalTotal: res.data.finalTotal,    
    couponCode: res.data.couponCode,    
    message: res.data.message,    
  });    
alert(JSON.stringify(discountInfo, null, 2));    
  // Send updated pricing to backend    
  updatedCart.forEach(async (item) => {    
    await axios.post('https://algotronn-backend.vercel.app/update-cart-pricing', {    
      googleId,    
      productId: item.productId,    
      price: item.price,    
      discount: item.discount,    
    });    
  });    
} else {    
  alert(res.data.message);    
  setDiscountInfo(null);    
}

} catch (error) {
console.error('Error applying coupon:', error);
alert('Something went wrong. Please try again.');
setDiscountInfo(null);
}
};

const handleContinue = async () => {
const googleId = getGoogleId();
if (!googleId) return;

try {    
  const res = await axios.post('https://algotronn-backend.vercel.app/get-address', {    
    googleId,    
  });    

  if (res.data.success && res.data.address) {    
    setUserAddress(res.data.address);    
    setViewState('address');    
  } else {    
    setUserAddress(null);    
    setViewState('edit');    
  }    
} catch (error) {    
  console.error('Error fetching address:', error);    
  alert('Something went wrong while fetching address.');    
}

};

const handleSaveAddress = async () => {
const googleId = getGoogleId();
if (!googleId) return false;

const isFormComplete = Object.values(addressForm).every((val) => val.trim() !== '');    
if (!isFormComplete) {    
  alert('Please fill out all address fields.');    
  return false;    
}    

try {    
  const res = await axios.post('https://algotronn-backend.vercel.app/update-address', {    
    ...addressForm,    
    googleId,    
  });    

  if (res.data.success) {    
    setUserAddress(addressForm);    
    return true;    
  } else {    
    alert('Failed to save address.');    
    return false;    
  }    
} catch (error) {    
  console.error('Error saving address:', error);    
  alert('Failed to save address.');    
  return false;    
}

};

const calculateTotal = () =>
cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

const calculateOriginalTotal = () =>
cartItems.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);

const savedAmount = calculateOriginalTotal() - calculateTotal();
const savedPercent = ((savedAmount / calculateOriginalTotal()) * 100).toFixed(0);

return (
<>
<Navbar />

{loading ? (
  <div className="loading-spinner"style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }}>Processing your cart...</div>
) : cartItems.length === 0 && viewState === 'cart' ? (
  <div className="empty-cart">
    <FiShoppingCart className="empty-cart-icon" />
    <div className="empty-cart-text" style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }}>Your cart is empty</div>
  </div>
) : viewState === 'edit' ? (
    <div className="address-form-box">    
      <h3>{userAddress ? 'Update Address' : 'Add New Address'}</h3>    
      {Object.keys(addressForm).map((key) => (    
        <input    
          key={key}    
          type="text"    
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}    
          value={addressForm[key]}    
          onChange={(e) => setAddressForm({ ...addressForm, [key]: e.target.value })}    
        />    
      ))}    

      <button    
        className="save-address-btn"    
        onClick={async () => {    
          const success = await handleSaveAddress();    
          if (success) setViewState('address');    
        }}    
      >    
        Submit    
      </button>    
    </div>    
  ) : viewState === 'address' ? (    
    <div className="address-top-box">    
      <div className="address-header" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>    
        <FaArrowLeft    
          style={{ cursor: 'pointer', fontSize: '1.5rem' }}    
          onClick={() => setViewState('cart')}    
          title="Go back to cart"    
        />    
        <h3 style={{ margin: 0 }}>Shipping Address</h3>    
        <button    
          className="add-address-btn"    
          onClick={() => {    
            setAddressForm(userAddress || {});    
            setViewState('edit');    
          }}    
          style={{ marginLeft: 'auto' }}    
        >    
          Edit Address    
        </button>    
      </div>    

      <p><strong>{userAddress.name}</strong></p>    
      <p>{userAddress.address}, {userAddress.locality}</p>    
      <p>{userAddress.landmark}</p>    
      <p>{userAddress.city}, {userAddress.state} - {userAddress.pincode}</p>    
      <p>Mobile: {userAddress.mobile}</p>    
      <p>Email: {userAddress.email}</p>    

      {/* Payment Option */}    
      <div className="payment-option" style={{    
        display: 'flex',    
        alignItems: 'center',    
        border: '1px solid #ccc',    
        borderRadius: '8px',    
        padding: '12px',    
        cursor: 'pointer',    
        marginTop: '20px',    
      }} onClick={() => alert('Cash on Delivery selected')}>    
        <div className="payment-icon" style={{ marginRight: '15px' }}>    
          <img    
            src="../../public/file_0000000040a461f888f5f0023b433e83.png"    
            alt="Cash on delivery"    
            style={{ width: '60px', height: '60px' }}    
          />    
        </div>    
        <div className="payment-info" style={{ flex: 1 }}>    
          <h4 style={{ margin: '0 0 5px 0' }}>Cash on delivery</h4>    
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>    
            Pay in cash or pay in person at the time of delivery with GPay/PayTM/PhonePe.    
          </p>    
        </div>    
        <div className="payment-radio">    
          <input type="radio" checked readOnly />    
        </div>    
      </div>    

   <button

className="continue-payment-btn"
style={{ marginTop: '20px' }}
onClick={async () => {
const googleId = localStorage.getItem('googleId');
if (!googleId) {
console.error('Google ID not found in localStorage');
return;
}

try {    
  const response = await fetch('https://algotronn-backend.vercel.app/place-order', {    
    method: 'POST',    
    headers: {    
      'Content-Type': 'application/json',    
    },    
    body: JSON.stringify({ googleId }),    
  });    

  if (response.ok) {    
    const result = await response.json();    
    console.log('Order placed:', result);    
    setViewState('confirmation');    
  } else {    
    console.error('Failed to place order:', response.statusText);    
  }    
} catch (error) {    
  console.error('Error placing order:', error);    
}

}}

> 

Continue
</button>
</div>
) : viewState === 'confirmation' ? (
<div className="confirmation-animation">
<div className="animation-wrapper">
<FiCheckCircle className="confirmation-icon" />
<h2>Thank you for your order!</h2>
<p>Your order has been successfully placed.</p>
<div className="confirmation-buttons">
<button className="track-order-btn" onClick={() => window.location.href = '/order'}>
Track Order
</button>
<button className="continue-shopping-btn" onClick={() => window.location.href = '/'}>
Continue Shopping
</button>
</div>
</div>
</div>
) : (
<div className="cart-wrapper">
<div className="cart-header">
<span>{cartItems.length} ITEM{cartItems.length !== 1 ? 'S' : ''}</span>
<span>Total ₹{discountInfo ? discountInfo.finalTotal.toFixed(2) : calculateTotal().toFixed(2)}</span>
</div>

{cartItems.map((item, index) => (    
        <div key={index} className="cart-item">    
          <img src={item.imageUrl} alt={item.productName} className="cart-img" />    
          <div className="cart-details">    
            <h4>{item.name}</h4>    
            <p>    
              <span className="cart-price">₹{item.price}</span>{' '}    
              <span className="cart-original">₹{item.originalPrice}</span>{' '}    
              <span className="cart-discount">({item.discount}% off)</span>    
            </p>    
            <p className="cart-saved">You saved ₹{item.originalPrice - item.price}</p>    
            <div className="cart-controls">    
              <select    
                value={item.quantity}    
                onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}    
              >    
                {[1, 2, 3, 4, 5,6,7,8,9,10].map((qty) => (    
                  <option key={qty} value={qty}>Qty: {qty}</option>    
                ))}    
              </select>    
              <button className="remove-btn" onClick={() => handleRemoveItem(item.productId)}>REMOVE</button>    
            </div>    
          </div>    
        </div>    
      ))}    

      <div className="cart-summary">    
        <div className="coupon-section">    
          <div className="coupon-label">Coupons and offers</div>    
          <input    
            type="text"    
            value={couponCode}    
            onChange={(e) => setCouponCode(e.target.value)}    
            placeholder="Enter coupon code"    
            className="coupon-input"    
          />    
          <button className="apply-btn" onClick={applyCoupon}>Apply</button>    
        </div>    

        {discountInfo && <div className="coupon-success">{discountInfo.message}</div>}    

        <div className="summary-row">    
          <span>Item total</span>    
          <span className="price-strike">₹{calculateOriginalTotal().toFixed(2)}</span>    
          <span>₹{calculateTotal().toFixed(2)}</span>    
        </div>    

        {discountInfo && (    
          <div className="summary-row">    
            <span>Coupon Discount ({discountInfo.couponCode})</span>    
            <span>- ₹{discountInfo.discount.toFixed(2)}</span>    
          </div>    
        )}    

        <div className="summary-row">    
          <span>Delivery fee</span>    
          <span className="free-label">FREE</span>    
        </div>    

        <hr />    

        <div className="summary-total">    
          <span>Grand total</span>    
          <span>₹{discountInfo ? discountInfo.finalTotal.toFixed(2) : calculateTotal().toFixed(2)}</span>    
        </div>    

        {savedAmount > 0 && (    
          <div className="savings-info">    
            You have saved total {savedPercent}% (₹{savedAmount.toFixed(2)}) on your order! Yay!    
          </div>    
        )}    

        <button className="continue-btn" onClick={handleContinue}>Continue</button>    
      </div>    
    </div>    
  )}    
</>

);
};

export default Cart;

