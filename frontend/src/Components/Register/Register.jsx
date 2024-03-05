import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Register.css";

import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import register from '../Assets/register.svg'


export const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors({ ...errors, [name]: '' });
  };

  useEffect(() => {
    const validationForm = () => {
      let valid = true;
      const newErrors = {};
      //username
      if (!formData.username.trim()) {
        newErrors.username = "Username is required.";
        valid = false;
      }
      //email
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
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

  //Register
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/users/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      if (response.status >= 200 && response.status < 300) {
        console.log('Registration successful');
        navigate('/dashboard');
      } else {
        console.error('Registration Failed ');
      }
    } catch (e) {
      console.error('Error during registration', e);
    }
  }


  return (

    <div className="all">
      <div className="login-main">
        <div className="login-right">
          <div className="login-right-container">
            <div className="login-center">
              <h2>SignUp</h2>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" name="username" required value={formData.username} onChange={handleChange} />
                {errors.username && <span className="error">{errors.username}</span>}
                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <span className="error">{errors.email}</span>}
                <div className="pass-input-div">
                  <input type={showPassword ? "text" : "password"} name="password" placeholder="password" value={formData.password} onChange={handleChange} />
                  {showPassword ? <FaEyeSlash onClick={() => { setShowPassword(!showPassword) }} /> : <FaEye onClick={() => { setShowPassword(!showPassword) }} />}
                  {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <div className="registerButton">
                  <button type="button" onClick={handleRegister}>Register</button>
                </div>
              </form>
            </div>

            <p className="login-bottom-p">
              Already have an account go to <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
        <div className="login-left">
          <h3>
            Be a part of US <br />
            Signup NOW !!
          </h3>
          <img src={register} alt="login-illustration" />
        </div>
      </div >

    </div >
  );
};

export default Register;