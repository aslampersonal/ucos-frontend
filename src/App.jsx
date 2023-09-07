import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import ProductPage from './pages/Product';
import StorePage from "./pages/Store";

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

      </Routes>
      <Footer /> 
    </BrowserRouter>
  );
}

export default App;