import React, { useEffect, useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useCont } from '../../context/MyContext';
import "./Profile.css";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { BsFillCalendarDateFill } from "react-icons/bs";
import Toast from "../Toast/Toast";

export default function Profile() {
    
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const { getOrders, user } = useCont();

    useEffect (() => {
        const jwtToken = Cookies.get("jwtToken");
        if (!jwtToken) {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 1000);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }
        getOrders();
        if (JSON.parse(localStorage.getItem("orders")).length !== 0) {
            setOrders(JSON.parse(localStorage.getItem("orders")));
        } else {
        }
    }, []);

    function orderSection () {
        if (orders.length !== 0) {
            return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Order Id</StyledTableCell>
                        <StyledTableCell align="center">Ordered Date</StyledTableCell>
                        <StyledTableCell align="center">Total</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        {/* <StyledTableCell align="center">Cancellation</StyledTableCell> */}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {orders.map((order) => (
                        <StyledTableRow key={order._id}>
                        <StyledTableCell component="th" scope="row">{order._id}</StyledTableCell>
                        <StyledTableCell align="left"><BsFillCalendarDateFill style={{fontSize:"20px", marginRight: "10px"}} />{order.orderDate.slice(0, 10)}</StyledTableCell>
                        <StyledTableCell align="left">₹{order.payment}</StyledTableCell>
                        <StyledTableCell align="right">{order.status}</StyledTableCell>
                        {/* <StyledTableCell align="center">{order.status!=="Cancelled" ? <button className="cancel-btn" onClick={() => {cancelOrder(order._id)}}>Cancel</button> : <span>Cancelled</span>}</StyledTableCell> */}
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                <h6 className="mb-3" onClick={() => { navigate("/orders") }} style={{cursor: "pointer"}}>
                    <a className="text-body link-underline link-underline-opacity-0 py-2" style={{borderBottom: "2px solid grey"}}>
                        View all orders
                        <HiArrowNarrowRight style={{marginLeft: "1rem"}} />
                    </a>
                </h6>
            </TableContainer>
            )
        } else {
            return (
                <div className="d-flex flex-column">
                    <span>You didn't ordered anything yet!</span>
                    <h6 className="mb-3 mt-2" onClick={() => { navigate("/store") }} style={{cursor: "pointer"}}>
                        <a className="text-body link-underline link-underline-opacity-0">
                          <HiArrowNarrowLeft style={{marginRight: "5px"}} />
                          Continue Shopping
                        </a>
                    </h6>
                </div>
            )
        }
    }

    function cancelOrder(id) {
        console.log(id);
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    
    return (
        <>
            <section>
                {/* notification toasts */}
                <div className="toast-container position-fixed top-0 start-50 translate-middle-x" style={{zIndex: "10"}}>
                    <Toast show={showToast} type="error" message="Please login in to your account! " />
                </div>
                <div style={{ backgroundColor: '#eee' }}>
                    <MDBContainer className="container py-5 h-100">
                        <MDBRow className="justify-content-center align-items-center h-100">
                            <MDBCol md="12" xl="6">
                                <MDBCard style={{ borderRadius: '15px' }}>
                                    <MDBCardBody className="text-center">
                                        <div className="mt-3 mb-4">
                                                <MDBCardImage src="./src/assets/images/profile-icon-men.png"
                                                className="rounded-circle" fluid style={{ width: '100px' }} />
                                        </div>
                                        <MDBTypography tag="h4" id="fullname">{user? user.username: ""}</MDBTypography>
                                        <MDBCardText className="text-muted mb-4">
                                            <span id="email">{user? user.email: ""}</span>
                                        </MDBCardText>
                                        <hr />
                                        <div className="d-flex flex-column justify-content-center text-center mt-1 mb-2">
                                            <h5 className="link-success">Your Orders</h5>
                                            <div className="d-flex justify-content-center text-center mt-1 mb-2">
                                                {orderSection()}
                                            </div>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </section>
        </>
    )
}