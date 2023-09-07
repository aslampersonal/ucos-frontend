import React from "react";
import "./SkinCare.css"

export default function SkinCare() {
    return (
        <>
            <div id="skincare-div">
                <h2></h2>
                <div className="cards-div">
                    <h2 className="sec-h2" id="skincare-h2">Skin care</h2>
                    <div class="row">
                        <div class="col-sm-5">
                            <div class="card">
                                <img className="card-img-top" src="/src/assets/images/eyeshadow-girl1.jpg" />
                                <div class="card-body">
                                    <h5 class="card-title">For Men</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <div class="card">
                                <img className="card-img-top" src="/src/assets/images/eyeshadow-girl1.jpg" />
                                <div class="card-body">
                                    <h5 class="card-title">For Women</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}