import React, { createContext } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import "./Login.css"
import { Input } from "../input.";

export default function Login (props) {
    
    const loginContext = createContext();
    
    function loginSubmit () {
        const email = document.getElementById("email");
        const password = document.getElementById("password");
    }
    
    return (
        <>
            <section className="login-section">
                    <div className="login-main-div">
                        <div className="left-div">
                            <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid"
                            alt="Sample image"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{color: "rgb(37, 53, 76)"}}>
                                LOGIN
                            </p>
                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center">
                                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                    <FaFacebook className="social-icons">
                                        
                                    </FaFacebook>
                                    <FaTwitter className="social-icons">

                                    </FaTwitter>
                                    <FaLinkedin className="social-icons">

                                    </FaLinkedin>
                                </div>
                                <div className="divider d-flex align-items-center justify-content-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                </div>
                                <div className="icons-div">
                                    <MdEmail className="icons" />
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Enter a valid email address"
                                        required
                                    />
                                </div>
                                <div className="icons-div">
                                    <FaLock className="icons" />
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    {/* Checkbox */}
                                    <div className="form-check mb-0">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            defaultValue=""
                                            id="form2Example3"
                                        />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" id="frgt-pswrd">
                                    Forgot password?
                                    </a>
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2" id="login-btn-div">
                                    <button
                                    type="button"
                                    className="btn btn-primary btn-lg"
                                    id="login-btn"
                                    onClick={loginSubmit}
                                    >
                                    Login
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Don't have an account?{" "}
                                    <a href="/signup" className="link-danger" style={{textDecoration: "none"}}>
                                        Register
                                    </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
            </section>

        </>
    );
}