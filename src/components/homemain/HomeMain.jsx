import React, { useEffect } from 'react';
import './homemain.css';
import { NavLink } from 'react-router-dom';
import { useCont } from '../../context/MyContext';
import axios from 'axios';
import { AiFillStar, AiOutlineShoppingCart } from 'react-icons/ai';
import Cookies from 'js-cookie';

function HomeMain () {
    
    const prodData = JSON.parse(localStorage.getItem("fullProducts"));

    useEffect(() => {
        var counter = 1;
        const bannerInterval = setInterval(() => {
            document.getElementById('bnr-changer' + counter).checked = true;
            counter++;
            if(counter > 4) {
            counter = 1;
            }
        }, 5000);

        return () => {
            clearInterval(bannerInterval);
        }

    }, []);

    async function getProducts() {
        await axios.get('http://localhost:3000/api/users/products')
        .then((response) => {
            localStorage.setItem("fullProducts", JSON.stringify(response.data));
            return response.data;
        })
        .catch((err) => {
            console.log("error: " + err);
        })
    }
    getProducts();

    const featPrds = [
        {
            _id: "653772a1945d37bffc100c79",
            title: "M.A.C Lipstick new",
            brand: "M·A·C",
            image: "/src/assets/images/product-images/lipstick2.png",
            price: "5900",
        },
        {
            _id: "653773c6945d37bffc100c7d",
            title: "M·A·C LOCKED KISS 24HR LIPSTICK",
            brand: "M·A·C",
            image: "/src/assets/images/product-images/lipstick3.png",
            price: "3050",
        },
        {
            _id: "6539f2721a3cfef8ccc1e76f",
            title: "Lakme Lip Love Lip Scrub",
            brand: "LAKME",
            image: "/src/assets/images/product-images/lipscrub1.jpg",
            price: "325",
        },
        {
            _id: "6539f33c1a3cfef8ccc1e773",
            title: "Bella Vita Organic NicoLips Lip Lightening Scrub Balm",
            brand: "BELLA VITA",
            image: "/src/assets/images/product-images/lipscrub2.jpg",
            price: "299",
        },
        {
            _id: "6539f5b51a3cfef8ccc1e777",
            title: "Nykaa Rose & White Musk Hand & Nail Creme",
            brand: "NYKAA",
            image: "/src/assets/images/product-images/handcream1.jpg",
            price: "284",
        },
        {
            _id: "6539f6331a3cfef8ccc1e77b",
            title: "Nykaa Happy Heels Footcream - Tea Tree & Aloe Vera",
            brand: "NYKAA",
            image: "/src/assets/images/product-images/footcream1.avif",
            price: "237",
        },
        {
            _id: "6537749b945d37bffc100c81",
            title: "POWDER KISS LIPSTICK",
            brand: "M.A.C",
            image: "/src/assets/images/product-images/lipstick3.png",
            price: "1850",
        },
        {
            _id: "6539f0e21a3cfef8ccc1e767",
            title: "PREP + PRIME LIP",
            brand: "M.A.C",
            image: "/src/assets/images/product-images/lipstick4.png",
            price: "2000",
        },
        
    ];

    async function addToCart(id) {
        const jwtToken = Cookies.get("jwtToken");
        if (jwtToken) {
            try {
                const response = await axios.post(`http://localhost:3000/api/users/products/cart/${id}`,
                {id: id},
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
        } else {
            const cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
            localStorage.setItem("cart", JSON.stringify([...cart, id]));
        }
        window.location.reload();
    }
    
    return (
        <>
            <section id="mbanner-section">
                <div className="mbanner-div">
                    <div className="mbanner-div1">
                        {/* banner slider button */}
                        <input type="radio" name="radio-btn" id="bnr-changer1" />
                        <input type="radio" name="radio-btn" id="bnr-changer2" />
                        <input type="radio" name="radio-btn" id="bnr-changer3" />
                        <input type="radio" name="radio-btn" id="bnr-changer4" />
                        {/* banner images */}
                        <div className="mySlides first">
                            <img src="/src/assets/images/banners/main-banner1.jpg" className="b-img" alt='' />
                        </div>
                        <div className="mySlides">
                            <NavLink to="/collections" state= {{title:"haircare"}}>
                            <img src="/src/assets/images/banners/main-banner2.jpg" className="b-img" alt='' />
                            <button className='b-shop-btn'>SHOP NOW</button>
                            </NavLink>
                        </div>
                        <div className="mySlides">
                            <NavLink to="/collections" state= {{title:"face"}}>
                            <img src="/src/assets/images/banners/main-banner3.jpg" className="b-img" alt='' />
                            <button className='b-shop-btn'>SHOP NOW</button>
                            </NavLink>
                        </div>
                        <div className="mySlides">
                            <NavLink to="/collections" state= {{title:"lips"}}>
                            <img src="/src/assets/images/banners/main-banner4.jpg" className="b-img" alt='' />
                            <button className='b-shop-btn'>SHOP NOW</button>
                            </NavLink>
                        </div>
                        {/* automatic navigation */}
                        <div className="navigation-auto">
                            <div className="auto-btn1" />
                            <div className="auto-btn2" />
                            <div className="auto-btn3" />
                            <div className="auto-btn4" />
                        </div>
                        {/* manual navigation */}
                        <div className="navigation-manual">
                            <label htmlFor="bnr-changer1" className="manual-btn" />
                            <label htmlFor="bnr-changer2" className="manual-btn" />
                            <label htmlFor="bnr-changer3" className="manual-btn" />
                            <label htmlFor="bnr-changer4" className="manual-btn" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="section2">
                <h2>Super value deals</h2>
                <h1>On Body Care products</h1>
                <p>Save more with coupons & up to 70% off! </p>
                <NavLink to="/collections" state= {{title:"bodycare"}}><button>Shop Now</button></NavLink>
            </section>

            <section id='section3' className='fet-section'>
                <div className='icon-box'>
                    <img src="/src/assets/images/icons/free-shipping.png" alt="" />
                    <h6>Free Shipping</h6>
                </div>
                <div className='icon-box'>
                    <img src="/src/assets/images/icons/online-order.png" alt="" />
                    <h6>Online Order</h6>
                </div>
                <div className='icon-box'>
                    <img src="/src/assets/images/icons/best-price.png" alt="" />
                    <h6>Best Price</h6>
                </div>
                <div className='icon-box'>
                    <img src="/src/assets/images/icons/piggy-bank.png" alt="" />
                    <h6>Save Money</h6>
                </div>
                <div className='icon-box'>
                    <img src="/src/assets/images/icons/24-hours-support.png" alt="" />
                    <h6>24/7 Support</h6>
                </div>
            </section>

            <section id='section4' className='ftrd-pds'>
                <hr />
                <h2>Featured Products</h2>
                <p>User's Best Choices!!!</p>
                <div className='pro-container'>
                    {
                        featPrds.map((pd) => {
                            return (
                                <div className='pro' key={pd._id}>
                                    <NavLink to="/product" state={{prodId: pd._id}}>
                                        <img src={pd.image} alt="" />
                                    </NavLink>
                                    <div className='des'>
                                        <span>{pd.brand}</span>
                                        <h5>{pd.title}</h5>
                                        <div className='star'>
                                            <AiFillStar className='ics' />
                                            <AiFillStar className='ics' />
                                            <AiFillStar className='ics' />
                                            <AiFillStar className='ics' />
                                            <AiFillStar className='ics' />
                                        </div>
                                        <h4>₹{pd.price}</h4>
                                    </div>
                                    <button className='cart' onClick={() => addToCart(pd._id)}><AiOutlineShoppingCart /></button>
                                </div>
                            );
                        })
                    }
                </div>
            </section>

            <section id="category-section">
                <div id="cat-makeup-div">
                    <div id="cat-makeup-div-div">
                        <h2 id="cat-makeup-h2">Face Care products</h2>
                        <NavLink to="/collections" state= {{title:"face"}}>
                            <button href="./product.html" className="btn btn-light" id="cat-makeup-btn">
                            SHOP NOW
                            </button>
                        </NavLink>
                    </div>
                </div>
                <div id="cat-skin-div">
                    <div id="cat-skin-div-div">
                        <h2 id="cat-skin-h2">skincare products</h2>
                        <NavLink to="/collections" state= {{title:"skincare"}}>
                            <button className="btn btn-dark" id="cat-skin-btn" href="./product.html">
                            SHOP NOW
                            </button>
                        </NavLink>
                    </div>
                </div>
            </section>
            <section id="scroll-banner-section">
                <div id="scroll-banner-div">
                    <div id="sb-h-div">
                        <h2
                        style={{
                            color: "#6d9962",
                            fontWeight: 400,
                            letterSpacing: 5,
                            fontSize: 45,
                            fontFamily: '"Nova Flat"'
                        }}
                        >
                        #UCOS
                        </h2>
                    </div>
                    <div id="sb-b-div">
                        <div className="container sb-img-div">
                            <img className="sb-img" src="/src/assets/images/facecare-lady.png" alt='' />
                        </div>
                        <div className="container sb-img-div">
                            <img className="sb-img" src="/src/assets/images/men-bearedcare.jpg" alt='' />
                        </div>
                        <div className="container sb-img-div">
                            <img className="sb-img" src="/src/assets/images/girlface-lipstick.jpg" alt='' />
                        </div>
                        <div className="container sb-img-div">
                            <img className="sb-img" src="/src/assets/images/men-skincare1.jpg" alt='' />
                        </div>
                        <div className="container sb-img-div">
                            <img className="sb-img" src="/src/assets/images/eyeshadow-girl1.jpg" alt='' />
                        </div>
                    </div>
                </div>
            </section>

            <section id="banner3-section">
                <div id="banner3-div">
                    <div id="b3-leftb">
                        <img id="b3-left-img" src="/src/assets/images/eyeshadow-girl1.jpg" alt='' />
                    </div>
                    <div id="b3-center">
                        <h2 id="b3-center-h2">BEAUTIFUL. GLAMOROUS. RADIANT.</h2>
                        <NavLink to="/collections" state= {{title:"eyeshadow"}} className="btn btn-light" id="b3-center-btn">
                        SHOP EYE SHADOWS
                        </NavLink>
                    </div>
                    <div id="b3-rightb">
                        <img id="b3-right-img" src="/src/assets/images/eye-shadow2.jpg" alt='' />
                    </div>
                </div>
            </section>

            <section id="product-bnr2-sec">
                <div id="prod-bnr2-div">
                    <div className="prod-div">
                        <NavLink to="/product" state={{prodId: prodData[0]._id}} className="prod-div-nav">
                        <img src={prodData[0].image} className="prod-img" alt='' />
                        <p className="prod-img-text">NEW</p>
                        </NavLink>
                    </div>
                    <div className="prod-div">
                        <NavLink to="/product" state={{prodId: prodData[1]._id}} className="prod-div-nav">
                        <img src={prodData[1].image} className="prod-img" alt='' />
                        <p className="prod-img-text">NEW</p>
                        </NavLink>
                    </div>
                    <div className="prod-div">
                        <NavLink to="/product" state={{prodId: prodData[2]._id}} className="prod-div-nav">
                        <img src={prodData[2].image} className="prod-img" alt='' />
                        <p className="prod-img-text">NEW</p>
                        </NavLink>
                    </div>
                    <div className="prod-div">
                        <NavLink to="/product" state={{prodId: prodData[3]._id}} className="prod-div-nav">
                        <img src={prodData[3].image} className="prod-img" alt='' />
                        <p className="prod-img-text">NEW</p>
                        </NavLink>
                    </div>
                    <div className="prod-div">
                        <NavLink to="/product" state={{prodId: prodData[4]._id}} className="prod-div-nav">
                        <img src={prodData[4].image} className="prod-img" alt='' />
                        <p className="prod-img-text">NEW</p>
                        </NavLink>
                    </div>
                </div>
                <div id="prod-bnr2-btn-div">
                    <NavLink id="prod-bnr2-btn" className="btn btn-dark" to="/store">
                        SHOP ALL
                    </NavLink>
                </div>
            </section>
        </>

    );
}

export default React.memo(HomeMain);