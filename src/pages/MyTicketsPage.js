import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';

const MyTicketsPage = () => {
    const [tickets, setTickets] = useState([]);

    // Örnek bir veri oluşturalım
    useEffect(() => {
        const dummyData = [
            { id: 1, date: '2024-06-01', from: 'A', to: 'B', status: 'active' },
            { id: 2, date: '2024-06-02', from: 'B', to: 'C', status: 'canceled' },
            { id: 3, date: '2024-06-03', from: 'C', to: 'D', status: 'active' },
            { id: 4, date: '2024-06-03', from: 'C', to: 'D', status: 'past' },
        ];
        setTickets(dummyData);
    }, []);

    const cancelTicket = (id) => {
        // Bilet iptal işlemleri burada yapılabilir
        console.log('Cancel ticket with id:', id);
    };

    const activeTickets = tickets.filter(ticket => ticket.status === 'active');
    const canceledTickets = tickets.filter(ticket => ticket.status === 'canceled');
    const pastTickets = tickets.filter(ticket => ticket.status === 'past');

    return (
        <div>
            <h1>My Tickets</h1>
            <h2>Active Tickets</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {activeTickets.map(ticket => (
                        <tr key={ticket.id}>
                            <td>{ticket.date}</td>
                            <td>{ticket.from}</td>
                            <td>{ticket.to}</td>
                            <td>
                                <Button variant="primary">PDF</Button>
                                <Button variant="danger" onClick={() => cancelTicket(ticket.id)}>Cancel</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h2>Canceled Tickets</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>From</th>
                        <th>To</th>
                    </tr>
                </thead>
                <tbody>
                    {canceledTickets.map(ticket => (
                        <tr key={ticket.id}>
                            <td>{ticket.date}</td>
                            <td>{ticket.from}</td>
                            <td>{ticket.to}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h2>Past Tickets</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>From</th>
                        <th>To</th>
                    </tr>
                </thead>
                <tbody>
                    {pastTickets.map(ticket => (
                        <tr key={ticket.id}>
                            <td>{ticket.date}</td>
                            <td>{ticket.from}</td>
                            <td>{ticket.to}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default MyTicketsPage;
