// NewPass.js

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaLock, FaCheck } from 'react-icons/fa';
import './NewPass.css';
import confirm from '../Assets/confirm.png';
import { useNavigate } from 'react-router-dom';

const NewPass = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters.')
                .required('Password is required!')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
                    'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
                ),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Password doesn\'t match!!')
                .required('Confirm Password is required'),
        }),
        onSubmit: (values) => {
            if (values.password === values.confirmPassword) {
                setSuccessMessage('Password Change Successufulyyy ! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                alert('Passwords do not match!');
            }
        },
    });

    const getPasswordStrength = () => {
        const password = formik.values.password;

        if (password.length === 0) {
            return 'Weak';
        }

        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSymbol = /[!@#$%^&*()_+]/.test(password);

        const strength = hasLowerCase + hasUpperCase + hasNumber + hasSymbol;

        if (strength <= 1) {
            return 'Weak';
        } else if (strength <= 2) {
            return 'Medium';
        } else if (strength <= 3) {
            return 'Strong';
        } else {
            return 'Perfect'
        }
    };

    const getPasswordStrengthColor = () => {
        const strength = getPasswordStrength();

        switch (strength) {
            case 'Weak':
                return 'weak';
            case 'Medium':
                return 'medium';
            case 'Strong':
                return 'strong';
            case 'Perfect':
                return 'perfect';
            default:
                return '';
        }
    };

    return (
        <div className="new-password-container">
            <div className="left-side">
                <div className="illustration">
                    <img src={confirm} alt="Confirm Password" />
                </div>
            </div>
            <div className="right-side">
                <div className="new-password-form">
                    <h2>New Password</h2>
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="password">
                                <FaLock />
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className={`password-input ${getPasswordStrengthColor()}`}
                                placeholder="Enter your password"
                            />
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <div className="error-message">{formik.errors.password}</div>
                        )}

                        <div className="input-group">
                            <label htmlFor="confirmPassword">
                                <FaCheck />
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                                className={`password-input ${getPasswordStrengthColor()}`}
                                placeholder="Confirm your password"
                            />
                        </div>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <div className="error-message">{formik.errors.confirmPassword}</div>
                        )}

                        <div className={`password-strength ${getPasswordStrengthColor()} ${formik.touched.password ? 'visible' : ''}`}>
                            {getPasswordStrength()}
                        </div>

                        <button type="submit" >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewPass;
