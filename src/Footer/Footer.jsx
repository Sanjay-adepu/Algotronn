import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="footer-section">
          <h4>Collections</h4>
          <ul>
            <li><a href="#">Customization</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Links</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-credit">
        <p id="f">&copy; {new Date().getFullYear()} AlgoTRONN. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;