import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "../layout/components/ProductCard.css";

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    console.log(`Adding product ${product.name} to cart`);
    // Implement your add-to-cart logic here
  };

  return (
    <div className="product-card" style={{ position: "relative" }}>
      <div className="product-img-area">
        <AddShoppingCartIcon onClick={handleAddToCart} />

        <img src={product.images[0]} alt={product.name} />
      </div>
      <div className="product-details-area">
        <h2>{product.name}</h2>
        <p>Price: ${product.price}</p>
      </div>
      <div className="product-view-more">View more</div>
    </div>
  );
};

export default ProductCard;
