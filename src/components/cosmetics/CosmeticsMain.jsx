import React from "react";
import "./CosmeticsMain.css";
import { NavLink } from "react-router-dom";

export default function CosmeticsMain() {
    
    return (
        <>
            <div id="cosmetics-div">
                <h2></h2>
                <div className="cards-div">
                    <h2 className="sec-h2" id="cosmetics-h2">Cosmetic Products</h2>
                    <div className="row">
                        <div className="col-sm-5">
                            <NavLink to="/collections" state= {{title:"bodycare"}} className="nav-link" >
                            <div className="card">
                            <img className="card-img-top" src="/src/assets/images/eyeshadow-girl1.jpg" />
                                <div className="card-body">
                                    <h5 className="card-title">For Men</h5>
                                </div>
                            </div>
                            </NavLink>
                        </div>
                        <div className="col-sm-5">
                            <NavLink to="/collections" state= {{title:"haircare"}} className="nav-link">
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