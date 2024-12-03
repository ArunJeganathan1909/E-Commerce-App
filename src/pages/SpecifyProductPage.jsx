import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addItem } from "../redux/cart/cartSlice";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import "../layout/pages/SpecifyProductPage.css";
import ProductCard from "../components/ProductCard";

const SpecifyProductPage = () => {
  const products = useSelector((state) => state.product.products);
  const { productName } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [shownProductsCount, setShownProductsCount] = useState(8);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [randomProducts, setRandomProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (productName) {
      const product = products.find(
        (prod) =>
          prod.name.toLowerCase() ===
          decodeURIComponent(productName).toLowerCase()
      );
      setProductDetails(product);
      setSelectedImageIndex(0);
    }
  }, [productName, products]);

  useEffect(() => {
    const getRandomProducts = () => {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setRandomProducts(shuffled); 
    };

    if (products.length > 0) {
      getRandomProducts();
    }
  }, [products]);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (productDetails) {
      const productToAdd = { ...productDetails, quantity };
      dispatch(addItem(productToAdd));
      navigate("/cart");
    }
  };

  const handleBuyNow = () => {
    if (productDetails) {
      const productToBuy = { ...productDetails, quantity };
      console.log(
        `Proceeding to checkout with ${quantity} ${productDetails.name}(s)`
      );
    }
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + productDetails.images.length) %
        productDetails.images.length
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex + 1) % productDetails.images.length
    );
  };

  const handleViewMore = () => {
    setShownProductsCount(shownProductsCount + 8);
  };

  const isViewMoreVisible = shownProductsCount < randomProducts.length;

  if (productName && productDetails) {
    const totalAmount = (productDetails.price * quantity).toFixed(2);

    return (
      <div className="product-detail-page">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={productDetails.images[selectedImageIndex]}
                  alt={productDetails.name}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  onClick={handlePreviousImage}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <IconButton
                  sx={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  onClick={handleNextImage}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
              <div className="product-image-gallery">
                {productDetails.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className={`product-image-thumbnail ${
                      selectedImageIndex === index ? "selected" : ""
                    }`}
                    onClick={() => setSelectedImageIndex(index)} 
                  />
                ))}
              </div>
              <div className="product-description-categories">
                <Typography variant="body1" className="product-description">
                  <strong>Description:</strong> {productDetails.description}
                </Typography>
              </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent className="card-content">
                <div className="product-details-section">
                  <div className="product-details-section-details">
                    <div className="product-name-details">
                      <div className="product-details-container">
                        <Typography variant="h4" className="product-name">
                          {productDetails.name}
                        </Typography>
                        <div className="product-details-section-price-mobile">
                          <Typography variant="h6" className="product-price">
                            <strong>Price</strong>{" "}
                            <strong>${productDetails.price}</strong>
                          </Typography>
                          <div className="quantity-controls">
                            <strong>Quantity</strong>
                            <div className="item-quantity-change">
                              <IconButton
                                onClick={handleDecrease}
                                className="decrease-button"
                              >
                                <RemoveIcon />
                              </IconButton>
                              <span className="quantity-display">
                                {quantity}
                              </span>
                              <IconButton
                                onClick={handleIncrease}
                                className="increase-button"
                              >
                                <AddIcon />
                              </IconButton>
                            </div>
                          </div>
                          <Typography variant="h6" className="total-amount">
                            <strong>Total Amount:</strong> ${totalAmount}
                          </Typography>
                        </div>
                      </div>
                      <div className="cart-actions-mobile">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleAddToCart}
                          className="add-to-cart-button"
                        >
                          Add to Cart
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={handleBuyNow}
                          className="buy-now-button"
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>
                    <Typography variant="body1" className="product-description">
                      <strong>Description:</strong> {productDetails.description}
                    </Typography>
                    <Typography variant="body1" className="product-categories">
                      <strong>Categories:</strong>{" "}
                      {productDetails.categories
                        ? productDetails.categories.join(", ")
                        : "N/A"}
                    </Typography>
                  </div>
                  <div className="product-details-section-price">
                    <Typography variant="h6" className="product-price">
                      <strong>Price</strong>{" "}
                      <strong>${productDetails.price}</strong>
                    </Typography>
                    <div className="quantity-controls">
                      <strong>Quantity</strong>
                      <div className="item-quantity-change">
                        <IconButton
                          onClick={handleDecrease}
                          className="decrease-button"
                        >
                          <RemoveIcon />
                        </IconButton>
                        <span className="quantity-display">{quantity}</span>
                        <IconButton
                          onClick={handleIncrease}
                          className="increase-button"
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                    </div>
                    <Typography variant="h6" className="total-amount">
                      <strong>Total Amount:</strong> ${totalAmount}
                    </Typography>
                  </div>
                </div>
                
                <div className="cart-actions-section">
                  <div className="cart-actions">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddToCart}
                      className="add-to-cart-button"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleBuyNow}
                      className="buy-now-button"
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div className="random-products">
          <div className="random-header">
            <h1>Products For You</h1>
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
      </div>
    );
  }

  return <div>No product found with the given name.</div>;
};

export default SpecifyProductPage;
