import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../TrainSearchPage.css';

function TrainSearchPage() {
  const [ticketNumber, setTicketNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // This is where you'd call the onSearch if you have any API to fetch data from.
    // Simulating a random ticket for now.
    const randomTicket = {
      ticketId: Math.floor(Math.random() * 900000) + 100000,
      ticketOwner: 'Cem Düşenkalkan',
      ticketDate: new Date().toLocaleDateString(),
    };
    navigate('/ticket-result', { state: randomTicket });
  };

  return (
    <div className="search-container">
      <h2>Ticket Inquiry</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <div>
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
        <div>
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
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
}

export default TrainSearchPage;
