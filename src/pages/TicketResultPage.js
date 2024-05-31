import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Ticket.css';
import ticketImage from '../img/ticket.png';
import backgroundImage from '../img/BackgroundTicketInquiry.jpg';

function TicketResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticketId, ticketOwner, ticketDate, ticketFrom, ticketTo, ticketTime } = location.state;

  const handleCancel = () => {
    alert('Ticket has been cancelled.');
    navigate('/');
  };


  return (
    <div className="page" style={{
      background: `url(${backgroundImage}) no-repeat center center fixed`,
      backgroundSize: 'cover'
    }}>
      <div className="ticket-container">
        {/* 
        <div className="ticket-logo">
          <img src={ticketImage} alt="Ticket" />
        </div>
        */ }
        <div className="ticket-info">
          <table>
            <tbody>
              <tr>
                <td><strong>Ticket ID:</strong></td>
                <td>{ticketId}</td>
              </tr>
              <tr>
                <td><strong>Ticket Owner:</strong></td>
                <td>{ticketOwner}</td>
              </tr>
              <tr>
                <td><strong>Ticket Date:</strong></td>
                <td>{ticketDate}</td>
              </tr>
              <tr>
                <td><strong>From:</strong></td>
                <td>{ticketFrom}</td>
              </tr>
              <tr>
                <td><strong>To:</strong></td>
                <td>{ticketTo}</td>
              </tr>
              <tr>
                <td><strong>Departure Time:</strong></td>
                <td>{ticketTime} AM</td>
              </tr>
            </tbody>
          </table>
          <button className="cancel-button" onClick={handleCancel}>Cancel Ticket</button>
        </div>

      </div>
    </div>
  );
}

export default TicketResultPage;