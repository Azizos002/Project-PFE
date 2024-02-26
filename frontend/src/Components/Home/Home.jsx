import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">

        <p>
          Let's get started
        </p>
        <Link className="App-link" to="/LoginSignup">
          Login NOW
        </Link>
      </header>
    </div>
  )
}

export default Home
