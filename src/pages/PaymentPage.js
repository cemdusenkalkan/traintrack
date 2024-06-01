// PaymentPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PaymentPage.css'; // Make sure this CSS file exists and is imported

const PaymentPage = () => {
  const navigate = useNavigate();
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    name: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cardInfo); // Here you would normally handle the payment process
    navigate('/');
  };

  return (
    <div>
      <div className="row">
        <div className="col-12 mb-4">
          <div className="progress-steps">
            <span className=" ">1. Select Route</span>
            <span className="arrow">→</span>
            <span className="">2. Select Train</span>
            <span className="arrow">→</span>
            <span className="">3. Select Seats</span>
            <span className="arrow">→</span>
            <span className="">4. Passenger Information</span>
            <span className="arrow">→</span>
            <span className="active-step">5. Payment</span>
          </div>
        </div>
      </div>
      <div className="payment-container">

        <h1>Payment</h1>
        <form onSubmit={handleSubmit} className="payment-form">
          <input
            name="cardNumber"
            value={cardInfo.cardNumber}
            onChange={handleInputChange}
            placeholder="Card Number"
            required
          />
          <input
            name="name"
            value={cardInfo.name}
            onChange={handleInputChange}
            placeholder="Name on Card"
            required
          />
          <input
            name="expiryDate"
            value={cardInfo.expiryDate}
            onChange={handleInputChange}
            placeholder="Expiry Date"
            required
          />
          <input
            name="cvv"
            value={cardInfo.cvv}
            onChange={handleInputChange}
            placeholder="CVV"
            required
          />
          <button type="submit">Buy</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
