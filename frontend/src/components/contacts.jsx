import React from 'react';
import './Contacts.css'; // Import the CSS file for styling
import { FaEnvelope, FaPhoneAlt, FaLinkedin, FaGithub } from 'react-icons/fa'; // FontAwesome icons

const Contacts = () => {
  return (
    <div className="contacts-container">
      <div className="contacts-content">
        <h1 className="contacts-title">Contact Me</h1>
        <p className="contacts-intro">
          I'd love to hear from you! Whether you have a question, a comment, or just want to connect, feel free to reach out.
        </p>
        <div className="contacts-details">
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
             <a href="mailto:ysosamaitia@gmail.com">ysosamaitia@gmail.com</a>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
             <a href="tel:+1234567890">(123) 456-7890</a>
          </div>
          <div className="contact-item">
            <FaLinkedin className="contact-icon" />
            <p><a href="https://www.linkedin.com/in/-yessicasosa-" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
          </div>
          <div className="contact-item">
            <FaGithub className="contact-icon" />
            <p><a href="https://github.com/sosayessicaSE" target="_blank" rel="noopener noreferrer">GitHub Profile</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
