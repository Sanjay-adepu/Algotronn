import React from "react";
import "./ContactUs.css";
import Navbar from "../../Navbar/Navbar.jsx";
const ContactUs = () => {
  return (
    <>
      <Navbar/>

    <div className="contact-container">
      <h2 className="contact-heading"style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }}>Contact Us</h2>

      <div className="contact-item">
        <strong>Telegram:</strong>{" "}
        <a href="https://t.me/AlgoTRONN_ADMIN" target="_blank" rel="noreferrer">
          https://t.me/AlgoTRONN_ADMIN
        </a>
      </div>

      <div className="contact-item">
        <strong>Email:</strong>{" "}
        <a href="mailto:support@algotronn.com">support@algotronn.com</a>
      </div>

      <div className="contact-item">
        <strong>Phone:</strong> +91 9035782813
      </div>

      <div className="contact-item">
        <strong>WhatsApp:</strong>{" "}
        <a
          href="https://wa.me/message/5FULDVO2RMT6M1"
          target="_blank"
          rel="noreferrer"
        >
          https://wa.me/message/5FULDVO2RMT6M1
        </a>
      </div>

      <div className="contact-item">
        <strong>YouTube Channel:</strong>{" "}
        <a
          href="https://www.youtube.com/channel/@AlgoTRONN"
          target="_blank"
          rel="noreferrer"
        >
          https://www.youtube.com/channel/@AlgoTRONN
        </a>
      </div>
    </div>
        </>
  );
};

export default ContactUs;