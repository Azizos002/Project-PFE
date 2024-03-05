import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import menu from '../Assets/menu.png';
// import searchIcon from '../Assets/searchIcon.png'
const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  // const [searchTerm, setSearchTerm] = useState('');

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  //   console.log('Search for:', e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add your search logic here
  // };

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
            <li>
              {/* <form className="search-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button type="submit">
                  <img src={searchIcon} alt="search-icon" />
                </button>
              </form> */}
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
