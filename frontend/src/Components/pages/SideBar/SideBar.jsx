import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillAlt, faPercent, faHome, faBriefcaseMedical, faUser, faEllipsisH, faPiggyBank, faMoneyCheckAlt, faExclamationCircle, faCog, faPaperPlane, faShoppingBasket, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import './SideBar.css';
import logo from '../../Assets/hand.png';

const SideBar = () => {

    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    // const closeSidebar = () => {
    //     setShowSidebar(false);
    // };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 800) {
                setShowSidebar(true);
            } else {
                setShowSidebar(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="sidebar-container">

            {!showSidebar &&
                <button className={`SideBarToggle ${showSidebar ? 'active' : ''}`} onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={showSidebar ? faTimes : faBars} className="icon" />
                </button>}

            <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
                <ul className="sidebar-menu">
                    <li className="sidebar-header">
                        <NavLink to='/Dashboard' className='titleDashboard'>
                            <img src={logo} alt="Smart Money Logo" className="navbar__logo" />
                            <span className='titleDashboard'>S-Money</span>
                        </NavLink>
                    </li>
                    <li className="sidebar-text">
                        <p className="SideText">
                            Dashboard
                        </p>
                    </li>
                    <li className="sidebar-item">
                        <NavLink to="/Dashboard/Income">
                            <FontAwesomeIcon icon={faMoneyBillAlt} className="icon" />
                            Income
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink to="/Dashboard/Tax">
                            <FontAwesomeIcon icon={faPercent} className="icon" />
                            Tax & Debt
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink to="/Dashboard/Housing">
                            <FontAwesomeIcon icon={faHome} className="icon" />
                            Housing
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink to="/Dashboard/Medical">
                            <FontAwesomeIcon icon={faBriefcaseMedical} className="icon" />
                            Medical
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink to="/Dashboard/Clothing">
                            <FontAwesomeIcon icon={faShoppingBasket} className="icon" />
                            Clothing
                        </NavLink>
                    </li>

                    <li className="sidebar-item">
                        <NavLink to="/Dashboard/food">
                            <FontAwesomeIcon icon={faMoneyCheckAlt} className="icon" />
                            Food & Grocery
                        </NavLink>
                    </li>

                    <li className="sidebar-item">
                        <NavLink to="/Dashboard/Personal">
                            <FontAwesomeIcon icon={faUser} className="icon" />
                            Personal
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink to="/Dashboard/Others">
                            <FontAwesomeIcon icon={faEllipsisH} className="icon" />
                            Others
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink to="/Dashboard/Saving">
                            <FontAwesomeIcon icon={faPiggyBank} className="icon" />
                            Saving
                        </NavLink>
                    </li>

                    {/* Info */}
                    <li className="sidebar-text">
                        <p className="SideText">
                            Help & Support
                        </p>
                    </li>
                    <li className="sidebar-item">
                        <NavLink to="/Dashboard/Help">
                            <FontAwesomeIcon icon={faExclamationCircle} className='icon' />
                            Help & Center
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink to="/Dashboard/Settings">
                            <FontAwesomeIcon icon={faCog} className="icon" />
                            Settings
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink to="/Dashboard/Feedback">
                            <FontAwesomeIcon icon={faPaperPlane} className="icon" />
                            Send Feedback
                        </NavLink>
                    </li>
                </ul>
                <div className="footerDash">
                    Copyright © Aziz Dhifaoui
                </div>
            </div>
        </div>
    );
};

export default SideBar;