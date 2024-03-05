import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar';

const Home = () => {
  return (
    <>
    <Navbar />
        <div className="App">
      <header className="App-header">

        <p>
          Let's get started
        </p>
        <Link className="App-link" to="/login">
          Login NOW
        </Link>
      </header>
    </div>
    <Footer />
    </>
  )
}

export default Home
