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
      console.log('token ba7')
      alert('Login first');
      navigate('/login');
    }
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
