import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../ContactPage.css';
import phoneImage from '../img/phone.png';
import mailImage from '../img/mail.png';
import backgroundImage from '../img/BackgroundContactPage.jpg';

const ContactPage = () => {
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      contact_person: contactPerson,
      email,
      message,
    };

    emailjs.send('service_uxv0k0w', 'template_ddxg7du', templateParams, 'hTsaHX1UwXobCY4Qu')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatusMessage('Message sent successfully!');
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setStatusMessage('Failed to send message.');
      });

    setContactPerson('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="page" style={{
      background: `url(${backgroundImage}) no-repeat center center fixed`,
      backgroundSize: 'cover'
    }}>
      <div className="contact-container">
        <div className="contact-content row">
          <div className='col-md-6'>
            <div className="contact-info m-2">
              <h2>Contact us</h2>

              <div className='info-item' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={phoneImage} alt="Phone" />
                <span>+90 538 543 86 10</span>
              </div>

              <div className='info-item' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={mailImage} alt="Mail" />
                <span>trainntrackk@gmail.com</span>
              </div>
            </div>
          </div>
          <div className='col-md-6'>

            <form className="contact-form m-2 mb-4" onSubmit={handleSubmit}>
              <h2>Send us a message</h2>
              {statusMessage && <p>{statusMessage}</p>}
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
      </div>
    </div>
  );
};

export default ContactPage;
