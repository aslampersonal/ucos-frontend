import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import ProductPage from './pages/Product';
import StorePage from "./pages/Store";
import CosmeticPage from "./pages/Cosmetics";
import SkinCarePage from "./pages/Skincare";
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"

import ProductAddingPage from "./pages/Admin/ProductAddingPage";

function App() {

  
  
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        <Route path="/" element={<Home />} /> 
        <Route path="/product" element={<ProductPage />} /> 
        <Route path="/store" element={<StorePage />} /> 
        <Route path="/about-us" element={<ProductPage />} /> 
        <Route path="/contact-us" element={<ProductPage />} /> 
        <Route path="/cosmetic-products" element={<CosmeticPage />} /> 
        <Route path="/skin-care-products" element={<SkinCarePage />} /> 

        <Route path="/signup" element={<SignupPage />} /> 
        <Route path="/login" element={<LoginPage />} /> 

        <Route path="/admin/products-adding" element={<ProductAddingPage />} />

      </Routes>
      <Footer /> 
    </BrowserRouter>
  );
}

export default App;