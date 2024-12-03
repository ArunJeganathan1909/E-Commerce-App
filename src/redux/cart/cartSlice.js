import { createSlice } from "@reduxjs/toolkit";
import AirPodMax1 from "../../assets/img/AirPodMax1.jpeg";
import TWSM19_1 from "../../assets/img/TWSM19_1.png";
import TWSM19_2 from "../../assets/img/TWSM19_2.jpg";

const initialState = {
  items: [
    {
      id: 1,
      name: "AirPods Max",
      price: 549,
      description: "Over-ear headphones with high-fidelity sound.",
      quantity: 1,
      images: AirPodMax1, 
    },
    {
      id: 2,
      name: "TWS M19 Earbuds",
      price: 29,
      description: "Wireless earbuds with crystal clear sound.",
      quantity: 2,
      images: TWSM19_1, 
    },
    {
      id: 3,
      name: "Portable Bluetooth Speaker",
      price: 99,
      description: "Compact speaker with powerful bass.",
      quantity: 1,
      images: TWSM19_2, 
    },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload.id);
    },

    updateQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
