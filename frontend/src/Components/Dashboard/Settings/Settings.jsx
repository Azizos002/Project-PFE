import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    tax: 10,
    housing: 20,
    medical: 10,
    clothing: 5,
    food: 20,
    personal: 10,
    others: 15,
    saving: 10,
  });

  useEffect(() => {
    // Fetch the existing settings from the backend when the component mounts
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/settings', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          setSettings(response.data);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/settings', settings, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        alert('Settings updated successfully');
      } else {
        console.error('Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <>
      <div className="settings-container">
        <h2>Expense Category Limits</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(settings).map((category) => (
            <div className="settings-field" key={category}>
              <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)} (%):</label>
              <input
                type="number"
                id={category}
                name={category}
                value={settings[category]}
                onChange={handleChange}
              />
            </div>
          ))}
          <button type="submit">Save Settings</button>
        </form>
      </div>
    </>
  );
};

export default Settings;
