import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Ticket.css';
import ticketImage from '../img/ticket.png';

function TicketResultPage() {
  const location = useLocation();
  const { ticketId, ticketOwner, ticketDate } = location.state;

  return (
    <div className="ticket-container">
      <div className="ticket">
        <div className="ticket-logo">
          <img src={ticketImage} alt="Ticket" />
        </div>
        <div className="ticket-info">
          <p>Ticket ID: {ticketId}</p>
          <p>Ticket Owner: {ticketOwner}</p>
          <p>Ticket Date: {ticketDate}</p>
        </div>
      </div>
    </div>
  );
}

export default TicketResultPage;
