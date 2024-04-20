import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import axios from 'axios';

import './header.css'
import Toast from '../Toast/Toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useContext } from "react";

import { useCont } from '../../context/MyContext';
import { useAuth } from "../../context/AuthContext";
import { BiSolidCart, BiLogInCircle, BiSearchAlt }from "react-icons/bi"
import { FiLogOut } from "react-icons/fi"
import { FaUser } from "react-icons/fa"
import { AiTwotoneShopping } from 'react-icons/ai';

function Header() {
    
    const { loggedIn, login, logout } = useAuth();
    const { cart, setCart, setToken, user, setUser, getCart, cartLength  } = useCont();
    const [showToast, setShowToast] = useState(false);
    const [showheader, setShowHeader] = useState("");
    const navigate = useNavigate();
    const jwtToken = Cookies.get("jwtToken");
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState();
    const [searchResults, setSearchResults] = useState([]);
    
    useEffect(() => {
        if (jwtToken) {
            const decodedToken = jwt_decode(jwtToken);
            if (decodedToken.email == "admin@gmail.com") {
                setShowHeader("none");
            }
            setUser(decodedToken);
            login();
            document.getElementById("login-icon").style.display = "none";            
            document.getElementById("user-icon").style.display = "";            
            document.getElementById("cart-icon").style.display = ""            
            document.getElementById("logout-icon").style.display = "";
        } else {
            document.getElementById("login-icon").style.display = "";            
            document.getElementById("user-icon").style.display = "none";            
            document.getElementById("cart-icon").style.display = "";     
            document.getElementById("logout-icon").style.display = "none";
        }
        getCart();
        const productData = localStorage.getItem("fullProducts");
        if (productData) {
            setProducts(JSON.parse(productData));
        }

    }, [loggedIn, cartLength]);

    async function logoutUser() {

        try {
            const response = await axios.post('http://localhost:3000/api/users/logout',
            {username: user.username},
            {
                headers: {
                    'Content-Type': 'application/json', // or 'application/json' if needed
                },
            });
            console.log(user.username," - ", response.data.message);
            Cookies.remove("jwtToken");
            localStorage.removeItem('cartProducts');
            localStorage.removeItem("cart");
            setToken("");
            setUser(null);
            logout();
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000); 
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Error login:', error);
        }

    }

    const handleSearch = async (event) => {
        
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        let results = products.filter(
            (product) =>
                product.title.toLowerCase().includes(term) ||
                product.brand.toLowerCase().includes(term) ||
                product.category.toLowerCase().includes(term)
        );

        if (event.target.value.length === 0) {
            results = [];
        }
    
        setSearchResults(results);

    };
    
    return (
        <header className="header" id="header" style={{display: showheader}}>
                <div id="header-news">
                    <p className="h-news-text">FREE SHIPPING ON ALL ORDERS ABOVE ₹1000</p>
                    <p className="h-news-text">FREE SHIPPING ON ALL ORDERS ABOVE ₹1000</p>
                    <p className="h-news-text">FREE SHIPPING ON ALL ORDERS ABOVE ₹1000</p>
                    <p className="h-news-text">FREE SHIPPING ON ALL ORDERS ABOVE ₹1000</p> 
                </div>
                <nav className="navbar navbar-expand-lg" id="navbar">
                    <NavLink to="/">
                        <div id="h-logo-div">
                            <img id="logo" alt="" src="/src/assets/images/ucos-logo.png" />
                        </div> 
                    </NavLink>
                    <div id="h-nav-div-nav">
                        <ul id="h-nav-ul">
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to='/offers'>offers</NavLink>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./store">Store</NavLink>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./collections" state= {{title:"lips"}}>lips</NavLink>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./collections" state= {{title:"hands & feet"}}>Hands & Feet</NavLink>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./collections" state= {{title:"eyes"}}>eyes</NavLink>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./collections" state= {{title:"skincare"}}>skin care</NavLink>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./collections" state= {{title:"bodycare"}}>body care</NavLink>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./collections" state= {{title:"haircare"}}>hair care</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className='search-form'>
                        <button className='search-btn'>
                            <NavLink to="/Collections" state= {{title:"Search", searchResults}}>
                                <BiSearchAlt className='search-icon' onClick={() => {setSearchResults([])}} />
                            </NavLink>
                        </button>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Type to search..."
                            onChange={handleSearch}
                        />
                        {searchResults.length > 0 && (
                        <div className='result'>
                            {searchResults.map((result) => (
                            <div key={result._id} className='result-list'>
                            <NavLink to="/product" state={{prodId: result._id}} className="nav-link">
                                <div onClick={() => {setSearchResults([])}}> 
                                    {result.title}
                                </div>
                            </NavLink>
                            </div>
                            ))}
                        </div>
                        )}
                    </div>
                    <div id="h-nav-div-profile">
                            <NavLink to="./login">
                                <button className="btn" id="login-icon" >
                                    <BiLogInCircle className='top-icons' alt="Login" title='Login here'/>
                                </button>
                            </NavLink>
                            <NavLink to="./profile">
                                <button className="btn" id="user-icon" >
                                    <FaUser className='top-icons' />
                                    <span>{user?user.username.slice(0,7):""}</span>
                                </button>
                            </NavLink>
                            <NavLink to="./cart">
                                <button className="btn" id="cart-icon" >
                                    <AiTwotoneShopping className='top-icons' style={{fontSize: "30px"}}/>
                                    <label>{cartLength ? cartLength: ""}</label>
                                </button>
                            </NavLink>
                            <button onClick={logoutUser} className="btn" id="logout-icon" title='Logout here'>
                                <FiLogOut className='top-icons' />
                            </button>
                    </div>
                </nav>
                {/* notification toasts */}
                <div className="toast-container position-fixed top-0 start-50 translate-middle-x" style={{zIndex: "10"}}>
                    <Toast show={showToast} type="info" message="User logged out successfully" />
                </div>
        </header>

    );
}

export default Header;