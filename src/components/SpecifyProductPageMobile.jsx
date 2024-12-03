import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
  Snackbar,
  Alert,
} from "@mui/material";
import "../layout/pages/SpecifyProductPage.css";

const SpecifyProductPageMobile = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const handleAddToCart = () => {
    const productToAdd = { ...product, quantity };
    dispatch(addItem(productToAdd));
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (product) {
    const totalAmount = (product.price * quantity).toFixed(2);

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
                  image={product.images[selectedImageIndex]}
                  alt={product.name}
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
                {product.images.map((image, index) => (
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
                  <strong>Description:</strong> {product.description}
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
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h4" className="product-name">
                            {product.name}
                          </Typography>
                          <div className="cart-actions-mobile">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleAddToCart}
                              className="add-to-cart-button"
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                        <div className="product-details-section-price-modal">
                          <Typography variant="h6" className="product-price">
                            <strong>Price</strong>{" "}
                            <strong>${product.price}</strong>
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
                    </div>
                    <Typography variant="body1" className="product-description">
                      <strong>Description:</strong> {product.description}
                    </Typography>
                    <Typography variant="body1" className="product-categories">
                      <strong>Categories:</strong>{" "}
                      {product.categories
                        ? product.categories.join(", ")
                        : "N/A"}
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
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Product added to cart!
          </Alert>
        </Snackbar>
      </div>
    );
  }

  return <div>No product found.</div>;
};

export default SpecifyProductPageMobile;
