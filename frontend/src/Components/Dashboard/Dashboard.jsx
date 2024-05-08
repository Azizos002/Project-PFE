import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Dashboard.css';
import SideBar from '../pages/SideBar/SideBar';
import NavbarDashboard from '../pages/NavbarDashboard';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('username');
      alert('Login first');
      navigate('/login');
    }

    // Event listener for network interruption
    const handleNetworkInterruption = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      alert('Network connection interrupted. Please log in again.');
      navigate('/login');
    };

    // Event listener for beforeunload
    // const handleBeforeUnload = () => {
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('username');
    // };

    // window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Cleanup: Remove event listeners
      window.removeEventListener('offline', handleNetworkInterruption);
      // window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);

  return (
    <div className='dashboard'>
      <SideBar />
      <div className='content'>
        <NavbarDashboard />
      </div>
    </div>
  );
};

export default Dashboard;