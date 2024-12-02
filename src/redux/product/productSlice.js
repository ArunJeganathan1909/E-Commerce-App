import { createSlice } from "@reduxjs/toolkit";
import AirPodMax1 from "../../assets/img/AirPodMax1.jpeg";
import AirPodMax2 from "../../assets/img/AirPodMax2.jpg";
import AirPodMax3 from "../../assets/img/AirPodMax3.jpg";
import TWSM19_1 from "../../assets/img/TWSM19_1.png";
import TWSM19_2 from "../../assets/img/TWSM19_2.jpg";
import TWSM19_3 from "../../assets/img/TWSM19_3.jpeg";

const initialState = {
  products: [
    {
      id: 1,
      name: "Product 1",
      price: 10,
      description: "A great product",
      images: [AirPodMax1, AirPodMax2, AirPodMax3],
      categories: ["Headphones", "Audio"], // Added categories
    },
    {
      id: 2,
      name: "Product 2",
      price: 20,
      description: "Another great product",
      images: [TWSM19_1, TWSM19_2, TWSM19_3],
      categories: ["Speakers", "Audio"], // Added categories
    },
    {
      id: 3,
      name: "Product 3",
      price: 15,
      description: "Best in class speakers",
      images: [TWSM19_1, TWSM19_2],
      categories: ["Speakers", "Home Audio"], // Added categories
    },
    {
      id: 4,
      name: "Product 4",
      price: 25,
      description: "Noise-cancelling headphones",
      images: [AirPodMax1, AirPodMax2],
      categories: ["Headphones", "Noise Cancelling", "Audio"], // Added categories
    },
    {
      id: 5,
      name: "Product 5",
      price: 30,
      description: "Portable speaker with excellent bass",
      images: [TWSM19_1],
      categories: ["Speakers", "Portable", "Outdoor"], // Added categories
    },
    {
      id: 6,
      name: "Product 2",
      price: 20,
      description: "Another great product",
      images: [TWSM19_1, TWSM19_2, TWSM19_3], // Multiple images
    },
    {
      id: 7,
      name: "Product 1",
      price: 10,
      description: "A great product",
      images: [AirPodMax1, AirPodMax2, AirPodMax3],
    },
    {
      id: 8,
      name: "Product 2",
      price: 20,
      description: "Another great product",
      images: [TWSM19_1, TWSM19_2, TWSM19_3], // Multiple images
    },
    {
      id: 9,
      name: "Product 1",
      price: 10,
      description: "A great product",
      images: [AirPodMax1, AirPodMax2, AirPodMax3],
    },
    {
      id: 10,
      name: "Product 2",
      price: 20,
      description: "Another great product",
      images: [TWSM19_1, TWSM19_2, TWSM19_3], // Multiple images
    },
    {
      id: 11,
      name: "Product 1",
      price: 10,
      description: "A great product",
      images: [AirPodMax1, AirPodMax2, AirPodMax3],
    },
    {
      id: 12,
      name: "Product 2",
      price: 20,
      description: "Another great product",
      images: [TWSM19_1, TWSM19_2, TWSM19_3], // Multiple images
    },
    {
      id: 13,
      name: "Product 1",
      price: 10,
      description: "A great product",
      images: [AirPodMax1, AirPodMax2, AirPodMax3],
    },
    {
      id: 14,
      name: "Product 2",
      price: 20,
      description: "Another great product",
      images: [TWSM19_1, TWSM19_2, TWSM19_3], // Multiple images
    },
    {
      id: 15,
      name: "Product 1",
      price: 10,
      description: "A great product",
      images: [AirPodMax1, AirPodMax2, AirPodMax3],
    },
    {
      id: 16,
      name: "Product 2",
      price: 20,
      description: "Another great product",
      images: [TWSM19_1, TWSM19_2, TWSM19_3], // Multiple images
    },
    {
      id: 17,
      name: "Product 1",
      price: 10,
      description: "A great product",
      images: [AirPodMax1, AirPodMax2, AirPodMax3],
    },
    {
      id: 18,
      name: "Product 2",
      price: 20,
      description: "Another great product",
      images: [TWSM19_1, TWSM19_2, TWSM19_3], // Multiple images
    },
    {
      id: 19,
      name: "Product 1",
      price: 10,
      description: "A great product",
      images: [AirPodMax1, AirPodMax2, AirPodMax3],
    },
    {
      id: 20,
      name: "Product 2",
      price: 20,
      description: "Another great product",
      images: [TWSM19_1, TWSM19_2, TWSM19_3], // Multiple images
    },
    {
      id: 21,
      name: "Product 1",
      price: 10,
      description: "A great product",
      images: [AirPodMax1, AirPodMax2, AirPodMax3],
    },
    {
      id: 22,
      name: "Product 2",
      price: 20,
      description: "Another great product",
      images: [TWSM19_1, TWSM19_2, TWSM19_3], // Multiple images
    },
    {
      id: 23,
      name: "Product 1",
      price: 10,
      description: "A great product",
      images: [AirPodMax1, AirPodMax2, AirPodMax3],
    },
    {
      id: 24,
      name: "Product 2",
      price: 20,
      description: "Another great product",
      images: [TWSM19_1, TWSM19_2, TWSM19_3], // Multiple images
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
