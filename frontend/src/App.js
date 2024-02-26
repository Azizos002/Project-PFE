import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Dashboard from './Components/Dashboard/Dashboard'
import Contact from './Components/Contact/Contact'
import LoginSignup from './Components/Login/LoginSignup'
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/LoginSignup' element={<LoginSignup />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/Contact' element={<Contact />} />

      </Routes>
    </Router>
  );
}

export default App;
