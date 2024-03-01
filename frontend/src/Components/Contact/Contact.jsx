import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-container">
          <h1>Get  in Touch</h1>
          <input
            required
            placeholder="First Name"
            type="text"
            className="form-input"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />


          <input
            required
            placeholder="Last Name"
            type="text"
            className="form-input"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />

          <input
            required
            placeholder="email"
            type="email"
            className="form-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            required
            type="tel"
            placeholder="contact number"
            className="form-input"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />

          <textarea
            required
            rows={5}
            placeholder="Your Message"
            className="form-input"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />

          <button type="button" className="fancy" onClick={handleSubmit}>send</button>

        </form>
      </div>
    </>
  )
}

export default Contact