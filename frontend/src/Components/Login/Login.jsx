import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './Login.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import facebook from '../Assets/facebook.png';
import login from '../Assets/login.svg';
import google from '../Assets/google.png';
import github from '../Assets/github.png';
import goBack from '../Assets/GOback.png';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/auth/login', {
          email: values.email,
          password: values.password,
        });
        if (response.status === 200) {
          console.log('Login Success');
          alert('Login Success');
          navigate('/Dashboard');
        } else {
          console.log('Login Failed');
        }
      } catch (error) {
        console.error('Error during login: ', error);
      }
    },
  });

  return (
    <div className="all">
      <div className="login-main">
        <div className="login-left">
          <Link to="/" className="goBack">
            <img src={goBack} alt="GO-back" />
          </Link>
          <h3>
            Hi there, Welcome to <br />
            Smart-Money
          </h3>
          <img src={login} alt="login-illustration" />
        </div>
        <div className="login-right">
          <div className="login-r-container">
            <div className="login-center">
              <h2>Login</h2>
              <form onSubmit={formik.handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="error">{formik.errors.email}</span>
                )}

                <div className="pass-input-div">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    typeof='password'
                    name="password"
                    placeholder="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {showPassword ? (
                    <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                    <FaEye onClick={() => setShowPassword(!showPassword)} />
                  )}
                  {formik.touched.password && formik.errors.password && (
                    <span className="error">{formik.errors.password}</span>
                  )}
                </div>

                <div className="login-center-options">
                  <Link to="/ResetPass" className="forgot-pass-link">
                    forget password ?
                  </Link>
                </div>
                <div className="login-center-buttons">
                  <button className='loginButton' type="submit">LOGIN</button>
                  <button type="button" className="LoginIMG">
                    <Link to="https://www.facebook.com/">
                      <img src={facebook} alt="Connect with FACEBOOK" />
                    </Link>
                    <Link to="https://www.google.com/">
                      <img src={google} alt="Connect with GOOGLE" />
                    </Link>
                    <Link to="https://github.com/">
                      <img src={github} alt="Connect with GITHUB" />
                    </Link>
                  </button>
                </div>
              </form>
            </div>

            <p className="login-bottom-p">
              Don't have an account ! <br />
              <Link to="/register">SignUp</Link> NOW
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
