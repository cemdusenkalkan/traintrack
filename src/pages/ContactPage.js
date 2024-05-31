import React, { useState } from 'react';
import '../ContactPage.css';
import phoneImage from '../img/phone.png';
import mailImage from '../img/mail.png';


const ContactPage = () => {
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contactPerson, email, message);
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-info">
          <h2>Contact us</h2>
          <div className="info-item">
          <img src={phoneImage} alt="Phone" />
            <p>+90 538 543 86 10</p>
          </div>
          <div className="info-item">
            <img src={mailImage} alt="Mail" />
            <p>info@tarintrack.com</p>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send us a message</h2>
          <input
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            placeholder="Contact person*"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email*"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send us a message*"
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;