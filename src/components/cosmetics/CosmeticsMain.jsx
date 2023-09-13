import React from "react";
import "./CosmeticsMain.css";

export default function CosmeticsMain() {
    return (
        <>

            <div id="cosmetics-div">
                <h2></h2>
                <div className="cards-div">
                    <h2 className="sec-h2" id="cosmetics-h2">Cosmetic Products</h2>
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

            {/* <section id="cosmetics-sec">
                <h2></h2>
                <div className="cards-div">
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="card">
                                <img className="card-img-top" src="/src/assets/images/eyeshadow-girl1.jpg" />
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <img className="card-img-top" src="/src/assets/images/eyeshadow-girl1.jpg" />
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <img className="card-img-top" src="/src/assets/images/eyeshadow-girl1.jpg" />
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
}