import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

import { FaFacebook, FaLinkedin, FaGoogle } from "react-icons/fa";
import { TbReload } from "react-icons/tb";

export default function SignUpForm () {
    
  useEffect (() => {
        const jwtToken = Cookies.get('jwt');
        if (jwtToken) {
            navigate("/");
          }

    }, []);

    const navigate = useNavigate();

    const [formdata, setFormData] = useState({
        username: "",
        fullname: "",
        mobile: "",
        email: "",
        password: "",
        confirmpassword: ""
    })

    const [errors, setErrors] = useState({})
    const [passwordStrength, setPasswordStrength] = useState({
      Minlength: false,
      "[A-Z]": false,
      "[a-z]": false,
      Specialchar: false,
      "[0-9]": false
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({...formdata, [name] : value})

        // Check password strength
        if(name === "password") {
          const password = value;
          setPasswordStrength({
              Minlength: password.length >= 8,
              "[A-Z]": /[A-Z]/.test(password),
              "[a-z]": /[a-z]/.test(password),
              Specialchar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
              "[0-9]": /\d/.test(password)
          });
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = {}

        // if(!document.getElementById("terms-conditions").checked) {
        //     validationErrors.terms = "You should agree the terms and conditions"
        // }

        // Check password strength
        const isPasswordStrong = Object.values(passwordStrength).every(value => value);
        if (!isPasswordStrong) {
            validationErrors.passwordStrength = "Password should meet the criteria.";
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0) {
            const formData = new FormData();
            formData.append('username', document.getElementById("username").value);
            formData.append('email', document.getElementById("email").value);
            formData.append('password', document.getElementById("password").value);
            formData.append('confirmpassword', document.getElementById("confirmpassword").value);

            try {
                const response = await axios.post('http://localhost:3000/api/users/register', formData, {
                    headers: {
                      'Content-Type': 'application/json', // or 'application/json' if needed
                    },
                });
                console.log(response.data.message);
                
                window.location.reload();

              } catch (error) {
                console.error('Error registering the user', error);
              }
        }

    }

  return (

    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit} className="ls-form">
        <h1 className="ls-h1">Create Account</h1>
        {/* <div className="social-container">
          <a href="#" className="social">
            <FaFacebook className="social-i" />
          </a>
          <a href="#" className="social">
            <FaGoogle className="social-i" />
          </a>
          <a href="#" className="social">
            <FaLinkedin className="social-i" />
          </a>
        </div>
        <span className="ls-span">or use your email for registration</span> */}
        <div className="social-container"></div>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          placeholder="User Name"
          className="ls-input"
        />
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          placeholder="Email"
          className="ls-input"
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          placeholder="Password"
          className="ls-input"
        />
        <div className="password-check-div">
          {Object.keys(passwordStrength).map((key) => (
              <div key={key} className={`password-strength ${passwordStrength[key] ? 'strong' : 'weak'}`}>
                  {key}
              </div>
          ))}
        </div>
        <input
          type="password"
          name="confirmpassword"
          id="confirmpassword"
          onChange={handleChange}
          placeholder="Repeat Password"
          className="ls-input"
        />
        {errors.passwordStrength && (
            <div className="password-strength-error">{errors.passwordStrength}</div>
        )}
        <button type="submit" className="ls-btn">Sign Up</button>
      </form>
    </div>
  );
}


