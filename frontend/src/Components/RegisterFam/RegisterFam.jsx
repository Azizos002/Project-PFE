import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import '../Register/Register.css'
import './RegisterFam.css'
import register from '../Assets/register.svg';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import goBack from '../Assets/GOback2.png';


const RegisterFam = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(2);

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
    if (buttonNumber === 1) {
      navigate('/register');
    }
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      username: "",
      email: "",
      password: "",
      repeatPass: "",
    },
    validationSchema: Yup.object({
      id: Yup.string().required("ID is required."),
      username: Yup.string().required("Full name is required").max(50, "Must be 50 characters or less"),
      email: Yup.string().email("Invalid email address").required("Email is required."),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required."),
      repeatPass: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required."),
    }),
    onSubmit: async (values) => {
      try {
        if (!(values.password === values.repeatPass)) {
          alert('Password does not match the confirmation password');
        }
        const response = await axios.post('http://localhost:5000/userfam/registerFam', {
          id: values.id,
          username: values.username,
          email: values.email,
          password: values.password,
        });

        if (response.status >= 200 && response.status < 300) {
          console.log('Registration successful');
          alert('Registration successful');
          navigate('/login');
        } else {
          console.error('Registration Failed');
        }
      } catch (e) {
        console.error('Error during registration', e);
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
                  <div className="starloul">
                    <div className="idid">
                      <input type="text" placeholder="Id" name="id" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.id} />
                      {formik.touched.Id && formik.errors.Id && <span className="error">{formik.errors.Id}</span>}
                    </div>
                    <div className="idid">
                      <input type="text" placeholder="Full Name" name="username" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} />
                      {formik.touched.fullname && formik.errors.fullname && <span className="error">{formik.errors.fullname}</span>}
                    </div>
                  </div>
                  <input type="email" placeholder="Email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                  {formik.touched.email && formik.errors.email && <span className="error">{formik.errors.email}</span>}
                  <div className="starloul">
                    <div className="idid">
                      <input type="password" name="password" placeholder="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                      {formik.touched.password && formik.errors.password && <span className="error">{formik.errors.password}</span>}
                    </div>
                    <div className="idid">
                      <input type="password" name="repeatPass" placeholder="Repeat your password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.repeatPass} />
                      {formik.touched.repeatPass && formik.errors.repeatPass && <span className="error" >{formik.errors.repeatPass}</span>}
                    </div>
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
            <Link to="/" className="goBack">
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

export default RegisterFam;
