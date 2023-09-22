import React, { useEffect } from "react";
import axios from "axios";
import { MdKeyboardArrowLeft } from "react-icons/md"

import "./ProductMain.css";

function ProductMain (props) {
    
    useEffect(() => {

        imageScroller();
        showData();
    
    });

    async function getData() {
        var data = await axios.get('http://localhost:3000/get-product')
        return data.data;
    }

    async function showData() {
        const Data = await getData();
        let mainimage = document.getElementById("prod-img"); 
        let imgscrolldiv = document.getElementById("prod-scroll-carousel");
        let title = document.getElementById("pd-title");
        let description = document.getElementById("pd-desc");
        let price = document.getElementById("pd-price");

        for(let i=0; i<Data.length; i++) {
            // for(let j=0; j<Data[i].Images.length; j++) {
            //     const pdimg = document.createElement("img");
            //     const imgurl = "../images/product-images/" + Data[i].Images[j];
            //     pdimg.setAttribute("class","prod-scroll-img");
            //     pdimg.setAttribute("src",imgurl);
            //     imgscrolldiv.appendChild(pdimg);
            // }

            // const mainImgurl = "../images/product-images/" + Data[0].Images[0];
            // mainimage.setAttribute("src",mainImgurl);

            title.innerText = Data[i].name;
            description.innerText = Data[i].description;
            price.innerText = Data[i].price;

        }
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
    
    
    return (
        <>
            <section id="product-section">
                {/* <div id="path-div">
                        <span id="path-span">Home  FACE CARE PRODUCTS FOR MEN  Under Eye Cream | Quinoa & Collagen (15gm)</span>
                    </div> */}
                <div className="container" id="prod-sec-div">
                    <div id="prod-img-div">
                    <div id="prod-img-main">
                        <img id="prod-img" src="/src/assets/images/eyeshadow-girl1.jpg" alt="" />
                    </div>
                    <div id="prod-scroll-div">
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
                    </div>
                    </div>
                    <div id="prod-det-div">
                    <form action="" id="product-form">
                        <div id="product-form-div">
                        <h1 id="pd-title" />
                        <p id="pd-desc" />
                        {/* <div id="prod-size-div">
                                        <p style="font-size: 16px; font-weight: 600;">Options:</p>
                                        <div id="pd-options">
                                            <span>Eye Cream and Free Face Serum ₹249<input type="radio" name="size" value="Eye Cream and Free Face Serum ₹249" checked></span>
                                            <span>15gm Under Eye Cream at ₹209<input type="radio" name="size" value="15gm Under Eye Cream at ₹209"></span>
                                        </div>
                                    </div> */}
                        <div id="price-qnt-div">
                            <div id="price-div">
                            <span style={{ fontSize: 16, fontWeight: 600 }}>MRP</span>
                            <span id="pd-price" style={{ fontSize: 30, fontWeight: 700 }}>
                                ₹249
                            </span>
                            <span style={{ fontSize: 9, fontWeight: 400 }}>
                                inclusive of all taxes
                            </span>
                            </div>
                            <div id="qnt-div">
                            <span style={{ fontSize: 16, fontWeight: 600 }}>Quantity</span>
                            <div className="dropdown show">
                                <button
                                className="btn dropdown-toggle"
                                href="#"
                                role="button"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                >
                                1
                                </button>
                                <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink"
                                >
                                <a className="dropdown-item" href="#">
                                    2
                                </a>
                                <a className="dropdown-item" href="#">
                                    3
                                </a>
                                <a className="dropdown-item" href="#">
                                    4
                                </a>
                                <a className="dropdown-item" href="#">
                                    5
                                </a>
                                <a className="dropdown-item" href="#">
                                    6
                                </a>
                                <a className="dropdown-item" href="#">
                                    7
                                </a>
                                <a className="dropdown-item" href="#">
                                    8
                                </a>
                                <a className="dropdown-item" href="#">
                                    9
                                </a>
                                <a className="dropdown-item" href="#">
                                    10
                                </a>
                                </div>
                            </div>
                            </div>
                        </div>
                        <button type="button" className="btn" id="cart-btn">
                            ADD TO CART
                        </button>
                        </div>
                    </form>
                    <div id="p-features-div">
                        <div className="p-features">
                        <svg
                            width={20}
                            height={19}
                            viewBox="0 0 20 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="9.5" cy="9.5" r="9.5" fill="#FFDFDF" />
                            <path
                            d="M2.20801 7.85277L3.54365 6.56097L7.74762 9.41986C7.74762 9.41986 12.5647 3.25737 17.4693 0.271434C18.3454 0.183654 18.805 0.27144 19.7246 0.271434C15.433 3.6809 8.8862 13.6341 7.76952 15.6882C5.95217 12.7658 2.20801 7.85277 2.20801 7.85277Z"
                            fill="#C22323"
                            />
                        </svg>
                        <p className="p-features-p">Brightens</p>
                        </div>
                        <div className="p-features">
                        <svg
                            width={20}
                            height={19}
                            viewBox="0 0 20 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="9.5" cy="9.5" r="9.5" fill="#FFDFDF" />
                            <path
                            d="M2.20801 7.85277L3.54365 6.56097L7.74762 9.41986C7.74762 9.41986 12.5647 3.25737 17.4693 0.271434C18.3454 0.183654 18.805 0.27144 19.7246 0.271434C15.433 3.6809 8.8862 13.6341 7.76952 15.6882C5.95217 12.7658 2.20801 7.85277 2.20801 7.85277Z"
                            fill="#C22323"
                            />
                        </svg>
                        <p className="p-features-p">Fights dark circles</p>
                        </div>
                        <div className="p-features">
                        <svg
                            width={20}
                            height={19}
                            viewBox="0 0 20 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="9.5" cy="9.5" r="9.5" fill="#FFDFDF" />
                            <path
                            d="M2.20801 7.85277L3.54365 6.56097L7.74762 9.41986C7.74762 9.41986 12.5647 3.25737 17.4693 0.271434C18.3454 0.183654 18.805 0.27144 19.7246 0.271434C15.433 3.6809 8.8862 13.6341 7.76952 15.6882C5.95217 12.7658 2.20801 7.85277 2.20801 7.85277Z"
                            fill="#C22323"
                            />
                        </svg>
                        <p className="p-features-p">Depuffs</p>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
        </>
    );
}

export default ProductMain;