import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import "./OrderMain.css";

import { HiArrowNarrowLeft } from "react-icons/hi";
import { TiTick } from "react-icons/ti"
import { useCont } from '../../context/MyContext';
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { BsFillCalendarDateFill } from "react-icons/bs";
import axios from "axios";
import Toast from "../Toast/Toast";

export default function OrderMain() {

    const [Products, setProducts] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [Id, setId] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [showToast1, setShowToast1] = useState(false);
    const { user, setUser, orders, getOrders } = useCont();
    const loc = useLocation().state;
    const { orderId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        setId(JSON.stringify(localStorage.getItem("orderId")));
        const jwtToken = Cookies.get("jwtToken");
        if (jwtToken) {
          const decodedToken = jwt_decode(jwtToken);
          setUser(decodedToken);
          getOrders();
          setOrderList(JSON.parse(localStorage.getItem('orders')) || []);
          setProducts(JSON.parse(localStorage.getItem("fullProducts")));
        } else {
            setShowToast1(true);
            setTimeout(() => {
                setShowToast1(false);
                navigate("/login");
            }, 1000); 
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }

        return () => {
            //clearing oderid from local storage
            localStorage.removeItem("orderId");
        }

    }, []);

    async function cancelOrder(id) {
        try {
            const jwtToken = Cookies.get("jwtToken");

            const response = await axios.put(`http://localhost:3000/api/users/orders/updateorders/${id}`,
            { status: "Cancelled" },
            {
                method: 'PUT', // Use PUT request to update the resource
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the Authorization header
                },
            });
            console.log(response.data.message);
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                getOrders();
                setOrderList(JSON.parse(localStorage.getItem('orders')) || []);
            }, 2000); 
        } catch (error) {
            console.log('Error updating order status:', error);
        }
    }


    return (
        <>
            {/* notification toasts */}
            <div className="toast-container position-fixed top-0 start-50 translate-middle-x" style={{zIndex: "10"}}>
                <Toast show={showToast} type="success" message="Your order has been cancelled" />
                <Toast show={showToast1} type="error" message="Please login in to your account! " />
            </div>
            {/* <section style={{display: JSON.stringify(localStorage.getItem("orderId"))? "block" : "none" }}>
                <div style={{display: "flex"}}>
                    <TiTick style={{fontSize: "35px", color: "green"}} />
                    <h3>Your order {JSON.stringify(localStorage.getItem("orderId"))} has placed successfully</h3>
                </div>
            </section> */}

            <section className="container py-5 h-100 d-flex justify-content-center" >
                <div className="o-row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <h6 className="mb-3">
                            <button onClick={() => {navigate(-1)}} className="cnt-btn btn">
                            <HiArrowNarrowLeft style={{marginRight: "5px"}} />
                            Continue Shopping
                            </button>
                        </h6>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="mb-1">Your Orders:</h4>
                        </div>
                        {
                            orderList.map((order) => {
                            return (
                                <div className="order-main" key={order._id}>
                                    <div className="order-main-top">
                                        <span><strong>ID: </strong>{order._id}</span>
                                        <span><BsFillCalendarDateFill style={{fontSize:"20px", marginRight: "10px"}} />{order.orderDate.slice(0, 10)}</span>
                                        <span><strong>₹{order.payment}</strong></span>
                                        <span style={{color: order.status === "Cancelled"? "red": "green"}}>{order.status}</span>
                                        <button className="cncl-btn" style={{display: order.status === "Cancelled"? "none": "block"}} onClick={() => {cancelOrder(order._id)}}>Cancel</button>
                                    </div>
                                    <div className="order-main-prods">
                                        {
                                            order.products.map((pd) => {
                                                return (
                                                    <div key={pd._id}>{
                                                    Products.map((product) => {
                                                    if (pd.pid === product._id) {
                                                        return (
                                                            <div className="prod-div" key={product._id}>
                                                                <div className="img-div">
                                                                    <img
                                                                        src= {product.image}
                                                                        className="img-fluid rounded-3"
                                                                        alt="Shopping item"
                                                                        style={{ width: 65 }}
                                                                    />
                                                                </div>
                                                                <div className="desc-div">
                                                                    <p><strong>{product.title}</strong></p>
                                                                    <p className="small mb-0">{product.brand}</p>
                                                                </div>
                                                                <div className="price-div">
                                                                    <p className=""><strong>{pd.quantity}</strong></p>
                                                                </div>
                                                                <div className="price-div">
                                                                    <p className=""><strong>₹{product.price}</strong></p>
                                                                </div>
                                                                <div className="btn-div">
                                                                    <NavLink className="pd-view-btn" to="/product" state={{prodId: product._id}}>View Product</NavLink>
                                                                </div>
                                                            </div>
                                                        );
                                                    }    
                                                    }) 
                                                    }</div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                            })
                        }

                    </div>
                </div>
            </section>
        </>
    )

}