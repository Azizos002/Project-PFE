import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Home.css';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 } });
  const slideInLeft = useSpring({
    transform: loading ? 'translateX(-100%)' : 'translateX(0)',
    config: { duration: 500 },
  });

  useEffect(() => {
    // Simulate data fetching delay
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-container">
        <animated.header style={fadeIn} className="home-header">
          <h1>Welcome to Your Intelligent Financial Management Companion</h1>
          <p>Empowering you to make smart financial decisions effortlessly.</p> 
          <Link className="login-link" to="/login">
            Login Now
          </Link>
        </animated.header>
        <animated.section style={slideInLeft} className="features-section">
          <h2>Key Features</h2>
          <ul>
            <li>Intelligent Financial Overview</li>
            <li>Graphical Reports and Charts</li>
            <li>Transaction Management</li>
            <li>Budget Creation and Tracking</li>
            <li>Bill Payments</li>
            {/* Add more features based on your preference */}
          </ul>
        </animated.section>
      </div>
      <Footer />
    </>
  );
};

export default Home;