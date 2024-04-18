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

export default function Products() {
    
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [deletingUser, setDeletingUser] = useState({});
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({
        title: '', 
        description: '', 
        brand: '', 
        price: '0', 
        image: null, 
        category: 'Collections', 
        countInStock: '0'
    });

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
        getProducts();
    }, [])

    async function getProducts() {
        const jwtToken = Cookies.get("jwtToken");
        await axios.get("http://localhost:3000/api/admin/products",
        {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
        }).then((response) => {
            localStorage.setItem("allProducts", JSON.stringify(response.data.allProducts));
            setProducts(response.data.allProducts);
        }).catch((err) => {
            console.log("error getting Products: " + err);
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };
    
    const handleImageChange = (e) => {
        setUpdatedProduct({ ...updatedProduct, image: e.target.files[0] });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const jwtToken = Cookies.get("jwtToken");
        const formData = new FormData();
        formData.append('title', updatedProduct.title);
        formData.append('description', updatedProduct.description);
        formData.append('brand', updatedProduct.brand);
        formData.append('category', updatedProduct.category);
        formData.append('price', updatedProduct.price);
        formData.append('countInStock', updatedProduct.countInStock);

        if (typeof(updatedProduct.image) == "object") {
            formData.append('image', updatedProduct.image);
            await axios.put(`http://localhost:3000/api/admin/products/image/${updatedProduct._id}`,
            formData,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwtToken}`,
                },
            }).then((response) => {
                console.log(response.data.message);
                window.location.reload();
            }).catch((error) => {
                console.error('Error uploading product:', error);
            })
        }
    
        await axios.put(`http://localhost:3000/api/admin/products/${updatedProduct._id}`,
        formData,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        }).then((response) => {
            console.log(response.data.message);
            window.location.reload();
        }).catch((error) => {
            console.error('Error uploading product:', error);
        })
    };

    async function deleteProduct(id) {
        const jwtToken = Cookies.get("jwtToken");
        await axios.delete(`http://localhost:3000/api/admin/products/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        }).then((response) => {
            console.log("Product deleted:", response.data.product);
            window.location.reload();
        }).catch((err) => {
            console.log("error deleting Product: " + err);
        })
    }

    const handleEditClick = (prod) => {
        // Open the edit dialog here
        setIsEditDialogOpen(true);
        setProduct(prod);
        setUpdatedProduct(prod);
    };

    const handleEditDialogClose = () => {
        // Close the edit dialog here
        setIsEditDialogOpen(false);
        setProduct([]);
        setUpdatedProduct([]);
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
                <h3>UCOS - Products</h3>
                <TableContainer component={Paper} className="table">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow id="tab-head">
                                <TableCell className="tableCell"><strong>Product ID</strong></TableCell>
                                <TableCell className="tableCell"><strong>Title</strong></TableCell>
                                <TableCell className="tableCell"><strong>Image</strong></TableCell>
                                <TableCell className="tableCell"><strong>Brand</strong></TableCell>
                                <TableCell className="tableCell"><strong>Category</strong></TableCell>
                                <TableCell className="tableCell"><strong>Price</strong></TableCell>
                                <TableCell className="tableCell"><strong>Stock</strong></TableCell>
                                <TableCell className="tableCell"><strong>Description</strong></TableCell>
                                <TableCell className="tableCell"><strong></strong></TableCell>
                                <TableCell className="tableCell"><strong></strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {products.map((prod) => {
                            const img = "http://localhost:3000/" + prod.image.slice(7);
                            return (
                            <TableRow key={prod._id}>
                                <TableCell className="tableCell">{prod._id}</TableCell>
                                <TableCell className="tableCell">{prod.title}</TableCell>
                                <TableCell className="tableCell"><img src={img} alt="image error" /></TableCell>
                                <TableCell className="tableCell">{prod.brand}</TableCell>
                                <TableCell className="tableCell">{prod.category}</TableCell>
                                <TableCell className="tableCell">₹{prod.price}</TableCell>
                                <TableCell className="tableCell">{prod.countInStock}</TableCell>
                                <TableCell className="tableCell">{prod.description}</TableCell>
                                <TableCell className="tableCell"><button className="edit-btn" onClick={() => {handleEditClick(prod)}}>Edit</button></TableCell>
                                <TableCell className="tableCell"><button className="delete-btn" onClick={() => {handleDeleteClick(prod)}}>Delete</button></TableCell>
                            </TableRow>
                        )})}
                        </TableBody>

                        {/* edit user detail popup */}
                        <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
                            <DialogTitle>Edit Product Details:</DialogTitle>
                            <form>
                            <DialogContent>
                            <div className="pop-input-div">
                                <label>Product ID:</label>
                                <label>{product._id}</label>
                            </div>
                            <div className="pop-input-div">
                                <label>Title:</label>
                                <input type="text" name="title" onChange={handleInputChange} className="form-control" defaultValue={product.title} />
                            </div>
                            <div className="pop-input-div">
                                <label>Image:</label>
                                <input type="file" name="image" onChange={handleImageChange} className="form-control" />
                            </div>
                            <div className="pop-input-div">
                                <label>Brand:</label>
                                <input type="text" name="brand" onChange={handleInputChange} className="form-control" defaultValue={product.brand} />
                            </div>
                            <div className="pop-input-div">
                                <label>Category:</label>
                                <input type="text" name="category" onChange={handleInputChange} className="form-control" defaultValue={product.category} />
                            </div>
                            <div className="pop-input-div">
                                <label>Price:</label>
                                <input type="text" name="price" onChange={handleInputChange} className="form-control" defaultValue={product.price} />
                            </div>
                            <div className="pop-input-div">
                                <label>Stock:</label>
                                <input type="text" name="countInStock" onChange={handleInputChange} className="form-control" defaultValue={product.countInStock} />
                            </div>
                            <div className="pop-input-div">
                                <label>Description:</label>
                                <input type="text" name="description" onChange={handleInputChange} className="form-control" defaultValue={product.description} />
                            </div>
                            </DialogContent>
                            <DialogActions id="pop-btn-div">
                                <Button onClick={handleEditDialogClose} id="close-btn" color="error">
                                    <AiOutlineClose />
                                </Button>
                                <Button onClick={handleSubmit} id="update-btn" color="error">
                                    Update
                                </Button>
                            </DialogActions>
                            </form>
                        </Dialog>

                        {/* delete a user confirmation popup */}
                        <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose}>
                            <DialogContent>
                            <div style={{padding: "1rem"}}>
                                <span>Are you sure you want to delete the Product:</span>
                                <p style={{textAlign: "center", fontSize: "20px", marginTop: "1rem"}}>{deletingUser.username}</p>
                            </div>
                            </DialogContent>
                            <DialogActions id="pop-btn-div">
                                <Button onClick={handleDeleteDialogClose} id="" color="error">
                                    Close
                                </Button>
                                <Button onClick={() => {deleteProduct(deletingUser._id)}} id="">
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