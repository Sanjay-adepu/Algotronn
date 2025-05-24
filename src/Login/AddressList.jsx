import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const AddressList = () => {
  const [address, setAddress] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const googleId = localStorage.getItem('googleId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch('https://algotronn-backend.vercel.app/get-address', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ googleId }),
        });
        const data = await response.json();

        if (response.ok && data.success) {
          setAddress(data.address);
          setForm(data.address);
        } else {
          setError(data.message || 'Failed to fetch address');
        }
      } catch (err) {
        console.error(err);
        setError('Server error. Try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (googleId) fetchAddress();
    else {
      setError('User not logged in');
      setLoading(false);
    }
  }, [googleId]);

  const handleEditChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setMessage('');
    try {
      const response = await fetch('https://algotronn-backend.vercel.app/update-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleId, ...form }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setAddress(data.address);
        setEditing(false);
        setMessage(data.message);
      } else {
        setError(data.message || 'Failed to update address');
      }
    } catch (err) {
      console.error(err);
      setError('Server error while updating');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="title">My Address</h2>

        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Loading address...</p>
          </div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : editing ? (
          <div className="form-group">
            <input name="name" value={form.name || ''} onChange={handleEditChange} placeholder="Name" />
            <input name="email" value={form.email || ''} onChange={handleEditChange} placeholder="Email" />
            <input name="mobile" value={form.mobile || ''} onChange={handleEditChange} placeholder="Mobile" />
            <input name="address" value={form.address || ''} onChange={handleEditChange} placeholder="Address" />
            <input name="locality" value={form.locality || ''} onChange={handleEditChange} placeholder="Locality" />
            <input name="landmark" value={form.landmark || ''} onChange={handleEditChange} placeholder="Landmark" />
            <input name="pincode" value={form.pincode || ''} onChange={handleEditChange} placeholder="Pincode" />
            <input name="city" value={form.city || ''} onChange={handleEditChange} placeholder="City" />
            <input name="state" value={form.state || ''} onChange={handleEditChange} placeholder="State" />
            <button className="btn save" onClick={handleUpdate}>Save</button>
            <button className="btn cancel" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        ) : address ? (
          <div className="card">
            <p><strong>{address.name}</strong></p>
            <p>Email: {address.email}</p>
            <p>{address.mobile}</p>
            <p>{address.address}</p>
            <p>{address.locality}</p>
            <p>{address.landmark} . {address.pincode}</p>
            <p>{address.city}, {address.state}</p>
            <button className="btn edit" onClick={() => setEditing(true)}>Edit</button>
          </div>
        ) : (
          <div className="no-address">
            <p>No address found for your account.</p>
            <button className="btn add" onClick={() => navigate('/address')}>Add Address</button>
          </div>
        )}

        {message && <p className="success">{message}</p>}
      </div>
<style>{`
html, body, #root {
  height: 100%;
  margin: 0;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;     /* Vertical centering */
  align-items: center;         /* Horizontal centering */
  min-height: 80vh;            /* Occupy most of the viewport */
  padding: 24px;
  max-width: 600px;
  margin: auto;
  font-family: 'Inter', 'Segoe UI', Tahoma, sans-serif;
  color: #111827;
}

  .title {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 28px;
    text-align: center;
  }

  .card {
    width: 100%;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
    line-height: 1.6;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  .form-group input {
    padding: 14px 16px;
    font-size: 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background-color: #f9fafb;
    transition: border 0.2s;
  }

  .form-group input:focus {
    outline: none;
    border-color: #3b82f6;
    background-color: #fff;
  }

  .btn {
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    margin-top: 12px;
  }

  .btn:hover {
    transform: translateY(-1px);
  }

  .btn.edit {
    background-color: #3b82f6;
    color: white;
  }

  .btn.save {
    background-color: #10b981;
    color: white;
  }

  .btn.cancel {
    background-color: #f3f4f6;
    color: #111827;
    border: 1px solid #d1d5db;
  }

  .btn.add {
    background-color: #0ea5e9;
    color: white;
  }

  .success {
    color: #16a34a;
    font-weight: 500;
    margin-top: 12px;
  }

  .error {
    color: #dc2626;
    font-weight: 500;
    margin-top: 12px;
  }

  .loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .loader {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #3b82f6;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }

  .no-address {
    text-align: center;
    margin-top: 24px;
    color: #4b5563;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 600px) {
    .container {
      padding: 16px;
    }

    .form-group input {
      font-size: 15px;
    }

    .btn {
      width: 100%;
    }
  }
`}</style>

    </>
  );
};

export default AddressList;