import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Highcharts from 'highcharts';
import variablePie from 'highcharts/modules/variable-pie'; // Import the variable pie module

import './Dashboard.css';
import SideBar from '../pages/SideBar/SideBar';
import NavbarDashboard from '../pages/NavbarDashboard';

// Initialize the variable pie module
variablePie(Highcharts);

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

    // Add event listener for network interruption
    window.addEventListener('offline', handleNetworkInterruption);

    return () => {
      // Cleanup: Remove event listener
      window.removeEventListener('offline', handleNetworkInterruption);
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
