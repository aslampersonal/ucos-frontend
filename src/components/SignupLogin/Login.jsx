import React, { useContext } from "react";
// import { GoogleLogin } from 'react-google-login';
import axios from "axios";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";

import { FaFacebook, FaLinkedin, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useCont } from '../../context/MyContext';
import Toast from "../Toast/Toast";

export default function SignInForm (props) {

    useEffect(() => {
        const jwtToken = Cookies.get('jwtToken');
        if (jwtToken) {
            navigate("/");
          }
    }, []);

    const { cart, setCart, token, setToken, user, setUser, getOrders } = useCont();
    const { login } = useAuth();

    const [formdata, setFormData] = useState({ email: "", password: "" })
    const [showToast, setShowToast] = useState(false);

    const navigate = useNavigate();

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({...formdata, [name] : value})
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', document.getElementById("l-email").value);
        formData.append('password', document.getElementById("l-password").value);

        if(document.getElementById("l-email").value === "admin@gmail.com") {
            try {
                const response = await axios.post('http://localhost:3000/api/admin/login', formData, {
                    headers: {
                      'Content-Type': 'application/json', // or 'application/json' if needed
                    },
                });

                if (response.status >= 200 && response.status < 300 && response.data.cookie) {

                    const jwtToken = response.data.cookie;
                    
                    // Set the token as an HTTP-only cookie
                    Cookies.set('jwtToken', jwtToken, { expires: 5 / 24 , path: '/', secure: false, sameSite: 'strict' });

                    // Store the token in state for application use
                    setToken(jwtToken);
                    
                    const decodedToken = jwt_decode(jwtToken);
                    setUser(decodedToken);
                    
                } else {
                    console.log('Unable to find Cookies');
                }
            
                login();
                if (localStorage.getItem("cart") !== "null") {
                    localStorage.removeItem("cart");
                }
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 2000);
                setTimeout(() => {
                    navigate("/admin");
                }, 2000);

              } catch (error) {
                console.error('Error login to Admin:', error);
                alert("Error Login!!!");
              } 
        } else {
            try {
                const response = await axios.post('http://localhost:3000/api/users/login', formData, {
                    headers: {
                      'Content-Type': 'application/json', // or 'application/json' if needed
                    },
                });

                if (response.status >= 200 && response.status < 300 && response.data.cookie) {

                    const jwtToken = response.data.cookie;
                    
                    // Set the token as an HTTP-only cookie
                    Cookies.set('jwtToken', jwtToken, { expires: 5 / 24 , path: '/', secure: false, sameSite: 'strict' });

                    // Store the token in state for application use
                    setToken(jwtToken);
                    
                    const decodedToken = jwt_decode(jwtToken);
                    setUser(decodedToken);
                    setCart(decodedToken.cart);
                    
                } else {
                  console.log('Unable to find Cookies');
                }
            
                login();
                getOrders();
                if (localStorage.getItem("cart")) {
                    addToCart();
                }
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 2000);
                setTimeout(() => {
                    navigate("/");
                }, 2000);

              } catch (error) {
                console.error('Error login:', error);
                alert(error);
              }
        }

        //add to cart from local storage while a user logged in
        async function addToCart() {

            const jwtToken = Cookies.get("jwtToken");
            const localCart = JSON.parse(localStorage.getItem("cart"));

            for(let i=0; i<localCart.length; i++) {
                try {
                    const response = await axios.post(`http://localhost:3000/api/users/products/cart/${localCart[i]}`,
                    {id: localCart[i]}, 
                    {
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${jwtToken}`,
                        },
                        withCredentials: true 
                    });
                    console.log(response.data.message);
                    
                } catch (error) {
                    console.error('Error adding to cart:', error);
                }
            }

            localStorage.removeItem("cart");
            
        }
    }

    async function auth() {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/google', {
          withCredentials: true,
        });
  
        const { url } = response.data;
  
        window.location.href = url;
      } catch (error) {
        console.error('Google login error:', error);
      }
    }

  return (
    
    <div className="form-container sign-in-container">
      {/* notification toasts */}
      <div className="toast-container position-fixed top-0 start-50 translate-middle-x" style={{zIndex: "10"}}>
        <Toast show={showToast} type="success" message="Logged in successfully" />
      </div>
      <h1 className="ls-h1">Sign in</h1>
      {/* <div className="social-container">
        <button className="social">
          <FaFacebook className="social-i" />
        </button>
        <button className="social" onClick={() => auth()}>
          <FaGoogle className="social-i" />
        </button>
        <button className="social">
          <FaLinkedin className="social-i" />
        </button>
      </div>
      <span className="ls-span">or use your account</span> */}
      <div className="social-container"></div>
      <form onSubmit={handleSubmit} className="ls-form">
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="l-email"
          onChange={handleChange}
          className="ls-input"
        />
        <input
          type="password"
          name="password"
          id="l-password"
          placeholder="Password"
          onChange={handleChange}
          className="ls-input"
        />
        <a href="#" className="ls-a">Forgot your password?</a>
        <button type="submit" className="ls-btn">Sign In</button>
      </form>
    </div>
  );
}

