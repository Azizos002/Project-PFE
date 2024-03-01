import React from 'react'
import './About.css'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

const About = () => {
  return (
    <>
    <Navbar />
    <div className="about-page">
      <h1 className="about-title">About Smart Money Management</h1>
      <p className="about-intro">Welcome to our about page! Here, we'll provide you with some information about our smart web application for money management, our team, and our mission.</p>
      <section className="about-mission">
        <h2 className="mission-title">Our Mission</h2>
        <p className="mission-text">Our mission is to help individuals and families take control of their finances with our easy-to-use and intuitive web application. We strive to provide a seamless and secure platform for managing and tracking expenses, budgeting, and achieving financial goals.</p>
      </section>
      <section className="about-team">
        <h2 className="team-title">Our Team</h2>
        <p className="team-text">Our team consists of highly skilled professionals with expertise in web development, finance, and user experience design. Together, we work tirelessly to ensure that our smart money management application is not only functional but also user-friendly and accessible to all.</p>
      </section>
      <section className="about-products">
        <h2 className="products-title">Our Products</h2>
        <p className="products-intro">Our smart money management application offers a wide range of features, including:</p>
        <ul className="products-list">
          <li className="product-item">Expense tracking and categorization</li>
          <li className="product-item">Budgeting tools and alerts</li>
          <li className="product-item">Debt management and repayment planning</li>
          <li className="product-item">Investment tracking and analysis</li>
          <li className="product-item">Secure and encrypted data storage</li>
        </ul>
        <p className="products-text">Our application is designed to be customizable and flexible, allowing users to tailor their experience to their specific financial needs and goals. If you're interested in learning more about our smart money management application, feel free to explore our website or contact us directly.</p>
      </section>
    </div>
    <Footer />
    </>
  )
}

export default About