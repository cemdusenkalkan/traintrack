import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../SelectSeat.css';
import queryString from 'query-string';

const SelectedSeatPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const { passengers } = queryString.parse(location.search);

  useEffect(() => {
    // Koltuk veri setini oluştur
    const rows = ['A', 'B', 'C', 'D'];
    const seatsPerRow = 12;
    const newSeats = [];
    for (let row of rows) {
      for (let i = 1; i <= seatsPerRow; i++) {
        newSeats.push({ id: `${i}${row}`, name: `${i}${row}`, available: true });
      }
    }
    setSeats(newSeats);
  }, []);

  const renderButtons = (start, count, char) => {
    let buttons = [];
    for (let i = start; i < count; i++) {
      const seatId = `${i + 1}${char}`;
      const seat = seats.find(seat => seat.id === seatId);
      if (seat) {
        buttons.push(
          <button
            key={seatId}
            className={`m-2 seat ${selectedSeats.includes(seatId) ? 'selected' : ''} ${!seat.available ? 'occupied' : ''}`}
            onClick={() => handleSeatClick(seatId)}
            disabled={!seat.available}
          >
            {seatId}
          </button>
        );
      }
    }
    return buttons;
  };

  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      // Koltuğu kaldır
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else if (selectedSeats.length < passengers) {
      // Koltuğu seç
      setSelectedSeats([...selectedSeats, seatId]);
    } else {
      // Kullanıcıya bir uyarı mesajı göster
      alert("You can only select up to " + passengers + " seats.");
    }
  };

  const handleNextClick = () => {
    if (selectedSeats.length !== parseInt(passengers)) {
      alert("Please select " + passengers + " seats.");
      return;
    }

    navigate('/passenger-information', {
      state: { selectedSeats, passengers: parseInt(passengers) }
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-12 mb-4">
          <div className="progress-steps">
            <span className=" ">1. Select Route</span>
            <span className="arrow">→</span>
            <span className=" ">2. Select Train</span>
            <span className="arrow">→</span>
            <span className="active-step">3. Select Seats</span>
            <span className="arrow">→</span>
            <span className="disabled-step">4. Passenger Information</span>
            <span className="arrow">→</span>
            <span className="disabled-step">5. Payment</span>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-2 mb-2">
        <div className="col-auto">
          <button onClick={handleNextClick} className="btn btn-primary">Select</button>
        </div>
      </div>

      <div className="bt-container mt-4 mb-4">
        <div className="row justify-content-center ">
          <div className="col-auto">
            {renderButtons(0, 6, 'A')}
          </div>
          <div className="col-auto">
            {renderButtons(6, 12, 'A')}
          </div>
        </div>
        <div className="row justify-content-center mb-5">
          <div className="col-auto">
            {renderButtons(0, 6, 'B')}
          </div>
          <div className="col-auto">
            {renderButtons(6, 12, 'B')}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
            {renderButtons(0, 6, 'C')}
          </div>
          <div className="col-auto">
            {renderButtons(6, 12, 'C')}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
            {renderButtons(0, 6, 'D')}
          </div>
          <div className="col-auto">
            {renderButtons(6, 12, 'D')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedSeatPage;
