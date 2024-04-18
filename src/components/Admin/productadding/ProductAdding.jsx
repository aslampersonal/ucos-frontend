import React, { useState } from 'react';
import axios from 'axios';
import { MdTitle, MdOutlineInventory2 } from "react-icons/md"
import { BsBodyText } from "react-icons/bs"
import { TbBrandAsana, TbCategory } from "react-icons/tb"
import { ImPriceTag } from "react-icons/im"
import { BiImages } from "react-icons/bi"

import "./ProductAdding.css";
import Toast from '../../Toast/Toast';
import Cookies from 'js-cookie';

export default function ProductAdding() {

  const [product, setProduct] = useState({ 
    title: '', 
    description: '', 
    brand: '', 
    price: '0', 
    image: null, 
    category: 'Collections', 
    countInStock: '0' 
    });
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwtToken = Cookies.get("jwtToken");
    const formData = new FormData();
    formData.append('title', product.name);
    formData.append('description', product.description);
    formData.append('brand', product.brand);
    formData.append('category', product.category);
    formData.append('price', product.price);
    formData.append('countInStock', product.countInStock);
    formData.append('image', product.image);

    try {
      const response = await axios.post('http://localhost:3000/api/admin/productupload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log(response.data.message);
      setShowToast(true);
      setTimeout(() => {
          setShowToast(false);
      }, 2000);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div className='container' id='main-div'>
      {/* notification toasts */}
      <div className="toast-container position-fixed top-0 start-50 translate-middle-x" style={{zIndex: "10"}}>
        <Toast show={showToast} type="success" message="Product added successfully" />
      </div>
      <h2>Upload Products</h2>
      <form onSubmit={handleSubmit} id='prod-form'>
        <div className='input-div'>
            <MdTitle className="icons" />
            <input type="text" className='form-control' name="name" placeholder="Product Title" onChange={handleInputChange} />
        </div>
        <div className='input-div'>
            <BsBodyText className="icons" />
            <textarea type="text" className='form-control' name="description" placeholder="Product Description" onChange={handleInputChange} style={{resize: "none"}}></textarea>
        </div>
        <div className='input-div'>
            <TbBrandAsana className="icons" />
            <input type="text" className='form-control' name="brand" placeholder="Product Brand" onChange={handleInputChange} />
        </div>
        <div className='input-div'>
            <TbCategory className="icons" />
            <select defaultValue="null" className='form-control' name="category" placeholder="Product Category" onChange={handleInputChange}>
              <option>select a product category</option>
              <optgroup label="LIPS">
                <option>Lipstick</option>
                <option>Lip Balm</option>
                <option>Lip Scrub</option>
                <option>Lip Mask</option>
              </optgroup>
              <optgroup label="HANDS & FEET">
                <option>Hand Creams</option>
                <option>Foot Creams</option>
                <option>Hands & Foot Masks</option>
              </optgroup>
              <optgroup label="EYES">
                <option>Under Eye Cream & Serum</option>
                <option>Eye Masks</option>
              </optgroup>
              <optgroup label="SKIN CARE">
                <option>Moisturizer</option>
                <option>Cleanser</option>
                <option>Mask</option>
                <option>Toner</option>
              </optgroup>
              <optgroup label="BODY CARE">
                <option>Lotions & Creams</option>
                <option>Massage Oils</option>
                <option>Shower Gels & Body Wash</option>
                <option>Scrubs & Loofahs</option>
              </optgroup>
              <optgroup label="HAIR CARE">
                <option>Shampoo</option>
                <option>Conditioner</option>
                <option>Hair Oil</option>
                <option>Hair Serum</option>
                <option>Dry Shampoo</option>
              </optgroup>
            </select>
        </div>
        <div className='input-div'>
            <ImPriceTag className="icons" />
            <input type="number" className='form-control' name="price" placeholder="Product Price" onChange={handleInputChange} />
        </div>
        <div className='input-div'>
            <MdOutlineInventory2 className="icons" />
            <input type="number" className='form-control' name="countinstock" placeholder="Count in Stock" onChange={handleInputChange} />
        </div>
        <div className='input-div'>
            <BiImages className="icons" />
            <input type="file" className='form-control' name="image" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" className='btn btn-primary' id='submit-btn'>Upload</button>
      </form>
    </div>
  );
};
