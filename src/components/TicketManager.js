import React, { useState } from 'react';
import '../admin.css';

const initialTickets = [
  { id: 1, name: 'Miray Köksal', destination: 'İstanbul', status: 'Cancelled' },
  { id: 2, name: 'Cem Düşenkalkan', destination: 'Ankara', status: 'Confirmed' },
  { id: 3, name: 'Meryem Çanga', destination: 'İzmir', status: 'Pending' }
];

const TicketManager = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [showModal, setShowModal] = useState(false);
  const [ticketToCancel, setTicketToCancel] = useState(null);

  const handleCancelTicket = () => {
    setTickets(tickets.map(ticket =>
      ticket.id === ticketToCancel ? { ...ticket, status: 'Cancelled' } : ticket
    ));
    setShowModal(false);
  };

  const handleShowModal = (ticketId) => {
    setTicketToCancel(ticketId);
    setShowModal(true);
  };

  return (
    <div className="ticket-manager">
      <h2>Ticket Manager</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Passenger Name</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.name}</td>
              <td>{ticket.destination}</td>
              <td>{ticket.status}</td>
              <td>
                {ticket.status !== 'Cancelled' && (
                  <button className="cancel-button" onClick={() => handleShowModal(ticket.id)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal show">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Confirmation</h2>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to cancel this ticket?</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleCancelTicket}>Cancel Ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketManager;