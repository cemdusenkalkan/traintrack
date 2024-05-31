import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineDateRange } from 'react-icons/md';
import { IoPersonSharp } from "react-icons/io5";
import '../TicketsList.css';

const DateSelector = ({ selectedDate, setSelectedDate }) => {
  const navigate = useNavigate();
  const today = new Date();
  const prevDay = new Date(selectedDate);
  prevDay.setDate(prevDay.getDate() - 1);
  const nextDay = new Date(selectedDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    updateUrlDate(date);
  };




  const updateUrlDate = (date) => {
    const params = new URLSearchParams(window.location.search);
    params.set('departure', date.toISOString());
    navigate(`${window.location.pathname}?${params.toString()}`, { replace: true });
  };

  return (
    <div className="date-selector">
      <button
        onClick={() => handleDateChange(prevDay)}
        disabled={prevDay < today}
        className={prevDay < today ? 'disabled' : ''}
      >
        {prevDay.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
      </button>
      <button className="active">
        {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
      </button>
      <button onClick={() => handleDateChange(nextDay)}>
        {nextDay.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
      </button>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd MMM yyyy"
        minDate={new Date()}
        customInput={
          <button className="calendar-button">
            <MdOutlineDateRange />
          </button>
        }
      />
    </div>
  );
};

const TicketsList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from, to, departure, oneWay, passengers } = queryString.parse(location.search);

  const [tickets, setTickets] = useState([
    { id: 1, from: 'Izmir', fromId: 2, to: 'Istanbul', toId: 1, departure: '08:00', arrival: '10:00', transfer: false, price: 100 },
    { id: 2, from: 'Istanbul', fromId: 1, to: 'Izmir', toId: 2, departure: '09:00', arrival: '10:30', transfer: true, price: 150 },
    { id: 3, from: 'Izmir', fromId: 2, to: 'Ankara', toId: 3, departure: '09:30', arrival: '10:45', transfer: false, price: 120 },
    { id: 4, from: 'Ankara', fromId: 3, to: 'Izmir', toId: 2, departure: '10:00', arrival: '11:00', transfer: true, price: 140 },
    { id: 5, from: 'Istanbul', fromId: 1, to: 'Ankara', toId: 3, departure: '09:30', arrival: '10:45', transfer: false, price: 130 },
    { id: 6, from: 'Ankara', fromId: 3, to: 'Istanbul', toId: 1, departure: '10:00', arrival: '11:00', transfer: true, price: 160 },
    { id: 7, from: 'Izmir', fromId: 2, to: 'Antalya', toId: 4, departure: '07:00', arrival: '09:00', transfer: false, price: 110 },
    { id: 8, from: 'Antalya', fromId: 4, to: 'Izmir', toId: 2, departure: '08:00', arrival: '10:30', transfer: true, price: 155 },
    { id: 9, from: 'Istanbul', fromId: 1, to: 'Antalya', toId: 4, departure: '07:30', arrival: '09:45', transfer: false, price: 140 },
    { id: 10, from: 'Antalya', fromId: 4, to: 'Istanbul', toId: 1, departure: '09:00', arrival: '11:30', transfer: true, price: 170 },
    { id: 11, from: 'Ankara', fromId: 3, to: 'Antalya', toId: 4, departure: '08:30', arrival: '10:30', transfer: false, price: 125 },
    { id: 12, from: 'Antalya', fromId: 4, to: 'Ankara', toId: 3, departure: '10:00', arrival: '12:30', transfer: true, price: 165 },
    { id: 13, from: 'Istanbul', fromId: 1, to: 'Ankara', toId: 3, departure: '12:00', arrival: '14:00', transfer: false, price: 135 },
    { id: 14, from: 'Ankara', fromId: 3, to: 'Istanbul', toId: 1, departure: '14:00', arrival: '16:00', transfer: true, price: 175 },
    { id: 15, from: 'Izmir', fromId: 2, to: 'Antalya', toId: 4, departure: '11:00', arrival: '13:00', transfer: false, price: 115 },
    { id: 16, from: 'Antalya', fromId: 4, to: 'Izmir', toId: 2, departure: '13:00', arrival: '15:30', transfer: true, price: 150 },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date(departure));
  const [filters, setFilters] = useState({
    transfer: { withTransfer: true, withoutTransfer: true },
    arrivalTimes: ['night', 'morning', 'afternoon', 'evening'],
    departureTimes: ['night', 'morning', 'afternoon', 'evening']
  });

  const [passengerCount, setPassengerCount] = useState(Number(passengers));

  useEffect(() => {
    setPassengerCount(Number(passengers));
  }, [passengers]);


  const handlePassengerCountChange = (e) => {
    const count = e.target.value;
    setPassengerCount(count);
    updateUrlPassengerCount(count);
  };

  const updateUrlPassengerCount = (count) => {
    const params = new URLSearchParams(window.location.search);
    params.set('passengers', count);
    navigate(`${window.location.pathname}?${params.toString()}`, { replace: true });
  };



  const cities = {
    1: 'Istanbul',
    2: 'Izmir',
    3: 'Ankara',
    4: 'Antalya'
  };

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

  const getTimeRange = (time) => {
    const [hour] = time.split(':').map(Number);
    if (hour >= 0 && hour < 6) return 'night';
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    return 'evening';
  };

  const filterTickets = (tickets) => {
    return tickets.filter(ticket => {
      const { transfer, arrivalTimes, departureTimes } = filters;

      const transferMatch = transfer.withTransfer && transfer.withoutTransfer ? true :
        transfer.withTransfer ? ticket.transfer :
          transfer.withoutTransfer ? !ticket.transfer : false;

      const arrivalMatch = arrivalTimes.length > 0 && arrivalTimes.includes(getTimeRange(ticket.arrival));
      const departureMatch = departureTimes.length > 0 && departureTimes.includes(getTimeRange(ticket.departure));

      return transferMatch && arrivalMatch && departureMatch;
    });
  };

  const filteredTickets = filterTickets(tickets.filter(ticket => {
    return ticket.fromId === Number(from) && ticket.toId === Number(to);
  }));

  const handleBuyClick = id => {
    const selectedTicket = tickets.find(ticket => ticket.id === id);
    const params = new URLSearchParams();
    params.append('ticketId', selectedTicket.id);
    params.append('from', from);
    params.append('to', to);
    params.append('departure', departure);
    params.append('oneWay', oneWay);
    params.append('passengers', passengers);

    const queryString = params.toString();
    navigate(`/SelectSeatPage?${queryString}`);
  };

  const handleStepClick = (step) => {
    if (step === 1) {
      navigate(``);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mb-4">
          <div className="progress-steps">
            <span onClick={() => handleStepClick(1)} className="active-step">1. Select Train</span>
            <span className="arrow">→</span>
            <span className="disabled-step">2. Select Seats</span>
            <span className="arrow">→</span>
            <span className="disabled-step">3. Passengers</span>
            <span className="arrow">→</span>
            <span className="disabled-step">4. Reservation</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h5 className="journey-info me-5">{cities[from]} → {cities[to]} {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</h5>

          <div className="passenger-selector ">
            <div className="icon-container">
              <IoPersonSharp className="person-icon" />
            </div>
            <select
              id="passengerCount"
              value={passengerCount}
              onChange={handlePassengerCountChange}
              className="passenger-select"
            >
              {[...Array(10).keys()].map(i => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

          </div>

          <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />



        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="filter-container">
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
              <h6>Arrival Time</h6>
              {['night', 'morning', 'afternoon', 'evening'].map((time) => (
                <label key={time}>
                  <input
                    type="checkbox"
                    onChange={() => handleSelectBoxChange('arrivalTimes', time)}
                    checked={filters.arrivalTimes.includes(time)}
                  /> {time.charAt(0).toUpperCase() + time.slice(1)}
                </label>
              ))}
            </div>
            <div className="filter-section">
              <h6>Departure Time</h6>
              {['night', 'morning', 'afternoon', 'evening'].map((time) => (
                <label key={time}>
                  <input
                    type="checkbox"
                    onChange={() => handleSelectBoxChange('departureTimes', time)}
                    checked={filters.departureTimes.includes(time)}
                  /> {time.charAt(0).toUpperCase() + time.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="tickets-container">
            {filteredTickets.length > 0 ? (
              filteredTickets.map(ticket => (
                <div key={ticket.id} className="ticket mb-3">
                  <div className="ticket-detail"><strong>Departure Point:</strong> <span>{ticket.from}</span></div>
                  <div className="ticket-detail"><strong>Destination:</strong> <span>{ticket.to}</span></div>
                  <div className="ticket-detail"><strong>Departure Time:</strong> <span>{ticket.departure}</span></div>
                  <div className="ticket-detail"><strong>Arrival Time:</strong> <span>{ticket.arrival}</span></div>
                  <div className="ticket-detail"><strong>Transfer:</strong> <span>{ticket.transfer ? 'Yes' : 'No'}</span></div>
                  <div className="ticket-detail"><strong>Price:</strong> <span>${ticket.price}</span></div>
                  <button className="btn btn-primary mt-2" onClick={() => handleBuyClick(ticket.id)}>Buy</button>
                </div>
              ))
            ) : (
              <p>No tickets available for the selected route.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsList;
