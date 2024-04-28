import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import register from '../Assets/register.svg';
import './Register.css'
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import goBack from '../Assets/GOback.png';


const Register = () => {
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = React.useState(false);
  const [activeButton, setActiveButton] = useState(1); // State to track active button

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
    if (buttonNumber === 2) {
      navigate('/registerFam');
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required."),
      email: Yup.string().email("Invalid email address").required("Email is required."),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required."),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/users/register', {
          username: values.username,
          email: values.email,
          password: values.password,
        });

        if (response.status === 200 ) {
          console.log('Registration successful');
          alert('Registration successful');
          navigate('/login');
        }

        else if (response.status === 409) {
          alert('User already exists <br />  change the Username OR Email' );
        }

        else {
          console.error('Registration Failed');
        }
      } catch (e) {
        console.error('Error during registration ', e);
      }
    },
  });

  return (
    <>
      <Navbar />
      <div className="all">
        <div className="login-main">
          <div className="login-right">
            <div className="login-right-container">
              <div className="login-center">
                <h2>SignUp</h2>

                <div className="buttons-container">
                  <button
                    className={`BUtype ${activeButton === 1 ? 'active' : ''}`}
                    onClick={() => handleButtonClick(1)}
                  >
                    Personal Account
                  </button>
                  <button
                    className={`BUtype ${activeButton === 2 ? 'active' : ''}`}
                    onClick={() => handleButtonClick(2)}
                  >
                    Family Account
                  </button>
                </div>

                <form onSubmit={formik.handleSubmit}>
                  <input type="text" placeholder="username" name="username" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} />
                  {formik.touched.username && formik.errors.username && <span className="error">{formik.errors.username}</span>}
                  <input type="email" placeholder="Email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                  {formik.touched.email && formik.errors.email && <span className="error">{formik.errors.email}</span>}
                  <div className="pass-input-div">
                    <input type="password" name="password" placeholder="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                    {/* type={showPassword ? "text" : "password"} */}
                    {/* {showPassword ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} /> : <FaEye onClick={() => setShowPassword(!showPassword)} />} */}
                    {formik.touched.password && formik.errors.password && <span className="error">{formik.errors.password}</span>}
                  </div>

                  <div className="registerButton">
                    <button type="submit">Create Account</button>
                  </div>
                </form>
              </div>

              <p className="login-bottom-p">
                Already have an account? Go to <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
          <div className="login-left">
            <Link to="/login" className="goBack">
              <img src={goBack} alt="GO-back" />
            </Link>
            <h3>
              Be a part of US
            </h3>
            <h4>
              Signup NOW !!
            </h4>
            <br />
            <img src={register} alt="login-illustration" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;