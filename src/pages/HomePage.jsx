import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import SearchIcon from "@mui/icons-material/Search";
import "../layout/pages/ProductPage.css";

const HomePage = () => {
  const products = useSelector((state) => state.product.products);
  const [searchQuery, setSearchQuery] = useState("");
  const [shownProductsCount, setShownProductsCount] = useState(20); 
  const [randomProducts, setRandomProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getRandomProducts = () => {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setRandomProducts(shuffled); 
    };

    if (products.length > 0) {
      getRandomProducts();
    }
  }, [products]);

  const handleSearch = () => {
    navigate(`/product?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleViewMore = () => {
    setShownProductsCount(shownProductsCount + 20);
  };

  const isViewMoreVisible = shownProductsCount < randomProducts.length;

  return (
    <div>
      <div className="product-search-area">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <SearchIcon className="search-icon" onClick={handleSearch} />
      </div>
      <div className="home-header">
        <h1>Welcome to E-Commerce App</h1>
        <p>Use the search bar to explore products!</p>
      </div>
      <div className="product-list">
        {randomProducts.slice(0, shownProductsCount).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {isViewMoreVisible && (
        <div className="show-more-filter-products" onClick={handleViewMore}>
          View More
        </div>
      )}
    </div>
  );
};

export default HomePage;
