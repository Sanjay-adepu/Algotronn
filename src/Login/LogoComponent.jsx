import React, { useEffect, useState } from 'react';
import './LogoComponent.css';
import Navbar from '../Navbar/Navbar';
import { FiShoppingBag, FiMapPin, FiLogOut } from 'react-icons/fi';
import AddressForm from './AdressForm.jsx';
import AccountPage from './AccountPage';

const LogoComponent = () => {
const [accountDetails, setAccountDetails] = useState(null);
const [view, setView] = useState('signin'); // New state to manage screen transitions
const [formData, setFormData] = useState({
name: '',
mobile: '',
email: '',
address: '',
locality: '',
landmark: '',
pincode: '',
city: '',
state: '',
});

useEffect(() => {
  // Check for persisted login
  const storedGoogleId = localStorage.getItem('googleId');
  const storedEmail = localStorage.getItem('email');

  if (storedGoogleId && storedEmail) {
    setFormData(prev => ({ ...prev, email: storedEmail }));
    setView('account');
    return; // Skip Google sign-in script
  }

  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  window.handleCredentialResponse = async (response) => {
    try {
      const res = await fetch('https://algotronn-backend.vercel.app/api/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem('googleId', data.user.googleId);
        localStorage.setItem('email', data.user.email);

        setAccountDetails(data.user);
        setFormData(prev => ({ ...prev, email: data.user.email }));

        if (data.isNewUser) {
          setView('address');
        } else {
          setView('account');
        }
      } else {
        alert('Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during login.');
    }
  };

  script.onload = () => {
    window.google.accounts.id.initialize({
      client_id: '741240365062-r2te32gvukmekm4r55l4ishc0mhsk4f9.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('googleSignInDiv'),
      {
        theme: 'outline',
        size: 'large',
        type: 'standard',
      }
    );

    window.google.accounts.id.prompt();
  };
}, []);



const handleChange = (e) => {
setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleSubmit = (e) => {
e.preventDefault();
console.log('Submitted Address:', formData);
alert('Address submitted successfully!');
setView('account'); // Switch to account page
};

const handleSignOut = () => {
  localStorage.removeItem('googleId');
  localStorage.removeItem('email');

  setAccountDetails(null);
  setFormData({
    name: '',
    mobile: '',
    email: '',
    address: '',
    locality: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
  });
  setView('signin');
};

return (
<>
<Navbar />
<div className="auth-container fade-in">
{view === 'signin' && (
<div className="form-card">
<h2>Sign in with Google</h2>
<div id="googleSignInDiv"></div>
<p className="terms">
By continuing, you agree to our <a href="#">Terms</a> & <a href="#">Privacy Policy</a>.
</p>
</div>
)}

{view === 'address' && (
<AddressForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
)}
{view === 'account' && (
<AccountPage formData={formData} handleSignOut={handleSignOut} />
)}

</div>    
</>

);
};

export default LogoComponent;

