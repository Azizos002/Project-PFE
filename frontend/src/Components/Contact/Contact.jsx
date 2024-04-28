import React, { useState } from 'react';
import './Contact.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error when the user starts typing again
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
      valid = false;
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
      valid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    // Validate contact number
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact Number is required';
      valid = false;
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        console.log('email sent...');
        alert('Email Sent Successfully! Thank you for your submission.');
      } else if (response.status === 404) {
        console.log("email notfound");
        alert('Email not found ! <br /> Go and create one OR check again your email');
      } else {
        console.log("Something went wrong")
      }
    } catch (error) {
      console.error('Error submitting contact form: ', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form-container">
            <h1>Get in Touch</h1>
            <input
              placeholder="First Name"
              type="text"
              className="contact-input"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}

            <input

              placeholder="Last Name"
              type="text"
              className="contact-input"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}

            <input

              placeholder="Email"
              type="email"
              className="contact-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <input

              type="tel"
              placeholder="Contact Number"
              className="contact-input"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
            {errors.contactNumber && (
              <span className="error">{errors.contactNumber}</span>
            )}

            <textarea
              rows={10}
              placeholder="Your Message"
              className="contact-input"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <span className="error">{errors.message}</span>}

            <button className="fancy" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
