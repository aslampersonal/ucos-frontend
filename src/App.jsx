import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import ProductPage from './pages/Product';
import StorePage from "./pages/Store";
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/SignupLoginPage"
import CollectionPage from "./pages/CollectionPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/Order";
import ProfilePage from "./pages/ProfilePage"
import NotFoundPage from "./pages/404Page";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProductAddingPage from "./pages/Admin/ProductAddingPage";

import { ContProvider, useCont } from "./context/MyContext";
import { AuthProvider } from "./context/AuthContext";
import Sidebar from "./components/Admin/Sidebar/Sidebar";
import DataPage from "./pages/Admin/DataPage";

function NotFound() {
  return (
    <main>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </main>
  );
}

function App() {

  // Determine if the current route is an admin route
  const isAdminRoute = window.location.pathname.startsWith("/admin");

  return (
    <ContProvider>
      <AuthProvider>
        <BrowserRouter>
          {isAdminRoute ? <Sidebar /> : <Header />}
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/product" element={<ProductPage />} /> 
            <Route path="/store" element={<StorePage />} /> 
            <Route path="/collections" element={<CollectionPage />} /> 
            {/* <Route path="/about-us" element={<ProductPage />} />  */}
            {/* <Route path="/contact-us" element={<ProductPage />} />  */}
            <Route path="/cart" element={<CartPage />} /> 
            <Route path="/orders" element={<OrderPage />} /> 
            <Route path="/profile" element={<ProfilePage />} /> 

            <Route path="/signup" element={<SignupPage />} /> 
            <Route path="/login" element={<LoginPage />} />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products-adding" element={<ProductAddingPage />} />
            <Route path="/admin/users" element={<DataPage />} />
            <Route path="/admin/products" element={<DataPage />} />
            <Route path="/admin/orders" element={<DataPage />} />
            {/* Add a wildcard route for Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          {isAdminRoute ? <></> : <Footer />} 
        </BrowserRouter>
      </AuthProvider>
    </ContProvider>
  );
}

export default App;