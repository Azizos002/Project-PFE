import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";

import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import facebook from '../Assets/facebook.png'
import login from '../Assets/login.svg'
import google from '../Assets/google.png'
import github from '../Assets/github.png'
import goBack from '../Assets/GOback.png'

export const Dashboard = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  //form validation
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validationForm = () => {
      let valid = true;
      const newErrors = {};
      //email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email address';
        valid = false;
      }
      //password
      if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
        valid = false;
      }
      setErrors(newErrors);
      return valid;
    };
    validationForm();
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.key(errors).length === 0 && errors.constructor === Object) {
      console.log('login data submited', formData);
    } else {
      console.log('Faileddd');
    }
  }

  //Login 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      if (response.status === 200) {
        console.log('login Success');
        navigate('/contact');
      } else {
        console.log('Login Failed');
      }
    } catch (error) {
      console.error('Error during login :  ', error);
    }
  }


  return (
    <div className="all">
      <div className="login-main">
        <div className="login-left">
          <Link to='/' className="goBack">
            <img src={goBack} alt="GO-back" />
          </Link>
          <h3>Hi there, Welcome to <br />
            Smart-Money
          </h3>
          <img src={login} alt="classrom" />
        </div>
        <div className="login-right">
          <div className="login-r-container">
            <div className="login-center">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                {errors.email && <span className="error">{errors.email}</span>}
                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                <div className="pass-input-div">
                  {errors.password && <span className="error">{errors.password}</span>}
                  <input type={showPassword ? "text" : "password"} name="password" placeholder="password" value={formData.password} onChange={handleChange} />
                  {showPassword ? <FaEyeSlash onClick={() => { setShowPassword(!showPassword) }} /> : <FaEye onClick={() => { setShowPassword(!showPassword) }} />}

                </div>

                <div className="login-center-options">
                  <Link to="/password-reset" className="forgot-pass-link">
                    forget password ?
                  </Link>
                </div>
                <div className="login-center-buttons">
                  <button type="button" onClick={handleLogin}>Log In</button>
                  <button type="button" className="LoginIMG">
                    <Link to="https://www.facebook.com/"><img src={facebook} alt="Connect with FACEBOOK" /></Link>
                    <Link to="https://www.google.com/"><img src={google} alt="Connect with GOOGLE" /></Link>
                    <Link to="https://github.com/"><img src={github} alt="Connect with GITHUB" /></Link>
                  </button>
                </div>
              </form>
            </div>

            <p className="login-bottom-p">
              Don't have an account ! <br /><Link to="/register">SingUp</Link> NOW
            </p>
          </div>
        </div>
      </div >
    </div >
  );
};

export default Dashboard;