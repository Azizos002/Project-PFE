import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import menu from '../Assets/menu.png';
// import searchIcon from '../Assets/searchIcon.png'
const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);


  const handleShowNavbar = () => {
    setShowNavbar((prevShowNavbar) => !prevShowNavbar);
  };

  return (
    <nav className='navbar'>
      <div className="container">
        {/* <div className="logo">
          <img src={logo} alt='logo' />
        </div> */}

        <div className="menu-icon" onClick={handleShowNavbar}>
          <img src={menu} alt='menu-icon' />
        </div>
        <div className={`nav-elements ${showNavbar && 'active'}`}>
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
              <NavLink to="/Features">Features</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="nav-right">
        <NavLink to="/Login" className="Nav-Login-button">LOGIN</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
