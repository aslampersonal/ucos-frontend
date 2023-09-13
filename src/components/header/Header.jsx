import React from 'react';
import './header.css'
import { NavLink } from 'react-router-dom';
import { BsPersonCircle } from "react-icons/bs";
import { BiSolidCart }from "react-icons/bi"

function Header() {

    return (
        <header className="header" id="header">
            <div id="header-top">
                <div id="header-news">
                    <p className="h-news-text">FREE SHIPPING ON ALL ORDERS ABOVE ₹1000</p>
                    <p className="h-news-text">FREE SHIPPING ON ALL ORDERS ABOVE ₹1000</p>
                    <p className="h-news-text">FREE SHIPPING ON ALL ORDERS ABOVE ₹1000</p>
                    <p className="h-news-text">FREE SHIPPING ON ALL ORDERS ABOVE ₹1000</p> 
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
                    <div id="h-logo-div">
                        <img id="logo" alt="" src="/src/assets/images/ucos-logo.png" />
                    </div> 
                    <div id="h-nav-div-search">
                        <input
                        type="search"
                        id="h-search"
                        defaultValue=""
                        placeholder="Search..."
                        aria-required="false"
                        maxLength={100}
                        autoComplete="off"
                        aria-label="Search..."
                        />
                    </div>
                    <div id="h-nav-div-nav">
                        <ul id="h-nav-ul">
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to='/'>Home</NavLink>
                            </li>
                            <li className="drop-li">
                                <NavLink className="drop-link" to="./store">Store<i className="fa fa-caret-down"></i></NavLink>
                                <div className="dropdown-content bg-light" aria-labelledby="navbarDropdown">
                                    <NavLink className="dropdown-item" to="./skin-care-products">Skin Care</NavLink>
                                    <NavLink className="dropdown-item" to="./cosmetic-products">Cosmetics</NavLink>
                                </div>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./about-us">About Us</NavLink>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./contact-us">Contact Us</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div id="h-nav-div-profile">
                            <a id="login-icon" className="btn" href="./profile">
                                <BsPersonCircle className='top-icons' />
                            </a>
                            <a className="btn" id="cart-icon" href="./cart">
                                <BiSolidCart className='top-icons' />
                            </a>
                    </div>
                </nav>
            </div>
        </header>

    );
}

export default Header;