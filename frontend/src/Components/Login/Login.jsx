import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import login from '../Assets/login.svg';
import google from '../Assets/google.png';
import goBack from '../Assets/GOback.png';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const loadingToastId = toast.loading('Logging in...');
      try {
        const response = await axios.post('http://localhost:5000/login/submit', {
          email: values.email,
          password: values.password,
        });

        if (response.status === 200) {
          console.log('Login Success');
          await delay(3000);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.username);

          if (response.data.role === 'admin') {
            toast.update(loadingToastId, { render: 'Welcome Our admin!', type: 'success', isLoading: false, autoClose: 2000 });
            await delay(2000);
            navigate('/admin/DashboardAdm');
          } else {
            var username = localStorage.getItem('username')

            toast.update(loadingToastId, { render: `Welcome back ${username}! `, type: 'success', isLoading: false, autoClose: 3000 });
            await delay(3000);
            navigate('/dashboard');
          }
        } else {
          toast.update(loadingToastId, { render: 'Login Failed', type: 'error', isLoading: false, autoClose: 3000 });
        }
      } catch (error) {
        toast.update(loadingToastId, { render: 'Error during login', type: 'error', isLoading: false, autoClose: 3000 });
        console.error('Error during login: ', error);
      }
    },
  });

  const handleGoogleAuth = async () => {
    try {
      window.location.href = 'http://localhost:3000/auth/google';
    } catch (error) {
      console.error('Error during Google authentication:', error);
      toast.error('Error during Google authentication');
    }
  };

  return (
    <>
      <Navbar />
      <div className="all">
        <div className="login-main">
          <div className="login-left">
            <Link to="/" className="goBack">
              <img src={goBack} alt="GO-back" />
            </Link>
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
                      type='password'
                      name="password"
                      placeholder="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
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
                    <button type="button" className="LoginIMG" onClick={handleGoogleAuth} >
                      <img src={google} alt="Connect with GOOGLE" />
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
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Login;