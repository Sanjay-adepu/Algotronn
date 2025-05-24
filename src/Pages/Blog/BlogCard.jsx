import React, { useState } from 'react';
import './BlogCard.css';
import Navbar from "../../Navbar/Navbar.jsx";
const blogs = [
  {
    id: 1,
    date: "06 May 2023",
    title: "Why a lot of Traders are getting into Option Selling?",
    image: "/image.webp",
    summary: "While most people focus on buying stocks, there's another way to make money: selling options. In fact, there are inherent advantages to being an option seller that can lead to consistent profits. In this blog post, we will discuss some of the key advantages of being an option seller and how you can use them to your advantage..",
    content: `While most people focus on buying stocks, there's another way to make money: selling options. In fact, there are inherent advantages to being an option seller that can lead to consistent profits. In this blog post, we will discuss some of the key advantages of being an option seller and how you can use them to your advantage.

 

Time decay:
One of the biggest advantages of being an option seller is time decay. As an option seller, you are essentially selling the right to buy or sell an underlying asset at a specific price for a specific period of time. As time passes, the value of the option decreases, which means that you can profit from the difference between the price you sold the option for and the lower price that the option is currently worth. This means that you can make money even if the underlying asset does not move in the direction you predicted.

 

Flexibility:
Another advantage of being an option seller is flexibility. Unlike buyers, who are locked into a specific position, option sellers have the flexibility to adjust their position as the market changes. For example, if you sold a call option and the underlying asset starts to rise in price, you can buy back the option to limit your losses. Alternatively, you could sell another call option at a higher strike price to collect more premium and potentially make more profits.

 

Probability of success:
Option selling is generally considered to be a higher probability strategy than option buying. This is because option buyers need the underlying asset to move in the direction they predicted in order to make a profit. Option sellers, on the other hand, can profit as long as the underlying asset stays within a certain price range. This means that option sellers have a higher probability of success compared to option buyers.

 

Premium income:
Finally, option sellers can generate consistent income through premium collection. Every time you sell an option, you collect a premium from the buyer. This premium income can add up over time and provide a steady source of income. Of course, there is always risk involved in options trading, but if you manage your risk properly, you can potentially generate consistent profits as an option seller.

 

In conclusion, being an option seller has several inherent advantages that can help you generate consistent profits in the market. These advantages include time decay, flexibility, probability of success, and premium income. If you are interested in becoming an option seller, it is important to educate yourself about the risks and strategies involved in options trading. With the right knowledge and approach, you can potentially achieve your financial goals through options trading.`,
  },
  {
    id: 2,
    date: "06 May 2023",
    title: "Why Traders Are Switching from Manual Trading to Algo Trading?",
    image: "/image-png.webp",
    summary: "Compared to some more developed markets, retail trading employing algorithms is still a relatively new phenomenon in India. According to data, over 11 million new DMAT accounts were opened between April 2020 and January 2021.",
    content: `
Introduction:
Algorithmic trading, also known as Algo Trading or systematic trading, is a method of executing pre-programmed trading instructions in an automated fashion. It involves the use of algorithms to enter orders, monitor market conditions or manage risk. Algorithmic trading is increasingly being used by investors and brokers as an alternative to manual broker-assisted trade execution.
Finding the right balance between risk and reward is key to success in any trading strategy, algorithmic or not. By automating pre-planned processes into set algorithms, traders can reduce risk while also increasing profitability. In other words, algo trading reduces the time spent on routine tasks while simultaneously reducing risk and increasing returns. This article covers everything you need to know about  algo trading and whether it’s worth your time as a trader.


Algorithmic Trading In India:
Algo trading isn’t really new in India’s financial markets. It was introduced and allowed by the market regulator SEBI in 2008, and initially, it started with Direct Market Access and was restricted to institutional investors. After the stock exchanges started leasing co-location servers to brokers and fintech firms, retail participation started growing. In 2012, SEBI put in place broad guidelines for algo trading in the Indian securities market. Generally, algo trading was used by mutual funds, hedge funds, insurance companies, banks, and other institutions to execute a large number of high-volume trades that are otherwise impossible for humans to undertake. However, over the past decade, the rise of fintech firms has led to an increase in retail participation in algo trading space. Algo trading’s share in the Indian financial market had stabilised at about 50 percent, according to a report by the National Institute of Financial Management in 2018.
 

Challenges Faced by Manual Traders:
Manual trading is a trading process that involves human decision-making for entering and exiting trades.

Traders are executed manually at the current price
Speed and accuracy of placing a trade is left to the human and may vary from person to person
Manual traders are placed via manual click buttons tons and may lead to price changes before execution
Manually checking multiple market conditions simultaneously is not the possible possibility of various errors while placing trades
Backtesting off manual trading to see if it is a viable trading strategy can be difficult
Emotional and psychological factors associated with human traders could lead to mistakes

Benefits of Algo Trading:

Since trading opportunities frequently have a short lifespan, order execution speed is crucial. Capturing these transient trading opportunities is made easier by algorithmic trading.
Trading is automated using algorithms with little assistance from humans.
In a rule-based trading system like algorithmic trading, there is no room for human emotions to hurt the deal.
By removing the chance of human error in judgment, overtrading, etc., algorithmic trading lowers trading risks.
Time spent making and executing trading decisions is crucial in the market, particularly when it is turbulent. The use of algorithmic trading can expedite this process.
The Algorithmic Trading paradigm allows for the execution of difficult-to-implement complex trading strategies.

Summary:
Compared to some more developed markets, retail trading employing algorithms is still a relatively new phenomenon in India. According to data, over 11 million new DMAT accounts were opened between April 2020 and January 2021. Due to the possibility of working from home offered to the nation's workforce, the initial enthusiasm for investing in the stock market was made attainable. Nevertheless, it can be difficult to make money through manual trading and investing during market hours after the market corrects itself, work-from-home regulations are relaxed, and people return to working from offices. As a result, there is a great chance to introduce automated trading to Indian ordinary investors. It has its advantages and disadvantages, and it is up to the investor to choose what suits them best. With so many cutting-edge products and offerings available, it's a perfect moment to invest in the Indian stock market. However, algorithmic trading is highly technical and requires immense knowledge related to the financial market, data analysis, and computer programs. Furthermore, algorithmic trading demands access to past asset performance, live market feed, and a detailed infrastructure of trading platforms and integrated networks. Algo trading is one of the best ways for an investor to ensure they do not commit physical or emotional errors while trading and miss out on potential profits.`,
  },
  // Add more blog objects here
];

const BlogList = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const expandedBlog = blogs.find(blog => blog.id === expandedId);

  return (
    <>
      <Navbar/>

    <div className="blog-container">
      {expandedId === null ? (
        blogs.map(blog => (
          <div key={blog.id} className="blog-card" onClick={() => toggleExpand(blog.id)}>
            <img src={blog.image} alt={blog.title} className="blog-img" />
            <p className="blog-date">{blog.date}</p>
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-summary">{blog.summary}</p>
            <span className="read-more">Read now →</span>
          </div>
        ))
      ) : (
        <div className="blog-full">
          <p className="blog-date">{expandedBlog.date}</p>
          <h1 className="blog-title">{expandedBlog.title}</h1>
          <img src={expandedBlog.image} alt={expandedBlog.title} className="blog-img" />
          <p className="blog-content">{expandedBlog.content}</p>
          <span className="read-more" onClick={() => setExpandedId(null)}>Back to Blogs</span>
        </div>
      )}
    </div>
        </>
  );
};

export default BlogList;