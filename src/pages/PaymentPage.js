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
  );
};

export default PaymentPage;
