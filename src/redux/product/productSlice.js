import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      name: "Product 1",
      price: 10,
      description: "A great product",
      image: "image1.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 20,
      description: "Another great product",
      image: "image2.jpg",
    },
    // Add more products
  ],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

export default productSlice.reducer;
