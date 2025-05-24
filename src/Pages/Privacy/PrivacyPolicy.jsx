import React from "react";
import "./PrivacyPolicy.css";
import Navbar from "../../Navbar/Navbar.jsx";
const PrivacyPolicy = () => {
  return (
    <>
      <Navbar/>

    <div className="privacy-container">
      <h2 className="privacy-title"style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }} >Privacy Policy</h2>
      <p id="t" >
        This Privacy Policy explains how we collect, use, and disclose your information when you use our Service, your privacy rights, and legal protections. By using the Service, you consent to the terms outlined here.
      </p>

      <section className="privacy-section">
        <h3>Key Definitions</h3>
        <ul>
          <li><strong>Account:</strong> A unique user account for accessing our Service.</li>
          <li><strong>Company:</strong> AlgoTRONN ("We", "Us", "Our").</li>
          <li><strong>Cookies:</strong> Small files on your device storing browsing data.</li>
          <li><strong>Personal Data:</strong> Information that identifies an individual.</li>
          <li><strong>Service:</strong> Our website, algotronn.com.</li>
          <li><strong>Usage Data:</strong> Automatically collected data like IP address, browser type, and usage patterns.</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h3>Data Collection</h3>
        <p><strong>Personal Data:</strong> Includes name, email, phone, address, and more.</p>
      </section>

      <section className="privacy-section">
        <h3>Use of Personal Data</h3>
        <ul>
          <li>To provide and improve the Service.</li>
          <li>To manage your account and communications.</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h3>Security</h3>
        <p>We use commercially reasonable methods to secure your data but cannot guarantee complete security.</p>
      </section>

      <section className="privacy-section">
        <h3>Children's Privacy</h3>
        <p>We do not knowingly collect data from individuals under 13. If discovered, such data will be deleted.</p>
      </section>

      <section className="privacy-section">
        <h3>Links to Other Websites</h3>
        <p>We are not responsible for the content or policies of third-party websites linked from our Service.</p>
      </section>

      <section className="privacy-section">
        <h3>Changes</h3>
        <p>We may update this policy periodically and notify users of significant changes.</p>
      </section>

      <section className="privacy-section">
        <h3>Contact Us</h3>
        <p>For questions, email us at: <a href="mailto:support@algotronn.com">support@algotronn.com</a></p>
      </section>
    </div>
        </>
  );
};

export default PrivacyPolicy;