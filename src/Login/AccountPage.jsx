import React, { useEffect, useState } from 'react';
import { FiShoppingBag, FiMapPin, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './AccountPage.css';

const AccountPage = ({ handleSignOut }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div className="account-container">
    <div className="account-header">
  <h2 id="h" style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }} >My Account</h2>
  {email && <span className="account-email" id="k">{email}</span>}
</div>
      <div className="account-options">
<Link to="/order" style={{ textDecoration: 'none' }}>
  <div className="account-item">
    <div className="left" style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }} id="n">
      <FiShoppingBag /> My Orders
    </div>
  </div>
</Link>

<Link to="/my-address" style={{ textDecoration: 'none' }}>
  <div className="account-item">
    <div className="left" style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }} id="n">
      <FiMapPin /> My Addresses
    </div>
  </div>
</Link>
        <div className="account-item logout" onClick={handleSignOut}>
          <div className="left" style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }} ><FiLogOut /> Sign Out</div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;