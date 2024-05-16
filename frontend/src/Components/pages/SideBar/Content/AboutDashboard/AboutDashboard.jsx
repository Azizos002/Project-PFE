import React from 'react'
import { NavLink } from 'react-router-dom'

import './AboutDashboard.css'
import Dashboard from '../../../../Dashboard/Dashboard'

const AboutDashboard = () => {

  const link = 'https://www.howtogeek.com/196087/how-to-add-websites-to-the-home-screen-on-any-smartphone-or-tablet/'
  const portfolio = 'https://azizos002.github.io/portfolio/'
  const HRemail = 'projet.pfe2024@hotmail.com'

  const handleContactHRManager = () => {
    window.open(`mailto:${HRemail}`);
  };

  console.log('Link:', link);
  console.log('Portfolio:', portfolio);
  console.log('HR Email:', HRemail)


  return (
    <>
      <Dashboard />
      <div className='PagesContent'>
        <div className="help-center">
          <h2 className='TitlePages' style={{ color: '#3ea76a' }}>Help Center</h2>
          <p className='descAboutDash'>Welcome to our Help Center! We're here to assist you with any questions or concerns you may have.</p>

          <div className="card-container">
            {/* Card for "What is Smart Money?" */}
            <div className="card">
              <h3>What is Smart Money?</h3>
              <p className='cardAboutP'>Our Intelligent Financial Management Application serves as a personal financial companion designed to optimize your financial resources using advanced AI technology. It analyzes spending habits, suggests automatic savings plans, informs you about financial opportunities, and features a built-in chatbot for interactive assistance.</p>
            </div>

            {/* Card for "How Do I Use Smart Money?" */}
            <div className="card">
              <h3>How Do I Use Smart Money?</h3>
              <p className='cardAboutP'>
                1- Enter your income.<br />
                2- Go through each category in the navigation, and enter your current expenses. You can ignore any line items that don't apply to you.<br />
                3- As you enter your expenses, QuickBudget will indicate if your spending in that category is above, below, or within the recommended range for your income.<br />
                4- If you'd like to adjust the min/max spending limits to your preferences, visit the <NavLink to="/settings">settings</NavLink> page.
              </p>
            </div>

            {/* Card for "Security of User Data" */}
            <div className="card">
              <h3>Security of User Data</h3>
              <p className='cardAboutP'>
                Ensuring the security and privacy of your data is our top priority. We implement a range of measures to safeguard your personal and financial information:
              </p>
              <ul className='cardAboutP'>
                <li><strong>Encryption:</strong> Your data is encrypted using industry-standard encryption protocols, both during transmission and while stored on our servers.</li>
                <li><strong>Secure Authentication:</strong> We use secure authentication methods to ensure that only authorized users can access your account.</li>
                <li><strong>Data Protection:</strong> We regularly backup and monitor our systems to prevent data loss and unauthorized access.</li>
                <li><strong>Compliance:</strong> We adhere to relevant data protection laws and regulations to ensure that your data is handled lawfully and ethically.</li>
                <li><strong>Transparency:</strong> We are transparent about our data handling practices and provide clear information about how your data is used and protected in our privacy policy.</li>
              </ul>
              <p className='cardAboutP'>
                Your trust is paramount to us, and we are committed to maintaining the highest standards of security and privacy to protect your sensitive information.
              </p>
            </div>


            {/* Card for "How to Export Data" */}
            <div className="card">
              <h3>How to Export Data</h3>
              <p className='cardAboutP'>Need to export your financial data for analysis or backup purposes? <br /> Follow me : <br /> 1- Click on your name in the button on top corner <br /> 2- Click on <strong>Export Data</strong> </p>
            </div>

            {/* Card for "Is a Mobile or Desktop App Available?" */}
            <div className="card">
              <h3>Is a Mobile or Desktop App Available?</h3>
              <p className='cardAboutP'>
                Sort of....on your desktop computer, you can turn Smart-Money into a desktop app through your browser. On your phone, you can add it to your homescreen and use it like any other app.
                <br /><br />
                <strong>Desktop:</strong> Using Google Chrome or Microsoft Edge, click the ⋮ icon in the URL bar (far right side) to install Smart-Money and use it offline.
                <br /><br />
                <strong>Android:</strong> Using Chrome, tap the ⋮ icon, then choose Add to Home Screen. Smart-Money will now be on your Home Screen, beside your other apps.
                <br /><br />
                <strong>iOS:</strong> Using Safari, tap the Share icon, then choose Add to Home Screen. Smart-Money will now be on your Home Screen, beside your other apps.
                <br /><br />
                More detailed instructions are available in <NavLink target='_blank' to={link}>this article</NavLink>.
              </p>
            </div>

            {/* Card for "Who Made This?" */}
            <div className="card">
              <h3>Who Made This?</h3>
              <p className='cardAboutP'>Smart-Money was made by <NavLink target='_blank' to={portfolio}><strong>Aziz Dhifaoui</strong></NavLink> </p>
            </div>
          </div>
            <div className="contactAbout">
              <h3 className="contactAboutTitle" >Contact HR Manager</h3>
              <p className="contactAboutP">Have questions about employment opportunities or HR-related inquiries? Please click the button below to contact our HR manager directly:</p>
              <button className="contactAboutBtn" onClick={handleContactHRManager}>Contact HR Manager</button>
            </div>
        </div>
      </div>

    </>
  )
}

export default AboutDashboard