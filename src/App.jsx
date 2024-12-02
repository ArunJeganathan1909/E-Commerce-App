import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./AuthContext";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProductPage from "./pages/ProductPage";
import Header from "./components/header";
import CartPage from "./pages/CartPage";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
