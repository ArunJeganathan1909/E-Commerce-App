import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"; // Updated import
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"; // Updated import
import ProductCard from "../components/ProductCard";
import "../layout/pages/ProductPage.css";
import "../layout/components/Filters.css";

const ProductPage = () => {
  const products = useSelector((state) => state.product.products);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [randomProducts, setRandomProducts] = useState([]);
  const [shownProductsCount, setShownProductsCount] = useState(20);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceOrder, setPriceOrder] = useState("");
  const [isAtStart, setIsAtStart] = useState(true); // Track if at start
  const [isAtEnd, setIsAtEnd] = useState(false);  // Track if at end

  // Reference for the filters container
  const filtersRef = useRef(null);

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      const getRandomProducts = () => {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setRandomProducts(shuffled);
      };
      getRandomProducts();
    }
  }, [searchQuery, products]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...products];

      if (searchQuery) {
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
      }

      if (selectedCategories.length > 0) {
        filtered = filtered.filter((product) =>
          selectedCategories.some((category) =>
            (product.categories || []).includes(category)
          )
        );
      }

      if (priceOrder === "increase") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (priceOrder === "decrease") {
        filtered.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [searchQuery, selectedCategories, products, priceOrder]);

  // Extract unique categories from filtered products
  const uniqueCategories = [
    ...new Set(filteredProducts.flatMap((product) => product.categories || [])),
  ];

  const productsToDisplay = filteredProducts.slice(0, shownProductsCount);

  const handleViewMore = () => {
    setShownProductsCount(shownProductsCount + 20);
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
    setShownProductsCount(20);
  };

  const handlePriceOrderToggle = (order) => {
    setPriceOrder((prevOrder) => (prevOrder === order ? "" : order));
    setShownProductsCount(20);
  };

  const handleScrollLeft = () => {
    if (filtersRef.current) {
      filtersRef.current.scrollBy({
        left: -200, // Scroll left by 200px
        behavior: "smooth", // Smooth scrolling effect
      });
    }
  };

  const handleScrollRight = () => {
    if (filtersRef.current) {
      filtersRef.current.scrollBy({
        left: 200, // Scroll right by 200px
        behavior: "smooth", // Smooth scrolling effect
      });
    }
  };

  const handleScroll = () => {
    if (filtersRef.current) {
      const scrollPosition = filtersRef.current.scrollLeft;
      const containerWidth = filtersRef.current.clientWidth;
      const contentWidth = filtersRef.current.scrollWidth;

      // Check if we are at the start of the content
      setIsAtStart(scrollPosition === 0);

      // Check if we are at the end of the content
      setIsAtEnd(scrollPosition + containerWidth === contentWidth);
    }
  };

  useEffect(() => {
    // Listen for scroll events to determine the position
    if (filtersRef.current) {
      filtersRef.current.addEventListener("scroll", handleScroll);
    }

    // Cleanup the event listener on unmount
    return () => {
      if (filtersRef.current) {
        filtersRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
          <span style={{ color: "#00aced" }}>{searchQuery || "you"}</span>
        </h1>
      </div>
      <div className="filters">
        {!isAtStart && (
          <ArrowBackIosIcon
            className="filter-arrow"
            onClick={handleScrollLeft} // Handle scroll left
          />
        )}
        <div className="filters-container" ref={filtersRef}>
          <div
            className={`price-filter-type ${
              priceOrder === "increase" ? "selected" : ""
            }`}
            id="increase"
            onClick={() => handlePriceOrderToggle("increase")}
          >
            Price low - high
          </div>
          <div
            className={`price-filter-type ${
              priceOrder === "decrease" ? "selected" : ""
            }`}
            id="decrease"
            onClick={() => handlePriceOrderToggle("decrease")}
          >
            Price high - low
          </div>
          <div
            className={`filter-type ${
              selectedCategories.length === 0 ? "selected" : ""
            }`}
            id="all"
            onClick={() => setSelectedCategories([])}
          >
            All
          </div>
          {uniqueCategories.map((category) => (
            <div
              key={category}
              className={`filter-type ${
                selectedCategories.includes(category) ? "selected" : ""
              }`}
              id={category}
              onClick={() => handleCategoryToggle(category)}
            >
              {category}
            </div>
          ))}
        </div>
        {!isAtEnd && (
          <ArrowForwardIosIcon
            className="filter-arrow"
            onClick={handleScrollRight} // Handle scroll right
          />
        )}
      </div>
      <div className="product-list">
        {productsToDisplay.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {shownProductsCount < filteredProducts.length && (
        <div className="show-more-filter-products" onClick={handleViewMore}>
          View More
        </div>
      )}
    </div>
  );
};

export default ProductPage;
