import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import register from '../Assets/register.svg';
import './Register.css';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import goBack from '../Assets/GOback.png';

const Register = () => {
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      telephone: "",
      adresse: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required."),
      email: Yup.string().email("Invalid email address").required("Email is required."),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required."),
      telephone: Yup.string().required("Telephone is required."),
      adresse: Yup.string().required("Address is required."),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/users/register', {
          username: values.username,
          email: values.email,
          password: values.password,
          telephone: values.telephone,
          adresse: values.adresse,
        });

        if (response.status === 200) {
          console.log('Registration successful');
          alert('Registration successful');
          navigate('/login');
        } else if (response.status === 409) {
          alert('User already exists. Change the Username or Email.');
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

                <form onSubmit={formik.handleSubmit}>
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    aria-label="Username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <span className="error">{formik.errors.username}</span>
                  )}

                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    aria-label="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <span className="error">{formik.errors.email}</span>
                  )}

                  <input
                    className="telephone-adresse-row"
                    type="text"
                    placeholder="Telephone"
                    name="telephone"
                    aria-label="Telephone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.telephone}
                  />
                  {formik.touched.telephone && formik.errors.telephone && (
                    <span className="error">{formik.errors.telephone}</span>
                  )}

                  <input
                    className="telephone-adresse-row"
                    type="text"
                    placeholder="Address"
                    name="adresse"
                    aria-label="Address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.adresse}
                  />
                  {formik.touched.adresse && formik.errors.adresse && (
                    <span className="error">{formik.errors.adresse}</span>
                  )}

                  <div className="pass-input-div">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      aria-label="Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <span className="error">{formik.errors.password}</span>
                    )}
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
              <img src={goBack} alt="Go back" />
            </Link>
            <h3>Be a part of US</h3>
            <h4>Signup NOW !!</h4>
            <br />
            <img src={register} alt="Login illustration" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;