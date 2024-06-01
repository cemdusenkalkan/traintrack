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
            disabled={!seat.available || (selectedSeats.length >= passengers)}
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
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else if (selectedSeats.length < passengers) {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleNextClick = () => {
    // Ödeme sayfasına seçilen koltuk bilgilerini ve diğer bilgileri aktar
    navigate(`/passenger-info?selectedSeats=${selectedSeats.join(',')}`);
  };

  return (
    <div>
      <div>
        <div className="row">
          <div className="col-12 mb-4">
            <div className="progress-steps">
              <span className="active-step">1. Select Train</span>
              <span className="arrow">→</span>
              <span className="active-step">2. Select Seats</span>
              <span className="arrow">→</span>
              <span className="disabled-step">3. Passengers</span>
              <span className="arrow">→</span>
              <span className="disabled-step">4. Reservation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bt-container mt-5">
        <div className="row justify-content-center">
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

      <div className="row justify-content-center mt-5">
        <div className="col-auto">
          <button onClick={handleNextClick} className="btn btn-primary">Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
};

export default SelectedSeatPage;
