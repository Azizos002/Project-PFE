import React from "react";
import "./Footer.css";
import facebook from '../Assets/facebook.png';
import instagram from '../Assets/instagram.png';
import linkedin from '../Assets/linkedin.png';

const footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">© 2024 Smart-Money. All rights reserved.</p>
      <ul className="footer__links">
        <li className="footer__link-item">
          <a href="/about" className="footer__link">About</a>
        </li>
        <li className="footer__link-item">
          <a href="/careers" className="footer__link">Careers</a>
        </li>
        <li className="footer__link-item">
          <a href="/brand-center" className="footer__link">Brand Center</a>
        </li>
        <li className="footer__link-item">
          <a href="/blog" className="footer__link">Blog</a>
        </li>
      </ul>
      <ul className="footer__social-links">
        <li className="footer__social-link-item">
          <a href="/facebook" className="footer__social-link">
            <img src={facebook} alt="Facebook" className="footer__social-icon" />
          </a>
        </li>
        <li className="footer__social-link-item">
          <a href="/instagram" className="footer__social-link">
            <img src={instagram} alt="Instagram" className="footer__social-icon" />
          </a>
        </li>
        <li className="footer__social-link-item">
          <a href="/linkedin" className="footer__social-link">
            <img src={linkedin} alt="Linkedin" className="footer__social-icon" />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default footer;
