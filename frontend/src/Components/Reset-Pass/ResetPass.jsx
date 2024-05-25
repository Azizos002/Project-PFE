import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Modal from 'react-modal';
import OtpInput from 'react-otp-input';
import axios from 'axios';

import './ResetPass.css';
import './ResetOTP.css';
import './NewPass.css';

import arrow from '../Assets/left-arrow.png';
import forgot from '../Assets/forgot-pass.png';
import no from '../Assets/cancel.png';


Modal.setAppElement('#root');

const ResetPass = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleNewPassword = async (values) => {
    if  (Password === confirmPassword) {
      try {
        const response = await axios.post('http://localhost:5000/forgot/newPassword', {
          email: formik.values.email,
          confirmPassword: confirmPassword,
        });
        if (response.status === 200) {
          setIsPasswordModalOpen(false);
          navigate('/login');
          console.log("Reset Password Done...");
        }
      } catch (error) {
        console.error('Error setting new password:', error);
        setError('Failed to set new password. Please try again later.');
      }
    } else {
      alert('Password  does not match the confirmation password!');
    };

  };

  const handleOTP = async () => {
    if (otp && !isNaN(otp)) {
      try {
        const response = await axios.post('http://localhost:5000/forgot/verify-otp', {
          email: formik.values.email,
          otp: otp,
        });
        if (response.status === 200) {
          setIsModalOpen(false);
          setIsPasswordModalOpen(true);
        } else {
          setError('Invalid OTP code.');
        }
      } catch (error) {
        console.error('Error during OTP verification:', error);
        setError('Failed to verify OTP. Please try again later.');
      }
    } else {
      setError('Please enter a valid OTP code.');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/forgot/forgot-password', {
          email: values.email,
        });
        if (response.status === 200) {
          console.log('Recover email: ', values.email);
          setIsModalOpen(true);
          setError('');
        } else if (response.status === 404) {
          setError('Email not found');
        } else {
          setError('Something went wrong!');
        }

      } catch (error) {
        console.error('Error during reset password : ', error);
        setError('Failed to send reset email. Please try again later.');
      }
    },
  });

  return (
    <div className="password-reset-container">
      <div className="password-reset-form">
        <div className="leftSide">
          <div className='LinkHomeReset' onClick={() => navigate('/')}>
            <img src={arrow} alt='Back-Home' />
            <p>Go Home</p>
          </div>
          <div className="illustration">
            <img src={forgot} alt='Forgot Password' />
          </div>
        </div>

        <div className="vertical-line"></div>

        <div className="rightSide">

          <form onSubmit={formik.handleSubmit}>
            <h2>Forgot Password</h2>
            <label className='resetLabel'>Email : </label>
            <input
              type="email"
              placeholder="Enter your email"
              id='email'
              name='email'
              {...formik.getFieldProps('email')}
              className={formik.touched.email && formik.errors.email ? 'invalid' : ''}
            />
            {formik.touched.email && formik.errors.email && (
              <p className='e-message'>{formik.errors.email}</p>
            )}
            <button type="submit">Reset Password</button>

            <p className="back-to-login">
              Remember your password? <Link to="/login">Login</Link>
            </p>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>

      {/* Modal for OTP input */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="OTP Modal"
        className='custom-model'
      >
        <div>
          <button className='exit' type='button' onClick={() => setIsModalOpen(false)}>
            <img src={no} alt='exit' />
          </button>
          <h2>Enter OTP Code</h2>
          <p>Please enter your OTP code received in your email here:</p>
          <OtpInput
            inputStyle={{minWidth: '3em'}}
            required
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span> </span>}
            renderInput={(props) => <input {...props} />}
          />
          <button type='button' className='SendOTP' onClick={handleOTP}>Submit</button>
        </div>
      </Modal>

      {/* Modal for setting new password */}
      <Modal
        isOpen={isPasswordModalOpen}
        onRequestClose={() => setIsPasswordModalOpen(false)}
        contentLabel="New Password Modal"
        className='custom-model'
      >
        <div>
          <button className='exit' type='button' onClick={() => setIsPasswordModalOpen(false)}>
            <img src={no} alt='exit' />
          </button>
          <h2>Set New Password</h2>
          <div className="card-password">
            <span className="p-float-label">
            <label htmlFor="password">Password</label>
              <input
                id="password"
                type='password'
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </span>
            <span className="p-float-label">
            <label htmlFor="password">Confirm Password</label>
              <input
                type='password'
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </span>
          </div>
          <button type='button' className='NewPassword' onClick={handleNewPassword}>Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export default ResetPass;
