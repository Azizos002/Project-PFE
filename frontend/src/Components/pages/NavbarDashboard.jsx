import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import './NavbarDashboard.css';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavbarDashboard = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbarDash">
            <div className="navbarDashboard__left">
                <h3 className='WelcomeDash'>Welcome Back, <span className='spanTitleUsername'>{localStorage.getItem('username')}</span></h3>
            </div>
            <div className="navbarDashboard__right">
                <div className="navbarDashboard__button" onClick={toggleDropdown}>
                    <div className="profile-dropdown">
                        <FontAwesomeIcon icon={faCircleUser} className='icon-Navbar' />
                        <span className='spanUsername'>
                            {localStorage.getItem('username')}
                        </span>
                        {isDropdownOpen && (
                            <div className="dropdown-content">
                                <NavLink to="/profile">Profile</NavLink>
                                <NavLink to="/settings">Settings</NavLink>
                                <Link to="/download-extrait">Download Extrait</Link>
                                <button className='LogoutButton' onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>
                
            </div>

        </nav>
    );
};

export default NavbarDashboard;
