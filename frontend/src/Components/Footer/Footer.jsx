import React from "react";
import "./Footer.css";
import facebook from '../Assets/facebook.png';
import instagram from '../Assets/instagram.png';
import linkedin from '../Assets/linkedin.png';

const footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <h3>Smart Money</h3>
        <p>
          Made with <span class="heart">&#10084;</span> by Aziz Dhifaoui
        </p>
        <ul className="socials">
          <li>
            <a href="https://www.facebook.com/">
              <img src={facebook} alt="facebook-icon" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com">
              <img src={instagram} alt="Instagram-icon" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/">
              <img src={linkedin} alt="LinkedIn-icon" />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>
          copyright &copy; . All rights reserved - <a href="/">S-Money</a> -
        </p>
        <div className="footer-menu">
          <ul className="f-menu">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default footer;
