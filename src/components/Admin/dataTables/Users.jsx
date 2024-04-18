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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { AiOutlineClose } from "react-icons/ai";

export default function Users() {
    
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [deletingUser, setDeletingUser] = useState({});
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
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
        getUsers();
    }, [])

    async function getUsers() {
        const jwtToken = Cookies.get("jwtToken");
        await axios.get("http://localhost:3000/api/admin/users",
        {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
        }).then((response) => {
            setUsers(response.data.users);
            localStorage.setItem("allUsers", JSON.stringify(response.data.users));
        }).catch((err) => {
            console.log("error getting users: " + err);
        })
    }

    const handleStatusChange = (e) => {
        setOrderStatus(e.target.value);
    };

    async function updateOrder(id) {
        const jwtToken = Cookies.get("jwtToken");
        const email = user.email;
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
            console.log(response.data.message);
        }).catch((err) => {
            console.log("error getting users: " + err);
        })
    }

    async function deleteUser(id) {
        
        const jwtToken = Cookies.get("jwtToken");

        await axios.delete(`http://localhost:3000/api/admin/users/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        }).then((response) => {
            console.log("user deleted:", response.data.deletedUser);
            window.location.reload();
        }).catch((err) => {
            console.log("error deleting user: " + err);
        })
    }

    const handleEditClick = (user) => {
        // Open the edit dialog here
        setIsEditDialogOpen(true);
        setUser(user);
    };

    const handleEditDialogClose = () => {
        // Close the edit dialog here
        setIsEditDialogOpen(false);
        setUser([]);
    };

    const handleDeleteClick = (user) => {
        // Open the edit dialog here
        setIsDeleteDialogOpen(true);
        setDeletingUser(user);
    };

    const handleDeleteDialogClose = () => {
        // Close the edit dialog here
        setIsDeleteDialogOpen(false);
        setDeletingUser([]);
    };
    
    return (
        <section className="od-main-sec">
            <div className="od-main-div">
                <h3>UCOS - Users</h3>
                <TableContainer component={Paper} className="table">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow id="tab-head">
                                <TableCell className="tableCell"><strong>User ID</strong></TableCell>
                                <TableCell className="tableCell"><strong>User Name</strong></TableCell>
                                <TableCell className="tableCell"><strong>E-mail</strong></TableCell>
                                <TableCell className="tableCell"><strong>Orders</strong></TableCell>
                                <TableCell className="tableCell"><strong>Payments</strong></TableCell>
                                <TableCell className="tableCell"><strong></strong></TableCell>
                                <TableCell className="tableCell"><strong></strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {users.map((user) => {
                            return (
                            <TableRow key={user._id}>
                                <TableCell className="tableCell">{user._id}</TableCell>
                                <TableCell className="tableCell">{user.username}</TableCell>
                                <TableCell className="tableCell">{user.email}</TableCell>
                                <TableCell className="tableCell">{user.orders.map(od => {return <p key={od._id}>{od._id}</p>})}</TableCell>                                
                                <TableCell className="tableCell">{user.orders.map(od => {return <p key={od._id}>₹{od.payment}</p>})}</TableCell>                                
                                <TableCell className="tableCell"><button className="edit-btn" onClick={() => {handleEditClick(user)}}>Edit</button></TableCell>
                                <TableCell className="tableCell"><button className="delete-btn" onClick={() => {handleDeleteClick(user)}}>Delete</button></TableCell>
                            </TableRow>
                        )})}
                        </TableBody>

                        {/* edit user detail popup */}
                        <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
                            <DialogTitle>Edit User Details:</DialogTitle>
                            <DialogContent>
                            <div className="pop-input-div">
                                <label>ID:</label>
                                <input type="text" className="form-control-plaintext" defaultValue={user._id} />
                            </div>
                            <div className="pop-input-div">
                                <label>Name:</label>
                                <input type="text" className="form-control-plaintext" defaultValue={user.username} />
                            </div>
                            <div className="pop-input-div">
                                <label>E-mail:</label>
                                <input type="text" className="form-control-plaintext" defaultValue={user.email} />
                            </div>
                            <div className="form-group">
                                <label className="order-label"><strong>Orders:</strong></label>
                                {
                                user.orders ? 
                                user.orders.map( od => {
                                    return  <div key={od._id}>
                                                <form className="pop-order-div">
                                                    <label>{od._id}</label>
                                                    <label>₹{od.payment}</label>
                                                    {
                                                        od.status !== "Cancelled" ? 
                                                        <>
                                                            <select 
                                                            name="orderStatus"
                                                            id="order-status"
                                                            defaultValue={od.status}
                                                            onChange={handleStatusChange}
                                                            >
                                                                <option value="Processing">Processing</option>
                                                                <option value="Shipped">Shipped</option>
                                                                <option value="Returned">Returned</option>
                                                                <option value="Cancelled">Cancelled</option>
                                                            </select>
                                                            <button id="update-btn" type="submit" onClick={() => {updateOrder(od._id)}}>CHANGE</button>
                                                        </>
                                                        : 
                                                        <>
                                                            <span style={{color: "red"}}>{od.status}</span>
                                                            <span></span>
                                                        </>
                                                    }
                                                </form>
                                            </div>
                                    }) 
                                : <div></div>}
                            </div>
                            </DialogContent>
                            <DialogActions id="pop-btn-div">
                                <Button onClick={handleEditDialogClose} id="close-btn" color="error">
                                    <AiOutlineClose />
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {/* delete a user confirmation popup */}
                        <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose}>
                            <DialogContent>
                            <div style={{padding: "1rem"}}>
                                <span>Are you sure you want to delete the user:</span>
                                <p style={{textAlign: "center", fontSize: "20px", marginTop: "1rem"}}>{deletingUser.username}</p>
                            </div>
                            </DialogContent>
                            <DialogActions id="pop-btn-div">
                                <Button onClick={handleDeleteDialogClose} id="" color="error">
                                    Close
                                </Button>
                                <Button onClick={() => {deleteUser(deletingUser._id)}} id="">
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Table>
                </TableContainer>
            </div>
        </section>
    )
}