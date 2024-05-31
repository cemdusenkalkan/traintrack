import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../TrainSearchPage.css';
import '../css/form.css';
import backgroundImage from '../img/BackgroundTicketInquiry.jpg';

function TrainSearchPage() {
  const [ticketNumber, setTicketNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const Tickets = [
    {
      ticketId: 20191701017,
      ticketOwner: 'Köksal',
      ticketDate: '26.01.2024',
      ticketFrom: 'Antalya',
      ticketTo: 'Samsun',
      ticketTime: '16.00',

    },
    {
      ticketId: 20191701018,
      ticketOwner: 'Düşenkalkan',
      ticketDate: '15.05.2024',
      ticketFrom: 'Antalya',
      ticketTo: 'İstanbul',
      ticketTime: '16.30',
    },
    {
      ticketId: 20191701019,
      ticketOwner: 'Çanga',
      ticketDate: '10.09.2024',
      ticketFrom: 'İstanbul',
      ticketTo: 'Samsun',
      ticketTime: '14.00',
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ticketNumber || !lastName) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');

    const ticket = Tickets.find(t => t.ticketId === parseInt(ticketNumber, 10) && t.ticketOwner === lastName);
    if (!ticket) {
      setError('No ticket found with the provided details.');
      return;
    }

    navigate('/ticket-result', { state: ticket });
  };

  return (
    <div className="page" style={{
      background: `url(${backgroundImage}) no-repeat center center fixed`,
      backgroundSize: 'cover'
    }}>
      <div className="form-container">
        <h1>Ticket Inquiry</h1>
        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error-message">{error}</div>}
          <div className="input-group">
            <label htmlFor="ticketNumber">Ticket Number:</label>
            <input
              type="text"
              id="ticketNumber"
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value)}
              placeholder="Ticket Number"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
    </div>

  );
}

export default TrainSearchPage;
