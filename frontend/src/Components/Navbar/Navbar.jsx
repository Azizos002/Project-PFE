import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'
import './Navbar.css'
import menu from '../Assets/menu.png';
import logo from '../Assets/logo-icon.png';

const Navbar = () => {
  const [showNavbar , setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  }
  return (
    <div>
        <nav className='navbar'>
          <div className="container">
            <div className="logo">
              <img src={logo} alt='logo' />
            </div>
            <div className="menu-icon" onClick={handleShowNavbar}>
              <img src={menu} alt='menu-icon' />
            </div>
            <div className={`nav-elements  ${showNavbar && 'active'}`}>
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/About">About</NavLink>
                </li>
                <li>
                  <NavLink to="/Contact">Contact</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav-right">
            <NavLink to="/LoginSignup" className="Nav-Login-button">Log In</NavLink>
          </div>
        </nav>
    </div>
  )
}

export default Navbar
