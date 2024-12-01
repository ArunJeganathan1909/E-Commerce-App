import userReducer from "./user/userSlice";
import productReducer  from "./product/productSlice";
import cartReducer from "./cart/cartSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;
