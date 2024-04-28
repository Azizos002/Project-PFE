import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillAlt, faPercent, faHome, faBriefcaseMedical, faUser, faEllipsisH, faPiggyBank, faMoneyCheckAlt, faExclamationCircle, faCog, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import './SideBar.css';
import logo from '../../Assets/hand.png';

const SideBar = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <li className="sidebar-header">
                    <img src={logo} alt="Smart Money Logo" className="navbar__logo" />
                    <span className='titleDashboard'>S-Money</span> <br />
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
                        Tax
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to="/Dashboard/Houssing">
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
                <li className="sidebar-item">
                    <NavLink to="/Dashboard/Debt">
                        <FontAwesomeIcon icon={faMoneyCheckAlt} className="icon" />
                        Debt
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
    );
};

export default SideBar;
