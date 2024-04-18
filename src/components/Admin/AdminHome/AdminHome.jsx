import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Widget from "../Widget/Widget";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./AdminHome.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminHome() {

    const navigate = useNavigate();
    
    const [orderList, setOrderList] = useState([]);
    const [revenueToday, setRevenueToday] = useState(0);
    const [revenueTodaypctg, setRevenueTodaypctg] = useState(0);
    const [revenuelastW, setRevenuelastW] = useState(0);
    const [revenuelastM, setRevenuelastM] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalEarning, setTotalEarning] = useState(0);

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
        getUsers();
        getOrders();

    }, [])

    async function getUsers() {
        const jwtToken = Cookies.get("jwtToken");
        await axios.get("http://localhost:3000/api/admin/users",
        {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
        }).then((response) => {
            setTotalUsers(response.data.users.length);
            localStorage.setItem("allUsers", JSON.stringify(response.data.users));
        }).catch((err) => {
            console.log("error getting users: " + err);
        })
    }

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
            setOrderList(orders);
            setTotalOrders(orders.length);

            //setting total earning
            let TotalEarning = 0;
            orders.forEach(ord => {
                TotalEarning = TotalEarning + ord.payment;
            })
            setTotalEarning(TotalEarning);

            //setting total sale made today
            const currentDate = new Date();
            const today = currentDate.toISOString().slice(0, 10);
            let ordersToday = orders.filter((od) => od.orderDate.slice(0, 10) == today );
            let todayEarning = 0;
            ordersToday.forEach(ord => {
                todayEarning = todayEarning + ord.payment;
            })
            setRevenueToday(todayEarning);
            setRevenueTodaypctg(Math.trunc((todayEarning * 100) / TotalEarning));

        }).catch((err) => {
            console.log("error getting orders: " + err);
        })
    }

    return (
        <>
            <div className="home">
                <div className="homeContainer">
                    <div className="widgets">
                        <Widget type="user" value={totalUsers} />
                        <Widget type="order" value={orderList.length} />
                        <Widget type="earning" value={totalEarning} />
                        <Widget type="balance" value={totalEarning} />
                    </div>
                    <div className="charts">
                        <div className="featured">
                            <div className="top">
                                <h1 className="title">Total Revenue</h1>
                            </div>
                            <div className="bottom">
                                <div className="featuredChart">
                                    <CircularProgressbar value={revenueToday != 0 ? revenueTodaypctg : 0} text={(revenueToday != 0 ? revenueTodaypctg : 0) +"%"} strokeWidth={10} />
                                </div>
                                <div className="featuredtext">
                                    <p className="title">Total sales made today</p>
                                    <p className="amount">₹{revenueToday}</p>
                                    <p className="desc">
                                    Previous transactions processing.
                                    </p>
                                </div>
                                <div className="summary">
                                    <div className="item">
                                        <div className="itemTitle">Target(20K)</div>
                                        <div style={{display: revenueToday>20000? "" : "none"}} className="itemResult positive">
                                            <IoIosArrowUp />
                                            <div className="resultAmount">₹{20000-revenueToday}</div>
                                        </div>
                                        <div style={{display: revenueToday<20000? "" : "none"}} className="itemResult negative">
                                            <IoIosArrowDown />
                                            <div className="resultAmount">₹{20000-revenueToday}</div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="itemTitle">Last Week</div>
                                        <div className="itemResult positive">
                                            <IoIosArrowUp />
                                            <div className="resultAmount">₹{revenuelastW}</div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="itemTitle">Last Month</div>
                                        <div className="itemResult positive">
                                            <IoIosArrowUp />
                                            <div className="resultAmount">₹{revenuelastM}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="listContainer">
                        <div className="listTitle">Latest Orders</div>
                        <TableContainer component={Paper} className="table">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="tableCell"><strong>Order ID</strong></TableCell>
                                        <TableCell className="tableCell"><strong>Product Ids</strong></TableCell>
                                        <TableCell className="tableCell"><strong>Quantity</strong></TableCell>
                                        <TableCell className="tableCell"><strong>Customer</strong></TableCell>
                                        <TableCell className="tableCell"><strong>Date</strong></TableCell>
                                        <TableCell className="tableCell"><strong>Amount</strong></TableCell>
                                        <TableCell className="tableCell"><strong>Status</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {orderList.map((row) => {
                                    return (
                                    <TableRow key={row._id}>
                                        <TableCell className="tableCell">{row._id}</TableCell>
                                        <TableCell className="tableCell">
                                            {row.products.map(pd => {
                                                return <p className="pd-id" key={pd._id}>
                                                    <NavLink to="/product" state={{prodId: pd.pid}} style={{textDecoration: "none"}}>{pd.pid}</NavLink>
                                                </p>
                                            })}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.products.map(pd => {
                                                return <p key={pd._id}>{pd.quantity}</p>
                                            })}
                                        </TableCell>
                                        <TableCell className="tableCell">{row.user}</TableCell>
                                        <TableCell className="tableCell">{row.orderDate}</TableCell>
                                        <TableCell className="tableCell">{row.payment}</TableCell>
                                        <TableCell className="tableCell">{row.status}</TableCell>
                                    </TableRow>
                                )})}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    )
}