import React from "react";
import { useSelector } from "react-redux";

const ProductPage = () => {
  // Access products from Redux store
  const products = useSelector((state) => state.product.products);

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
