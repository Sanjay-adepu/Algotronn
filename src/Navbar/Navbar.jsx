import React, { useState } from 'react';
import './Navbar.css';
import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiHome,
  FiGrid,
} from 'react-icons/fi';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const location = useLocation();

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="navbar-logo" style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }}>
  AlgoTRONN
</div>

        <ul className="navbar-menu">
         <Link id="f" to="/"><li>Customization</li></Link>
        <Link id="f" to="/about" ><li>About Us</li></Link>
         <Link id="f" to="/faq"><li>FAQ</li></Link> 
        <Link id="f" to="/contact"><li>Contact Us</li></Link>
       <Link id="f" to="/terms"><li>Terms & conditions</li></Link> 
        <Link id="f" to="/policy"><li>Privacy Policy</li></Link> 
       <Link id="f" to="/blog"> <li>Blog</li></Link>
       
        </ul>

<div className="navbar-icons">
  {/* Desktop: Show all icons with links */}
 <Link to="/" className="icon desktop-only">
  <FiHome style={{ color: location.pathname === "/" ? "#000" : "#888" }} />
</Link>
<Link to="/search" className="icon desktop-only">
  <FiSearch style={{ color: location.pathname === "/search" ? "#000" : "#888" }} />
</Link>
<Link to="/category" className="icon desktop-only">
  <FiGrid style={{ color: location.pathname === "/category" ? "#000" : "#888" }} />
</Link>
<Link to="/cart" className="icon desktop-only">
  <FiShoppingCart style={{ color: location.pathname === "/cart" ? "#000" : "#888" }} />
</Link>
<Link to="/login" className="icon desktop-only">
  <FiUser style={{ color: location.pathname === "/login" ? "#000" : "#888" }} />
</Link>

  {/* Mobile: Search + Menu Toggle */}
  <Link to="/search" className="icon mobile-only" id="h">
    <FiSearch />
  </Link>
  <button onClick={toggleSidebar} className="icon menu-toggle mobile-only">
    {sidebarOpen ? <FiX /> : <FiMenu />}
  </button>
</div>



      </nav>

      {/* Sidebar for mobile */}
<div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
  <h2 className="sidebar-title">Menu</h2>
  <ul className="sidebar-menu"  style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }}>
   <Link id="l" to="/" ><li >Customization</li></Link>
  <Link id="l" to="/about"><li>About Us</li></Link> 
  <Link id="l" to="/faq" > <li>FAQ</li></Link>
   <Link id="l" to="/contact"> <li>Contact Us</li></Link>
   <Link id="l" to="/terms"> <li>Terms & conditions</li></Link>
 <Link id="l" to="/policy"><li>Privacy Policy</li></Link>
 <Link id="l" to="/blog"><li>Blog</li></Link> 
  </ul>
</div>

      {/* Bottom Nav for Mobile */}
<div className="bottom-nav mobile-only">
  <Link
    to="/"
    className={`bottom-nav-item ${location.pathname === "/" ? "active" : ""}`}
  >
    <FiHome
      className="icon"
      style={{ color: location.pathname === "/" ? "#000" : "#888" }}
    />
    <span style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }}>Home</span>
  </Link>
  <Link
    to="/category"
    className={`bottom-nav-item ${location.pathname === "/category" ? "active" : ""}`}
  >
    <FiGrid
      className="icon"
      style={{ color: location.pathname === "/category" ? "#000" : "#888" }}
    />
    <span style={{ fontFamily: "'Tinos', serif', fontWeight: 700 "}}>Categories</span>
  </Link>
  <Link
    to="/cart"
    className={`bottom-nav-item ${location.pathname === "/cart" ? "active" : ""}`}
  >
    <FiShoppingCart
      className="icon"
      style={{ color: location.pathname === "/cart" ? "#000" : "#888" }}
    />
    <span style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }}>Cart</span>
  </Link>
  <Link
    to="/login"
    className={`bottom-nav-item ${location.pathname === "/login" ? "active" : ""}`}
  >
    <FiUser
      className="icon"
      style={{ color: location.pathname === "/login" ? "#000" : "#888" }}
    />
    <span style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }}>Account</span>
  </Link>
</div>
      
{location.pathname === '/' && (
  <a
    href="https://wa.me/9035782813"
    className="whatsapp-floating"
    target="_blank"
    rel="noreferrer"
  >
    <img src="./whatsapp.png" alt="WhatsApp" />
  </a>
)}
      
      
    </>
  );
};

export default Navbar;