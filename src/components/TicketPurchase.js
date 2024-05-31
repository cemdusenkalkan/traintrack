import React, { useState } from 'react';

const TicketPurchase = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedOption, setSelectedOption] = useState('One Way');
  const [personCount, setPersonCount] = useState(1);

  // Add any other logic you need for handling the ticket purchase process

  return (
    <div className="ticket-purchase-container">
      <div className="option">
        <div className="option-heading">From Where</div>
        <select
          className="location-select"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">Select District</option>
          {/* Add options for districts */}
        </select>
      </div>
      <div className="option">
        <div className="option-heading">Where To</div>
        <select
          className="location-select"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">Select District</option>
          {/* Add options for districts */}
        </select>
      </div>
      {/* ...other options... */}
    </div>
  );
};

export default TicketPurchase;
