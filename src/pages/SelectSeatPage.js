import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../SelectSeat.css';

const SelectedSeatPage = () => {

  const navigate = useNavigate();

  const renderButtons = (start, count, char) => {
    let buttons = [];
    for (let i = start; i < count; i++) {
      buttons.push(
        <button key={i} className="m-2 seat">{i + 1}{char}</button>
      );
    }
    return buttons;
  };

  const handleStepClick = (step) => {
    if (step === 1) {
      navigate(``);
    }
  };



  return (

    <div>
      <div>
        <div className="row">
          <div className="col-12 mb-4">
            <div className="progress-steps">
              <span onClick={() => handleStepClick(1)} className="active-step">1. Select Train</span>
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
    </div>
  );
};



export default SelectedSeatPage;
