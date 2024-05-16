import React from 'react';
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
import RegisterFam from './Components/RegisterFam/RegisterFam';
import NavbarDashboard from './Components/pages/NavbarDashboard';
import SideBar from './Components/pages/SideBar/SideBar';
import Income from './Components/pages/SideBar/Content/Income/Income';
import Tax from './Components/pages/SideBar/Content/Tax/Tax';
import Housing from './Components/pages/SideBar/Content/Housing/Housing';
import Medical from './Components/pages/SideBar/Content/Medical/Medical';
import Personal from './Components/pages/SideBar/Content/Personal/Personal';
import Others from './Components/pages/SideBar/Content/Others/Others';
import Clothing from './Components/pages/SideBar/Content/Clothing/Clothing';
import Food from './Components/pages/SideBar/Content/Food/Food';
import Saving from './Components/pages/SideBar/Content/Saving/Saving';
import AboutDashboard from './Components/pages/SideBar/Content/AboutDashboard/AboutDashboard';
import Statistics from './Components/Dashboard/Statistics'
import Profile from './Components/Profile/Profile';
import Settings from './Components/Dashboard/Settings/Settings';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/registerFam' element={<RegisterFam />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='features' element={<Features />} />
          <Route path='/ResetPass' element={<ResetPass />} />
          <Route path='/NewPass' element={<NewPass />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/NavbarDashboard' element={<NavbarDashboard />} />
          <Route path='/SideBar' element={<SideBar />} />
          <Route path='/Dashboard/Income' element={<Income />} />
          <Route path='/Dashboard/Tax' element={<Tax />} />
          <Route path='/Dashboard/Housing' element={<Housing />} />
          <Route path='/Dashboard/Medical' element={<Medical />} />
          <Route path='/Dashboard/Personal' element={<Personal />} />
          <Route path='/Dashboard/Others' element={<Others />} />
          <Route path='/Dashboard/Clothing' element={<Clothing />} />
          <Route path='/Dashboard/Food' element={<Food />} />
          <Route path='/Dashboard/Saving' element={<Saving />} />
          <Route path='/Dashboard/help' element={<AboutDashboard />} />
          <Route path='/Statistics' element={<Statistics />} />
          <Route path='/profile' element={<Profile /> } />
          <Route path='/Dashboard/Settings' element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
