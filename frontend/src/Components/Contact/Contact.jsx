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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/contact/submit', {
        method: 'POST',
        headers: {
          'content-type' : 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result)
    } catch (error) {
      console.error('Error submitting contact form : ',error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-container">
          <h1>Get in Touch</h1>
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