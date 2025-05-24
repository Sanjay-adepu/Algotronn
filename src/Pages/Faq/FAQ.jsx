import React, { useState } from "react";
import "./FAQ.css";
import Navbar from "../../Navbar/Navbar.jsx";
const faqs = [
  {
    question: "How will the strategy be delivered to my Tradetron account?",
    answer:
      "Upon successful payment, you will be contacted via mobile number for the delivery. Strategy templates would be shared via private links. Using these links, the strategy templates can be duplicated in your Tradetron account without any hassle. The duplication process literally takes about 10 seconds.",
  },
  {
    question: "How long will it take for the strategy to be delivered to my Tradetron account?",
    answer:
      "Usually the delivery would happen within 6–24 hours.",
  },
  {
    question: "I accidentally deleted/modified the strategy template. Will I get the delivery again?",
    answer:
      "Users are strongly advised to make sufficient copies before modifying/deleting the delivered strategy templates. Under no case will the strategy template be delivered again.",
  },
  {
    question: "Will I be a profitable Trader once I purchase and use these strategy templates?",
    answer:
      "No, AlgoTRONN does not guarantee profitability. The templates are meant to save time. Users must understand the rules, risk appetite, and capital requirements before purchase. Strategies can be tweaked as needed.",
  },
  {
    question: "Will I get Performance History or Backtest Reports with every strategy template?",
    answer:
      "No. As per SEBI's regulations, no platform should show past performance. Users are encouraged to backtest using Tradetron's tools: https://tradetron.tech/blog/backtest/",
  },
  {
    question: "Would AlgoTRONN provide any Trading or Investment Tips or Calls?",
    answer:
      "No, AlgoTRONN does not offer any tips or calls. We're a coding service, not an advisory firm. Beware of anyone falsely claiming affiliation.",
  },
  {
    question: "Once I purchase the strategy template, will I get support if there is any issue?",
    answer:
      "Yes, support will be provided for any code-related issues in the strategy template.",
  },
  {
    question: "Do I need to fill in all the details in the checkout form?",
    answer:
      "Only mandatory fields are required. We don’t need your physical address since it’s a digital product. It’s a one-time process.",
  },
  {
    question: "Why is it necessary for me to verify the mobile number?",
    answer:
      "We use your mobile number to deliver the strategy and create a unique account for easy future access.",
  },
  {
    question: "How to verify the mobile number?",
    answer:
      "After adding an item to cart, a Sign-In box pops up. Enter your mobile number, click Send OTP, and enter the code you receive to verify via Dukaan.",
  },
  {
    question: "How to Contact Us?",
    answer:
      "Please visit the Contact Us page.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Navbar/>

    <section className="faq-section">
      <h2 className="faq-title"style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }} >Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
<span className="arrow">{activeIndex === index ? "▼" : "▶"}</span>
            </button>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
        </>
  );
};

export default FAQ;