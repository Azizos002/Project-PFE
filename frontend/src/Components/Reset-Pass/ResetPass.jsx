import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ResetPass.css'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import Modal from 'react-modal';
import OtpInput from 'react-otp-input';


Modal.setAppElement('#root'); // Set the root element for the modal

const ResetPass = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState('');


  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: async (values) => {
      console.log('Recover email: ', values.email);
      setIsModalOpen(true);
      // Add your password reset logic here
    },
  });

  return (
    <div className="password-reset-container">
      <div className="password-reset-form">
        <h2>Forgot Password</h2>
        <form onSubmit={formik.handleSubmit}>
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
        </form>
        <p className="back-to-login">
          Remember your password? <Link to="/login">Login</Link>
        </p>
      </div>

      {/* Modal for OTP input */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="OTP Modal"
        className='custom-model'
      >
        <h2>Enter OTP Code</h2>

        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />

        {/* Optionally, you can handle OTP validation and submission */}
        <button onClick={() => setIsModalOpen(false)}>Close Modal</button>
      </Modal>
    </div>
  );
};
export default ResetPass