import React from "react";
import "./SkinCare.css"
import { NavLink } from "react-router-dom";

export default function SkinCare() {
    return (
        <>
            <div id="skincare-div">
                <h2></h2>
                <div className="cards-div">
                    <h2 className="sec-h2" id="skincare-h2">Skin Care Products</h2>
                    <div className="row">
                        <div className="col-sm-5">
                            <NavLink to="/collections" state= {{title:"skincare"}} className="nav-link">
                            <div className="card">
                                <img className="card-img-top" src="/src/assets/images/eyeshadow-girl1.jpg" />
                                <div className="card-body">
                                    <h5 className="card-title">For Men</h5>
                                </div>
                            </div>
                            </NavLink>
                        </div>
                        <div className="col-sm-5">
                            <NavLink to="/collections" state= {{title:"skincare"}} className="nav-link">
                            <div className="card">
                                <img className="card-img-top" src="/src/assets/images/eyeshadow-girl1.jpg" />
                                <div className="card-body">
                                    <h5 className="card-title">For Women</h5>
                                </div>
                            </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}