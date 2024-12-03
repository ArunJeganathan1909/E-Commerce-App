import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Modal from "@mui/material/Modal";
import SpecifyProductPageMobile from "../components/SpecifyProductPageMobile";
import "../layout/components/ProductCard.css";

const ProductCard = ({ product }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate()

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleViewMore = () => {
    navigate(`/product/${encodeURIComponent(product.name)}`);
  };

  return (
    <div className="product-card" style={{ position: "relative" }}>
      <div className="product-img-area">
        <AddShoppingCartIcon
          onClick={handleOpenModal}
          style={{ cursor: "pointer" }}
        />
        <img src={product.images[0]} alt={product.name} />
      </div>
      <div className="product-details-area">
        <h2>{product.name}</h2>
        <p>Price: ${product.price}</p>
      </div>
      <div className="product-view-more" onClick={handleViewMore}>
        View more
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="modal-content-wrapper">
          <SpecifyProductPageMobile product={product} />
        </div>
      </Modal>
    </div>
  );
};

export default ProductCard;
