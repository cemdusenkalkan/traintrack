import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../TicketsList.css';
import queryString from 'query-string';

const TicketsList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from, to, departure, oneWay, passengers } = queryString.parse(location.search);

  const [tickets, setTickets] = useState([
    { id: 1, from: 'Izmir', fromId: 2, to: 'Istanbul', toId: 1, departure: '08:00', arrival: '10:00', transfer: false, price: 100 },
    { id: 2, from: 'Istanbul', fromId: 1, to: 'Izmir', toId: 2, departure: '09:00', arrival: '10:30', transfer: true, price: 150 },
    { id: 3, from: 'Izmir', fromId: 2, to: 'Ankara', toId: 3, departure: '09:30', arrival: '10:45', transfer: false, price: 120 },
    // more tickets...
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date(departure));
  const [filters, setFilters] = useState({
    transfer: { withTransfer: true, withoutTransfer: true },
    arrivalTimes: ['night', 'morning', 'afternoon', 'evening'],
    departureTimes: ['night', 'morning', 'afternoon', 'evening'],
    priceRange: [0, 200]
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      transfer: {
        ...prevFilters.transfer,
        [filterName]: value
      }
    }));
  };

  const handleSelectBoxChange = (filterName, value) => {
    setFilters(prevFilters => {
      const updatedArray = prevFilters[filterName].includes(value)
        ? prevFilters[filterName].filter(item => item !== value)
        : [...prevFilters[filterName], value];
      return { ...prevFilters, [filterName]: updatedArray };
    });
  };

  const handlePriceRangeChange = (e) => {
    const [min, max] = e.target.value.split('-').map(Number);
    setFilters(prevFilters => ({ ...prevFilters, priceRange: [min, max] }));
  };

  const filterTickets = (tickets) => {
    return tickets.filter(ticket => {
      const { transfer, arrivalTimes, departureTimes, priceRange } = filters;

      const transferMatch = transfer.withTransfer && transfer.withoutTransfer ? true :
        transfer.withTransfer ? ticket.transfer :
          transfer.withoutTransfer ? !ticket.transfer : false;

      const arrivalMatch = arrivalTimes.length > 0 && arrivalTimes.includes(getTimeRange(ticket.arrival));
      const departureMatch = departureTimes.length > 0 && departureTimes.includes(getTimeRange(ticket.departure));
      const priceMatch = ticket.price >= priceRange[0] && ticket.price <= priceRange[1];

      return transferMatch && arrivalMatch && departureMatch && priceMatch;
    });
  };

  const filteredTickets = filterTickets(tickets.filter(ticket => {
    return ticket.fromId === Number(from) && ticket.toId === Number(to);
  }));

  return (
    <div className="tickets-list">
      <div className="filters">
        <div className="filter-section">
          <label>
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange('withTransfer', e.target.checked)}
              checked={filters.transfer.withTransfer}
            /> With Transfer
          </label>
          <label>
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange('withoutTransfer', e.target.checked)}
              checked={filters.transfer.withoutTransfer}
            /> Without Transfer
          </label>
        </div>
        <div className="filter-section">
          <h6>Price Range</h6>
          <select onChange={handlePriceRangeChange}>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-150">$100 - $150</option>
            <option value="150-200">$150 - $200</option>
          </select>
        </div>
      </div>
      <div className="tickets">
        {filteredTickets.map(ticket => (
          <div key={ticket.id} className="ticket">
            <div>{ticket.from} - {ticket.to}</div>
            <div>{ticket.departure} - {ticket.arrival}</div>
            <div>{ticket.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketsList;
