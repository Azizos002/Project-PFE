/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

import './Home.css';
import './bSection.css';
import './cSection.css';
import './dSection.css';
import './eSection.css';

import next from '../Assets/next.png';
import bg from '../Assets/rightS.svg';
import growth from '../Assets/growth.png';
import aboutImg from '../Assets/about-illustration.png'
import serviceImage1 from '../Assets/icon-user.png';
import serviceImage2 from '../Assets/icon-mana.png';
import serviceImage3 from '../Assets/icon-perso.png';
import image from '../Assets/default.png';
import msg from '../Assets/conversation.png'

const ServiceCard = ({ title, description, image }) => {
  const [showDescription, setShowDescription] = React.useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="service-card">
      <img src={image} alt="Service Image" className="service-image" />
      <div className="card-content">
        <h2 className='card-title'>{title}</h2>
        {showDescription && <p className="description">{description}</p>}
      </div>
      <button className='card-button' onClick={toggleDescription}>Learn More</button>
    </div>
  );
};

const Home = () => {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 2000 } });

  const services = [
    { title: 'Multi-Users', description: 'We have a simple user and we offered the possibility of a family user.', image: serviceImage1 },
    { title: 'Money Management', description: 'Each user what ever his type can manage his money easily we offered a dashboard with a possibility of a graphic vision with details.', image: serviceImage2 },
    { title: 'Account Personalisation', description: 'S-Money offered the full controle of the accounts for all her users .', image: serviceImage3 },
  ];










  return (
    <>
      <Navbar />
      <div className="a">
        <div className="home-container">
          <animated.header style={fadeIn} className="home-header">
            <h3 className="quote">
              The single biggest difference between financial success and financial failure is how well you manage
              your money. <br />
              It's simple: to master money, you must manage money.
            </h3>
            <p className="author">- T. Harv Eker -</p>
            <br />
            {/* <p className="Intro">
              Bienvenue sur notre Application de Gestion Financière Intelligente{' '}
              <span style={{ fontSize: '20px', textDecoration: 'underline' }}>Smart Money</span> , votre compagnon
              financier personnel. Avec une analyse intelligente des habitudes de dépenses, des fonctionnalités de
              planification d'épargne automatique et un chatbot interactif, notre application vous offre les outils
              nécessaires pour optimiser la gestion de vos finances. Découvrez une nouvelle façon de prendre le contrôle
              de votre avenir financier dès aujourd'hui.
            </p> */}
            <div className="started">
              <Link className="login-link" to="/register">
                Get Started
              </Link>
              <Link to="/register">
                <img src={next} alt="Goo" className="next" />
              </Link>
            </div>
          </animated.header>
        </div>
        <div className="rightS">
          <img src={bg} alt="Bg" className="RightBG" />
        </div>
      </div>


      <div className="b">
        <h1 className="b-Header">
          Financial <span className="growth"><img src={growth} alt="Growth-Icon" /></span> Freedom with{' '}
          <span className="b-tag">S-Money</span>
        </h1>
        <p className="b-Paragh">
          Our offerings are tailored to meet the unique needs and challenges of each user, <br /> and are designed to
          provied the funding and support necessary to help businesses reach their full potential.
        </p>
        <div className="service-cards-container">
          {services.map((service, index) => (
            <ServiceCard key={index} title={service.title} description={service.description} image={service.image} />
          ))}
        </div>
      </div>


      <div className="c">
        <h1 className='aboutHeader'>ABOUT <span style={{ color: '#3ea76a' }}>US</span></h1>
        <div className="aboutSection">
          <div className="rightAbout">
            <img src={aboutImg} alt='about illustration' className='aboutImg' />
          </div>
          <div className="leftAbout">
            <div className="Intro">
              <h3 className='headerIntro'><span style={{ color: '#3ea76a' }}>Let</span> tommorow <span style={{ color: '#3ea76a' }}>begin</span> today</h3>
              <p className="aboutIntro">
                Our Intelligent Financial Management Application serves as a personal financial companion designed to optimize your financial resources using advanced AI technology.
                It analyzes spending habits, suggests automatic savings plans, informs you about financial opportunities, and features a built-in chatbot for interactive assistance.
              </p>
            </div>
            <div className="contentAbout">
              <h4 className='servicesAbout'>Our Mission</h4>
              <p className="serviceDescription">
                We are committed to helping individuals and families regain control of their finances through our intuitive and easy-to-use web app.
                Our main goal is to provide you with a secure and seamless platform to manage your expenses, set budgets, and achieve your financial goals.
              </p>
              <h4 className='servicesAbout'>Our Vision</h4>
              <p className="serviceDescription">
                To become a leading financial management platform that leverages cutting-edge technology to revolutionize the way people manage, save, and invest their money, setting new standards for financial intelligence and personal financial growth.              </p>
              <h4 className='servicesAbout'>Our Services</h4>
              <p className="serviceDescription">
                <span className="ulServices">
                  - Expense Tracking and Categorization. <br />
                  - Budget tools & Alerts. <br />
                  - Debt management & repayment Planing. <br />
                  - Investment monitoring & Analysis. <br />
                  - Secure & Encrypted data storage.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="d">
        <h3 className='whyHeader'>Why to choose us</h3>
      </div> */}


      <div className="e">
        <div className="eContainer">
          <div className="contactSection">
            <h2 className="contactQ">Any questions about <span style={{color:'#3ea76a', fontWeight:'1000'}}>S-Money</span> ?</h2>

            <div className="contactLabel">
              <Link to="/contact">
                <img src={msg} alt="Contact-Icon" />
              </Link>
              <Link to="/contact" className='LinkContact'>
                <p className='contactH'>Contact Us</p>
              </Link>
            </div>



          </div>
        </div>
      </div>


      <Footer />
    </>
  );
};

export default Home;
