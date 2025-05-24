import React from "react";
import "./TermsAndConditions.css";
import Navbar from "../../Navbar/Navbar.jsx";
const TermsAndConditions = () => {
  return (
    <>
      <Navbar/>

    <div className="terms-container">
      <h2 className="terms-title" style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }} >Terms & Conditions</h2>

      <section className="terms-section">
        <p>By accessing algotronn.com, you agree to these terms. If you disagree, discontinue use.</p>
      </section>

      <section className="terms-section">
        <h3>Cookies</h3>
        <p>We use cookies to enhance website functionality and user experience. By using the site, you agree to our cookie policy.</p>
      </section>

      <section className="terms-section">
        <h3>Intellectual Property</h3>
        <p>All content on algotronn.com belongs to AlgoTRONN or licensors.</p>
        <ul>
          <li>You may not republish, sell, or reproduce material.</li>
          <li>Redistribute content without permission.</li>
          <li>Unauthorized framing or use of our logo is prohibited.</li>
        </ul>
      </section>

      <section className="terms-section">
        <h3>Content Liability</h3>
        <p>We are not responsible for content on third-party websites linking to or from algotronn.com.</p>
      </section>

      <section className="terms-section">
        <h3>Refund Policy</h3>
        <ul>
          <li>Orders cannot be canceled once placed.</li>
          <li>No refunds or returns after service delivery.</li>
          <li>Issues with services will be resolved promptly.</li>
        </ul>
      </section>

      <section className="terms-section">
        <h3>Shipping and Delivery</h3>
        <ul>
          <li>Pre-Built strategies: delivered within 24 Hrs.</li>
          <li>Simple Custom Strategies: within 3 working days.</li>
          <li>Complex Custom Strategies: up to 10 working days.</li>
        </ul>
      </section>

      <section className="terms-section">
        <h3>Custom Strategy Creation Terms</h3>
        <ul>
          <li>Complete charges and delivery timeline will be shared after reviewing requirements.</li>
          <li>Test version will be shared for monitoring trades.</li>
          <li>Final delivery via private links to your Tradetron account.</li>
          <li>Full refund if strategy development is infeasible.</li>
          <li>Post-delivery support will be provided for any functional issues.</li>
          <li>Slippage and data discrepancies between platforms are not covered.</li>
        </ul>
      </section>

      <section className="terms-section">
        <h3>Disclaimer</h3>
        <ul>
          <li>AlgoTRONN is a coding service provider, not an advisory firm.</li>
          <li>Strategies are not investment advice.</li>
          <li>Users must do their own due diligence.</li>
          <li>We are not responsible for any profits/losses incurred.</li>
          <li>Consult your financial advisor before using any strategy.</li>
          <li>Refer to the FAQ page before making purchases.</li>
        </ul>
      </section>

      <section className="terms-section">
        <p>For questions or concerns, contact us at: <a href="mailto:support@algotronn.com">support@algotronn.com</a></p>
      </section>
    </div>
        </>
  );
};

export default TermsAndConditions;