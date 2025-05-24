import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import { products } from "../Product/productsData.js";
import BottomNav from "../BottomNav.jsx";
import "./Search.css";
const SearchWithCategory = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 300);
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <Navbar />

      <div className="pro-search-container">
        <div className="search-header">
          <div className="search-input-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search for products..."
              value={query}
              onChange={handleSearch}
            />
          </div>
        </div>

        {loading ? (
          <p className="search-loading">Searching...</p>
        ) : (
          <div className="search-results">
            {results.length > 0 ? (
              results.map((product) => (
                <div
                  key={product.id}
                  className="search-result-item"
                  onClick={() => handleProductClick(product.id)}
                  style={{ cursor: "pointer" }}
                >
                  {product.name}
                </div>
              ))
            ) : (
              query && <p className="no-results">No products found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchWithCategory;