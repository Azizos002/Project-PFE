import React, { useState } from 'react';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [showNotification , setShowNotification] = useState(false);

    const navigate = useNavigate();


    const handleForgetPassword = () => {
        setShowPopup(true);
    }

    const handlePopupClose = () => {
        setShowPopup(false);
        setShowNotification(false);
    }
    const handlePopupEmailChange = (e) => {
        setResetEmail(e.target.value);
    }

    const handleSendChange = (e) => {
        console.log("Send reset Email to : ", { resetEmail });
        setResetEmail('');
        handlePopupClose();
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        },2000);
    }



    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // handleRegister(e);
    }
    // Send register data to backend
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/users/register', {
                username,
                email,
                password,
            });
            if (response.status >= 200 && response.status < 300) {
                console.log('Registration successful');
            } else {
                console.error('Registration Failed ');
            }
        } catch (e) {
            console.error('Error during registration', e);
        }
    }
    
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/auth/login',{
                email,
                password,
            });
            if (response.status === 200) {
                console.log('Login Succeesss');
                navigate('/dashboard');
            } else {
                console.log('Login Failed');
            }
        } catch (e) {
            console.error('Error during Login  ',e);
        }
    }



    return (
        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div className="signup">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="chk" aria-hidden="true">Login</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleEmailChange}
                        className='loginInput'
                        required
                    />
                    <input
                        type="password"
                        name="pswd"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        className='loginInput'
                        required
                    />
                    <p className='PLogin' onClick={handleForgetPassword}>Forget Password ?</p>
                    <button className="login-button" onClick={handleLogin}>Login</button>
                    <br />
                    
                </form>
                {showPopup && (
                    <div className="popup">
                        <button className='close' onClick={handlePopupClose}>Close</button>
                        <input
                            type='email'
                            placeholder='Enter your Email'
                            onChange={handlePopupEmailChange}
                            value={resetEmail}
                            className='loginInput'
                            required
                        />
                        <button onClick={handleSendChange}>Send</button>
                    </div>
                )}
                {showNotification && (
                    <div className="notification">
                        Email sent! Check your inbox.
                    </div>
                )}
            </div>

            <div className="login">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="chk" aria-hidden="true">Sign Up</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="User name"
                        onChange={handleUsernameChange}
                        className='loginInput'
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleEmailChange}
                        className='loginInput'
                        required
                    />
                    <input
                        type="password"
                        name="pswd"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        className='loginInput'
                        required
                    />

                    <button onClick={handleRegister} className='login-button'>Register</button>


                </form>
            </div>
        </div>
    )
}

export default LoginSignup