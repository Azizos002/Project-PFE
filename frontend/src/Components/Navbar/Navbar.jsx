import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

import './Navbar.css';

import logo from '../Assets/hand.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <img src={logo} alt="Smart Money Logo" className="navbar__logo" />
        <span className="navbar__title">S-Money</span>
      </div>
      <div className={`navbar__middle ${isOpen ? 'active' : ''}`}>
        <ul className={`navbar__list ${isOpen ? 'active' : ''}`}>
          <li className="navbar__item">
            <NavLink to="/" className="navbar__link navbar__active">Home</NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/about" className="navbar__link navbar__active">About</NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/features" className="navbar__link navbar__active">Features</NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/contact" className="navbar__link navbar__active">Contact</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar__right">
        <button className="navbar__button">Login</button>
      </div>
      <div className="toggleNavbar" onClick={toggleNavbar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
