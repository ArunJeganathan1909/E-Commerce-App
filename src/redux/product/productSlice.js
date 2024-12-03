import { createSlice } from "@reduxjs/toolkit";
import AirPodMax1 from "../../assets/img/AirPodMax1.jpeg";
import AirPodMax2 from "../../assets/img/AirPodMax2.jpg";
import AirPodMax3 from "../../assets/img/AirPodMax3.jpg";
import TWSM19_1 from "../../assets/img/TWSM19_1.png";
import TWSM19_2 from "../../assets/img/TWSM19_2.jpg";
import TWSM19_3 from "../../assets/img/TWSM19_3.jpeg";
import AbansTV_1 from "../../assets/img/Abans TV 1.jpeg";
import AbansTV_2 from "../../assets/img/Abans TV 2.jpg";
import BSpeaker1 from "../../assets/img/Bluthooth speaker 1.jpeg";
import BSpeaker2 from "../../assets/img/Bluthooth speaker 2.jpg";
import HomeTheater1 from "../../assets/img/Home theator 1.jpeg";
import HomeTheater2 from "../../assets/img/Home theator 2.jpeg";
import Radio1 from "../../assets/img/Radio 1.jpeg";
import Radio2 from "../../assets/img/Radio 2.jpeg";
import Speaker1 from "../../assets/img/Speaker.jpeg";
import Speaker2 from "../../assets/img/Speaker1.jpeg";

const generateProducts = () => {
  const products = [];
  const baseNames = [
    "AirPod Max",
    "TWS",
    "Mi Buds",
    "Abans TV",
    "Bluetooth Speaker",
    "Home Theater",
    "Radio",
    "Speaker",
  ];
  const baseImages = [
    [AirPodMax1, AirPodMax2, AirPodMax3],
    [TWSM19_1, TWSM19_2, TWSM19_3],
    [TWSM19_1, TWSM19_2],
    [AbansTV_1, AbansTV_2],
    [BSpeaker1, BSpeaker2],
    [HomeTheater1, HomeTheater2],
    [Radio1, Radio2],
    [Speaker1, Speaker2],
  ];
  const baseCategories = [
    ["Headphones", "Audio"],
    ["Speakers", "Audio"],
    ["Speakers", "Home Audio"],
    ["Television", "Entertainment"],
    ["Portable Audio", "Outdoor"],
    ["Home Audio", "Cinema"],
    ["Vintage", "Audio"],
    ["Audio Equipment", "Home Audio"],
  ];

  for (let i = 0; i < 30; i++) {
    const baseIndex = i % baseNames.length;
    products.push({
      id: i + 1,
      name: `${baseNames[baseIndex]} ${i + 1}`,
      price: 10 + (i % 5) * 5,
      description: `This is a great product - ${baseNames[baseIndex]} ${i + 1}`,
      images: baseImages[baseIndex],
      categories: baseCategories[baseIndex],
    });
  }
  return products;
};

const initialState = {
  products: generateProducts(),
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

export default productSlice.reducer;
