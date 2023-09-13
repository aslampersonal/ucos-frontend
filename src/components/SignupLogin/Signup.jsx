import React, { useEffect } from "react";
import { FaUserAlt, FaLock, FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbReload } from "react-icons/tb";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { useForm } from "react-hook-form";

import "./Signup.css"

export default function Signup (props) {

    useEffect (() => {
        loadCaptchaEnginge(5, "grey");
    });

    const { register, handleSubmit, watch, formState: { errors } } = useForm(); 
    const onSubmit = data => console.log(data);

    // console.log(watch("example"));

    function validateCaptchaValue () {
        let user_captcha_value = document.getElementById('captcha-text').value;
        let captchaLabel = document.getElementById('captcha-status');

        if (validateCaptcha(user_captcha_value, false)===true) {            
            captchaLabel.innerText = ""
            return true;
        } else {
            captchaLabel.innerText = "invalid captcha!!!"
            return false;
        }
    }

    function formSubmit () {
        const captchaValid = validateCaptchaValue();
    }

    return (
        <>
            <section className="signup-section">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="card text-black" style={{ border: 0 }}>
                                <div className="main-div">
                                    <div className="form-div">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{color: "rgb(37, 53, 76)"}}>
                                            SIGN UP
                                        </p>
                                        <form id="signup-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                                            <div className="icons-div">
                                                <FaUserAlt className="icons" />
                                                <input
                                                    {...register("profilename", { pattern: /^[A-Za-z]+$/i }, { required:{ value: true, message: 'required' } })}
                                                    type="text"
                                                    id="profilename"
                                                    className="form-control"
                                                    placeholder="Your Name"
                                                    required
                                                />
                                            </div>
                                            <div className="icons-div">
                                                <MdEmail className="icons" />
                                                <input
                                                    {...register("email", { required: { value: true, message: 'required' } })}
                                                    type="email"
                                                    id="email"
                                                    className="form-control"
                                                    placeholder="Your Email"
                                                    required
                                                />
                                            </div>
                                            <div className="icons-div">
                                                <FaLock className="icons" />
                                                <input
                                                    {...register("password", { required: { value: true, message: 'required' } })}
                                                    type="password"
                                                    id="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    required
                                                />
                                            </div>
                                            <div className="icons-div">
                                                <FaKey className="icons" />
                                                <input
                                                    {...register("passwordRepeat", { required: { value: true, message: 'required' } })}
                                                    type="password"
                                                    id="password-repeat"
                                                    className="form-control"
                                                    placeholder="Repear Your Password"
                                                />
                                            </div>
                                            <div id="terms-checkbox">
                                                <input
                                                    {...register("termsCond", { required: { value: true, message: 'accept terms & conditions' } })}
                                                    type="checkbox"
                                                    defaultValue=""
                                                    id="terms-conditions"
                                                />
                                                <label htmlFor="form2Example3">
                                                I agree all {" "}
                                                <a href="#!" id="terms-text">Terms of service</a>
                                                </label>
                                            </div>
                                            <div id="captcha-div">
                                                <a id="reload_href"><TbReload className="reload-icon"/><div></div></a>
                                                <LoadCanvasTemplateNoReload />
                                                <div id="captcha-input-div">
                                                    <input type="text" id="captcha-text" onChange={() => {validateCaptchaValue()}} className="form-control" placeholder="Type the code!" />
                                                    <div className="input-status-div">
                                                        <label id="captcha-status"></label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4" id="register-div">
                                                <button type="button" id="register-btn" className="btn btn-primary btn-lg" onClick={() => {formSubmit()}}>
                                                Register
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        className="img-fluid"
                                        alt="Sample image"
                                        />
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}