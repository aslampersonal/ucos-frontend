import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import Cookies from 'js-cookie';

import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { AiOutlineSafety } from "react-icons/ai";
import { GiReturnArrow } from "react-icons/gi";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoWalletOutline } from "react-icons/io5";

import { useCont } from "../../context/MyContext";

import "./productmain.css";
import Error from "../error/Error";

export default function ProductMain (props) {
    
    const { cart, setCart, user, getCart } = useCont();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [prodId, setProdId] = useState(location.state?.prodId);
    const [selectedVariant, setSelectedVariant] = useState('400ml ₹240');

    useEffect(() => {
        const newProdId = location.state?.prodId;
        if (newProdId && newProdId !== prodId) {
            setProdId(newProdId);
        }
        
        if (!prodId) {
            navigate("/error");
            return;
        }
        const productData = localStorage.getItem("fullProducts");
        if (productData) {
            setProducts(JSON.parse(productData));
        }

        // imageScroller();

    }, [prodId, location.state?.prodId]);

    let productList = products[0];
    if (prodId) {
        productList = products.filter((prod) => prod._id == prodId);
    }

    const handleVariantSelect = (variant) => {
        setSelectedVariant(variant);
    };

    async function addToCart(id) {

        const jwtToken = Cookies.get("jwtToken");
        const quantity = document.getElementById("quantity").value;
        if (jwtToken) {
            for(let i=1; i<=quantity; i++) {
                try {
                    const response = await axios.post(`http://localhost:3000/api/users/products/cart/${productList[0]._id}`,
                    {id: productList[0]._id},
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
        } else {
            for(let i=1; i<=quantity; i++) {
                const cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
                localStorage.setItem("cart", JSON.stringify([...cart, id]));
            }
        }
        getCart();
        
    }

    function imageScroller() {
        const carousel = document.getElementById("prod-scroll-carousel");
        const firstImg = carousel.querySelector(".prod-scroll-img");
        const arrowIconBack = document.getElementById("scroll-back");
        const arrowIconNext = document.getElementById("scroll-next");

        let isDragStart = false, prevPageX, prevScrollLeft;

        const showHideIcons = () => {
            //showing and hiding prev/next icons according to carousel scroll left value
            let ScrollWidth = carousel.ScrollWidth - carousel.clientWidth; //getting max scrollable width
            arrowIconBack.style.display = carousel.scrollLeft == 0 ? "none" : "block";
            arrowIconNext.style.display = carousel.scrollLeft == ScrollWidth ? "none" : "block";
        }

        arrowIconBack.addEventListener("click", () => {
            let firstImgWidth = firstImg.clientWidth + 10; //getting first image width & adding 10 margin value
            carousel.scrollLeft += -firstImgWidth;
            setTimeout(() => showHideIcons(), 60); //calling showHideIcons after 60ms
        })

        arrowIconNext.addEventListener("click", () => {
            let firstImgWidth = firstImg.clientWidth + 10; //getting first image width & adding 10 margin value
            carousel.scrollLeft += firstImgWidth;
            setTimeout(() => showHideIcons(), 60); //calling showHideIcons after 60ms
        })

        const dragStart = (e) => {
            // updating global variables value on mouse down event
            isDragStart = true;
            prevPageX = e.pageX;
            prevScrollLeft = carousel.scrollLeft;
        }

        const dragging = (e) => {
            //scrolling images/carousel to left according to mouse pointer
            if(!isDragStart) return;
            e.preventDefault();
            carousel.classList.add("dragging");
            let positionDiff = e.pageX - prevPageX;
            carousel.scrollLeft = prevScrollLeft - positionDiff;
            showHideIcons();
        }

        const dragStop = () => {
            isDragStart = false;
            carousel.classList.remove("dragging");
        }

        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("mousemove", dragging);
        carousel.addEventListener("mouseup", dragStop);
        carousel.addEventListener("mouseleave", dragStop);
    }

    if (!(productList ? productList[0] : "sample")) {
        return (
            <Error />
        );
    }    
    
    return (
        <>
            <section className="section-pagetop bg" id="first-sec">
                <div className="container" id="head-sec-div">
                    <nav>
                        <ol className="breadcrumb text-white">
                            <li className="breadcrumb-item"><NavLink to="/" className="link-dark link-underline-opacity-0">Home</NavLink></li>
                            <li className="breadcrumb-item"><NavLink to="/store" className="link-dark link-underline-opacity-0">Store</NavLink></li>
                            <li className="breadcrumb-item active" aria-current="page" id="category-link-nav">{productList ? productList[0].category : "sample"}</li>
                        </ol>  
                    </nav>
                </div> 
            </section>

            <section id="product-section">
                <div className="container" id="prod-sec-div">
                    <div id="prod-img-div">
                        <div id="prod-img-main">
                            <img id="prod-img" src={productList ? productList[0].image : "sample"} alt="" />
                        </div>
                        {/* <div id="prod-scroll-div">
                            <div id="scroll-back" className="scroll-icon">
                                <MdKeyboardArrowLeft />
                            </div>
                            <div id="prod-scroll-carousel">
                                <img
                                    className="prod-scroll-img"
                                    src="/src/assets/images/product-images/under_eye_cream_1.jpg"
                                    alt=""
                                />
                                <img
                                    className="prod-scroll-img"
                                    src="/src/assets/images/product-images/under_eye_cream_2.jpg"
                                    alt=""
                                />
                            </div>
                            <div id="scroll-next" className="scroll-icon">
                                <svg
                                    width={10}
                                    height={16}
                                    viewBox="0 0 10 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.808088 15.1407C1.33618 15.6537 2.19868 15.6597 2.73452 15.1541L9.24109 9.01426C9.50086 8.76913 9.64712 8.4345 9.64712 8.08528C9.64712 7.73607 9.50086 7.40143 9.24109 7.15631L2.55378 0.845926C2.01794 0.340284 1.15545 0.346298 0.62735 0.859358C0.099255 1.37242 0.105536 2.19824 0.64138 2.70388L6.34422 8.08528L0.822118 13.2961C0.286274 13.8018 0.279993 14.6276 0.808088 15.1407Z"
                                    fill="black"
                                    />
                                </svg>
                            </div>
                        </div> */}
                    </div>
                    <div id="prod-det-div">
                        <form action="" id="product-form">
                            <div id="product-form-div">
                                <h1 id="pd-title">{productList ? productList[0].title : "sample"}</h1>
                                <h5 id="pd-brand">{productList ? productList[0].brand : "sample"}</h5>
                                <p id="pd-desc">{productList ? productList[0].description : "sample"}</p>
                                <div id="price-qnt-div">
                                    <div id="price-div">
                                        <span id="pd-price" style={{ fontSize: 30, fontWeight: 600 }}>
                                            ₹{productList ? productList[0].price : "sample"}
                                        </span>
                                        <span id="pd-price" style={{ fontSize: 18, fontWeight: 400, color: "#9d9d9d", textDecoration: "line-through", marginLeft: "10px" }}>
                                            ₹{productList ? (productList[0].price+250) : "sample"}
                                        </span>
                                        <span id="pd-price" style={{ fontSize: 15, fontWeight: 400, color: "#298b39", marginLeft: "10px" }}>
                                            Save ₹{(productList[0].price+250)-productList[0].price} ({Math.floor(100 - ((productList[0].price/(productList[0].price+250))*100))}% off)
                                        </span>
                                    </div>
                                    <div id="qnt-div">
                                        <span style={{ fontSize: 16, fontWeight: 600 }}>Quantity</span>
                                        <input type="number" id="quantity" defaultValue="1" min="1" max={productList ? productList[0].countInStock : "sample"} />
                                    </div>
                                    {/* <div id="qnt-div">
                                        <span style={{ fontSize: 16, fontWeight: 600 }}>Total Price</span>
                                        <span style={{ fontSize: 30, fontWeight: 700 }}>₹{productList ? productList[0].price : "sample"}</span>
                                    </div> */}
                                </div>
                                {/* <div id="variant-div">
                                    <span style={{ fontSize: 16, fontWeight: 600, marginBottom: "10px" }}>Variants</span>
                                    <ul id="variant-ul">
                                    <li
                                        className={`variant-li ${selectedVariant === '400ml ₹240' ? 'selected' : ''}`}
                                        onClick={() => handleVariantSelect('400ml ₹240')}
                                    >
                                        400ml ₹240
                                    </li>
                                    <li
                                        className={`variant-li ${selectedVariant === '200ml ₹190' ? 'selected' : ''}`}
                                        onClick={() => handleVariantSelect('200ml ₹190')}
                                    >
                                        200ml ₹190
                                    </li>
                                    </ul>
                                </div> */}
                                <button onClick={() => {addToCart(productList ? productList[0]._id : "sample")}} type="button" className="btn" id="cart-btn">
                                    ADD TO CART
                                </button>
                            </div>
                        </form>
                        <div id="pros-div">
                            <div className="pros-cat">
                                <div className="pros-icons"><AiOutlineSafety className="pros-icons-i"/></div>
                                <p className="pros-p">100% Genuine<br/>Products</p>
                            </div>
                            <div className="pros-cat">
                                <div className="pros-icons"><GiReturnArrow className="pros-icons-i"/></div>
                                <p className="pros-p">Return in 15<br/>Days</p>
                            </div>
                            <div className="pros-cat">
                                <div className="pros-icons"><CiDeliveryTruck className="pros-icons-i"/></div>
                                <p className="pros-p">Free Delivery<br/>above ₹999</p>
                            </div>
                            <div className="pros-cat">
                                <div className="pros-icons"><IoWalletOutline className="pros-icons-i"/></div>
                                <p className="pros-p">Free COD<br/>above ₹999</p>
                            </div>
                        </div>
                        <div id="p-features-div">
                            <div className="p-features">
                                <VscDebugBreakpointLog className="features-icons"/>
                                <p className="p-features-p">Brightens</p>
                            </div>
                            <div className="p-features">
                                <VscDebugBreakpointLog className="features-icons"/>
                                <p className="p-features-p">Fights dark circles</p>
                            </div>
                            <div className="p-features">
                                <VscDebugBreakpointLog className="features-icons"/>
                                <p className="p-features-p">Depuffs</p>
                            </div>
                            <div className="p-features">
                                <VscDebugBreakpointLog className="features-icons"/>
                                <p className="p-features-p">Long Lasting</p>
                            </div>
                        </div>
                    </div>
                </div>
                </section>
        </>
    );
}
