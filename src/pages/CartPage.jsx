import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/cart/cartSlice";
import { IconButton, Checkbox, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../layout/pages/CartPage.css";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState(
    cart.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {})
  );

  const [promoCode, setPromoCode] = useState("");

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeItem({ id }));
    setSelectedItems((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      if (selectedItems[item.id]) {
        return sum + item.price * item.quantity;
      }
      return sum;
    }, 0);
  };

  const calculateTotalQuantity = () => {
    return cart.reduce((sum, item) => {
      if (selectedItems[item.id]) {
        return sum + item.quantity;
      }
      return sum;
    }, 0);
  };

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const handleBuyNow = () => {
    alert("Proceeding to checkout...");
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>
      {cart.length > 0 ? (
        <div className="cart-product-page">
          <div className="cart-product">
            {cart.map((item) => (
              <div
                key={item.id}
                className={`cart-item ${
                  selectedItems[item.id] ? "selected-item" : ""
                }`}
              >
                <Checkbox
                  checked={selectedItems[item.id] || false}
                  onChange={() => handleCheckboxChange(item.id)}
                  color="primary"
                />
                <div className="cart-item-content">
                  <div className="cart-item-container">
                    <div className="cart-image-name">
                      <img
                        src={item.images}
                        alt={item.name}
                        className="cart-image"
                      />
                      <div className="item-details">
                        <h2 className="item-name">{item.name}</h2>
                        <p className="item-price">Price: ${item.price}</p>
                      </div>
                    </div>
                    <div className="cart-details">
                      <div className="item-quantity">
                        Quantity
                        <div className="item-quantity-change">
                          <IconButton
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            size="small"
                            color="primary"
                          >
                            <RemoveIcon />
                          </IconButton>
                          <span className="quantity-display">
                            {item.quantity}
                          </span>
                          <IconButton
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            size="small"
                            color="primary"
                          >
                            <AddIcon />
                          </IconButton>
                        </div>
                      </div>

                      <p className="item-total">
                        Total: ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="item-remove">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="remove-button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-area">
            <div className="selected-quantity">
              <p>Total Selected Quantity</p>
              <p>{calculateTotalQuantity()}</p>
            </div>
            <div className="cart-total">
              <p>Total (Selected)</p>
              <p>${calculateTotal()}</p>
            </div>
            <div className="promo-code">
              <label htmlFor="promo-code" className="promo-code-label">
                Enter Promo Code:
              </label>
              <TextField
                id="promo-code"
                variant="outlined"
                size="small"
                placeholder="Enter Promo Code"
                value={promoCode}
                onChange={handlePromoCodeChange}
                fullWidth
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBuyNow}
              fullWidth
              className="buy-now-button"
            >
              Buy Now
            </Button>
          </div>
        </div>
      ) : (
        <p className="empty-cart">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
