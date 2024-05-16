import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

import './NavbarDashboard.css';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
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

    const handleExportData = async () => {
        try {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            // Make a request to your backend to trigger CSV file creation and download
            const response = await axios.get('http://localhost:5000/api/export/exportCSV', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const blob = new Blob([response.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${username}_data.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Export data error:', error);
            // Handle error if export fails
        }
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
                                <NavLink>
                                    <button onClick={handleExportData} className='ExportData'>Export Data</button>
                                </NavLink>
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
