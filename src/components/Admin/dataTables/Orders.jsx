import Cookies from "js-cookie";
import React from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "./dataTables.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Orders() {
    
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState("");

    useEffect(() => {
        const jwtToken = Cookies.get('jwtToken');
        if (!jwtToken) {
            navigate("/login");
        } else {
            const decodedToken = jwt_decode(jwtToken);
            if (decodedToken.email !== "admin@gmail.com") {
                navigate("/login");
            }
        }
        getOrders();
    }, [])

    async function getOrders() {
        const jwtToken = Cookies.get("jwtToken");
        await axios.get("http://localhost:3000/api/admin/orders",
        {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
        }).then((response) => {

            //setting total orders
            let orders = [];
            response.data.orders.forEach(order => {
                if (order.orders.length != 0 ) {
                    order.orders.forEach(od => {
                        od.user = order.email;
                        orders.push(od);
                    })   
                }
            });
            localStorage.setItem("orderList", JSON.stringify(orders));
            setOrders(orders);

        }).catch((err) => {
            console.log("error getting orders: " + err);
        })
    }

    const handleStatusChange = (e) => {
        setOrderStatus(e.target.value);
    };

    async function updateOrder(id, user) {
        const jwtToken = Cookies.get("jwtToken");
        const email = user;
        const status = orderStatus;

        await axios.put(`http://localhost:3000/api/admin/orders/updateorders/${id}`,
        { status, email },
        {
            method: 'PUT', // Use PUT request to update the resource
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the Authorization header
            },
        }).then((response) => {
            window.location.reload();
        }).catch((err) => {
            console.log("error getting users: " + err);
        })
    }
    
    return (
        <section className="od-main-sec">
            <div className="od-main-div">
                <h3>UCOS - Orders</h3>
                <TableContainer component={Paper} className="table">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow id="tab-head">
                                <TableCell className="tableCell"><strong>Order ID</strong></TableCell>
                                <TableCell className="tableCell"><strong>User</strong></TableCell>
                                <TableCell className="tableCell"><strong>Products</strong></TableCell>
                                <TableCell className="tableCell"><strong>Quantity</strong></TableCell>
                                <TableCell className="tableCell"><strong>Payment</strong></TableCell>
                                <TableCell className="tableCell"><strong>Order Date</strong></TableCell>
                                <TableCell className="tableCell"><strong>Status</strong></TableCell>
                                <TableCell className="tableCell"><strong></strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {orders.map((order) => {
                            return (
                            <TableRow key={order._id}>
                                <TableCell className="tableCell">{order._id}</TableCell>
                                <TableCell className="tableCell">{order.user}</TableCell>
                                <TableCell className="tableCell">{order.products.map(pd => {return <p key={pd._id}>{pd._id}</p>})}</TableCell>                                
                                <TableCell className="tableCell">{order.products.map(pd => {return <p key={pd._id}>{pd.quantity}</p>})}</TableCell>                                
                                <TableCell className="tableCell">{order.payment}</TableCell>
                                <TableCell className="tableCell">{order.orderDate}</TableCell>
                                <TableCell className="tableCell">
                                    {
                                        order.status !== "Cancelled" ?
                                        <select 
                                        name="orderStatus"
                                        id="order-status"
                                        defaultValue={order.status}
                                        onChange={handleStatusChange}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Returned">Returned</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select> :
                                        <label>{order.status}</label>
                                    }
                                </TableCell>
                                <TableCell className="tableCell">
                                    {
                                        order.status !== "Cancelled" ?
                                        <button className="edit-btn" onClick={() => {updateOrder(order._id, order.user)}}>Update</button> :
                                        <span></span>
                                    }
                                </TableCell>
                            </TableRow>
                        )})}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </section>
    )

}