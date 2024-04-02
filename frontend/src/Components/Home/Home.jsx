import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Footer from '../Footer/Footer';
import './Home.css';
import Navbar from '../Navbar/Navbar';

import next from '../Assets/next.png'
import bg from '../Assets/rightS.svg'

const Home = () => {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 2000 } });

  return (
    <>
      <Navbar />
      <div className="a">
        <div className="home-container">
          <animated.header style={fadeIn} className="home-header">
            <h3 className='quote'>The single biggest difference between financial success and financial failure is how well you manage your money. <br />
              It's simple: to master money, you must manage money.</h3>
            <p className='author'>- T. Harv Eker -</p>
            <br />
            <p className='Intro'>
              Bienvenue sur notre Application de Gestion Financière Intelligente <span style={{fontSize:'20px', textDecoration:'underline'}}>Smart Money</span> , votre compagnon financier personnel.
              Avec une analyse intelligente des habitudes de dépenses, des fonctionnalités de planification d'épargne automatique et un chatbot interactif,
              notre application vous offre les outils nécessaires pour optimiser la gestion de vos finances.
              Découvrez une nouvelle façon de prendre le contrôle de votre avenir financier dès aujourd'hui.
            </p>
            <div className="started">
              <Link className="login-link" to="/register">
                Get Started
              </Link>
              <Link to="/register">
              <img src={next} alt='Goo' className='next' />
              </Link>
            </div>
          </animated.header>

        </div>
        <div className="rightS">
          <img src={bg} alt='Bg' className='RightBG' />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;