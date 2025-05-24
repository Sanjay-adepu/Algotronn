import React from "react";
import "./AboutUs.css";
import Navbar from "../../Navbar/Navbar.jsx";

const AboutUs = () => {
  return (
    <>
      <Navbar/>

    <section className="about-section">
      <div className="about-card">
        <h2 className="about-title"
        style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }}>About Us</h2>
        <p className="about-quote">
          “There can be no greater gift than that of giving one's time and energy to help others.” — <em>Nelson Mandela</em>
        </p>
        <p>
          AlgoTRONN started as a helping hand for traders looking to automate and trade their own strategies. Since November 2021, we’ve specialized in custom development of fully automated Algo Trading Strategies on <strong>Tradetron</strong>.
        </p>
        <p>
          Tradetron is a leading Algo Trading platform that empowers traders with seamless automation. At AlgoTRONN, our mission is to simplify and accelerate the strategy creation process while delivering top-tier service.
        </p>
        <h3 id="g" >Here is what our customers say about us</h3>
        <div className="review-images">
          {/* Replace with real images later */}
          <img src="./3.png" alt="Customer Review 1" />
          <img src="./4.png" alt="Customer Review 2" />
          <img src="./5.png" alt="Customer Review 3" />
          <img src="./6.png" alt="Customer Review 4" />
        </div>
      
        
        
        
      </div>

    
        
    </section>
        </>
  );
};

export default AboutUs;