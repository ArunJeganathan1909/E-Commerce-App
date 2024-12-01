import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../layout/pages/ProductPage.css";

const ProductPage = () => {
  const products = useSelector((state) => state.product.products);
  const location = useLocation();

  // Extract the search query from the URL
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [randomProducts, setRandomProducts] = useState([]);
  const [shownProductsCount, setShownProductsCount] = useState(20); // Track how many products are shown

  // Update searchQuery when the URL query parameter changes
  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  // Set random products if no search query is present
  useEffect(() => {
    if (!searchQuery) {
      const getRandomProducts = () => {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setRandomProducts(shuffled); // Store all random products
      };
      getRandomProducts();
    }
  }, [searchQuery, products]);

  // Filter products based on the search query if search is present
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Limit to the displayed products based on search or random selection
  const productsToDisplay = searchQuery
    ? filteredProducts.slice(0, shownProductsCount)
    : randomProducts.slice(0, shownProductsCount);

  const handleViewMore = () => {
    // Show the next 20 products
    setShownProductsCount(shownProductsCount + 20);
  };

  // Check if the "View More" button should be visible
  const isViewMoreVisible =
    (searchQuery && shownProductsCount < filteredProducts.length) ||
    (!searchQuery && shownProductsCount < randomProducts.length);

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
      </div>
      <div className="product-header">
        <h1>
          Product Results for{" "}
          <span style={{ color: "#00aced" }}>{searchQuery || "random"}</span>
        </h1>
      </div>
      <div className="product-list">
        {productsToDisplay.map((product) => (
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

export default ProductPage;
