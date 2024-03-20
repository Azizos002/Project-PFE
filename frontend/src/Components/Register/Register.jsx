import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import register from '../Assets/register.svg';
import './Register.css'

const Register = () => {
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = React.useState(false);

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
    <div className="all">
      <div className="login-main">
        <div className="login-right">
          <div className="login-right-container">
            <div className="login-center">
              <h2>SignUp</h2>
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
                  <button type="submit">Register</button>
                </div>
              </form>
            </div>

            <p className="login-bottom-p">
              Already have an account? Go to <Link to="/login">Login</Link>
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
      </div>
    </div>
  );
};

export default Register;
