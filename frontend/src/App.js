import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Contact from './Components/Contact/Contact'
import Register from './Components/Register/Register';
import Login from './Components/Login/Login'
import Features from './Components/Features/Features';
import ResetPass from './Components/Reset-Pass/ResetPass';
import NewPass from './Components/NewPass/NewPass';
import Dashboard from './Components/Dashboard/Dashboard';
import Nav from './Components/Dashboard/Nav';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='features' element={<Features />} />
        <Route path='/ResetPass' element={<ResetPass />} />
        <Route path='/NewPass' element={<NewPass />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Nav'element={<Nav />} />
      </Routes>
    </Router>
  );
}

export default App;
