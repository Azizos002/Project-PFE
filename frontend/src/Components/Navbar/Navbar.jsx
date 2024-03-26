import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import menu from '../Assets/menu.png';
import user from '../Assets/user.png';
import searchIcon from '../Assets/searchIcon.png'
const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);


  const handleShowNavbar = () => {
    setShowNavbar((prevShowNavbar) => !prevShowNavbar);
  };

  return (
    <nav className='navbar'>

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
              <NavLink to="/Search">
                <img src={searchIcon} alt='search' className='search-icon' />
              </NavLink>
            </li>
            <li>
              <NavLink to="/Login" className="Nav-Login-button">
                <img src={user} alt='user-icon' className='iconUsr' />
                LOGIN
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <img src={menu} alt='menu-icon' />
        </div>
    </nav>
  );
};

export default Navbar;
