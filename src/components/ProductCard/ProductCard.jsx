import React, { useContext } from 'react';
import "./ProductCard.css"
import { FaSearchPlus } from "react-icons/fa"

import MyContext from '../../context/MyContext';

export default function ProductCard (props) {

    const path = props.loc.state.title;
    const product = useContext(MyContext);
    const {prodData} = product;
    const productList = prodData.filter((prod) => prod.category == path);

    return(
        <section id="main-section" className="col-9">
    
            <header className="border-bottom mb-4 pb-3">
                <div className="form-inline">
                    <span className="mr-md-auto">{productList.length} Items found </span>
                    <select className="mr-2 form-control">
                        <option>Latest items</option>
                        <option>Trending</option>
                        <option>Most Popular</option>
                        <option>Cheapest</option>
                    </select>
                    <div className="btn-group">
                        <a href="#" className="btn btn-outline-secondary" data-toggle="tooltip" title="List view"> 
                            <i className="fa fa-bars"></i></a>
                        <a href="#" className="btn  btn-outline-secondary active" data-toggle="tooltip" title="Grid view"> 
                            <i className="fa fa-th"></i></a>
                    </div>
                </div>
            </header>
            
            <div className='row-6' >
                {productList.map((prodData) => {
                        return (
                            <div className="col-4" key={prodData._id}>
                                <figure className="card card-product-grid">
                                    <div className="img-wrap"> 
                                        <span className="badge badge-danger"> NEW </span>
                                        <img src={prodData.image} />
                                        <a className="btn-overlay" href="#"><FaSearchPlus /> Quick view</a>
                                    </div> 
                                    <figcaption className="info-wrap">
                                        <div className="fix-height">
                                            <a href="#" className="title">{prodData.name}</a>
                                            <div className="price-wrap mt-2">
                                                <span className="price">{prodData.price}</span>
                                            </div>
                                        </div>
                                        <a href="#" className="btn btn-block btn-primary">Add to cart</a>
                                    </figcaption>
                                </figure>
                            </div>
                        )
                    })}
            </div>

            <nav className="mt-4" aria-label="Page navigation sample">
                <ul className="pagination">
                <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>

        </section> 
    );
}
