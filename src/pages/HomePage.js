import React, { useState } from 'react';
import StepsToBookTickets from '../components/StepsToBookTickets';
import FAQ from '../components/FAQ';
import backgroundImage from '../trainman.png';
import '../styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { IoPersonSharp } from "react-icons/io5";

const HomePage = () => {
  const [fromStationName, setFromStationName] = useState('');
  const [fromStationId, setFromStationId] = useState(null);
  const [toStationName, setToStationName] = useState('');
  const [toStationId, setToStationId] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('one-way');
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [passengerCount, setPassengerCount] = useState(1);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const cities = [
    { id: 1, name: 'Istanbul' },
    { id: 2, name: 'Izmir' },
    { id: 3, name: 'Ankara' },
    { id: 4, name: 'Antalya' }
  ];

  const handleSearchTickets = () => {
    if (!fromStationId || !toStationId || !departureDate) {
      alert("Please fill in all fields.");
    } else if (selectedOption === 'roundtrip' && !returnDate) {
      alert("Please fill in all fields.");
    } else {
      const params = new URLSearchParams({
        from: fromStationId,
        to: toStationId,
        departure: departureDate ? departureDate.toISOString() : '',
        return: selectedOption === 'roundtrip' && returnDate ? returnDate.toISOString() : '',
        oneWay: selectedOption === 'one-way',
        passengers: passengerCount
      });
      navigate(`/ticket?${params.toString()}`);
    }
  };


  const handleCitySelect = (city, setStationName, setStationId, setShowSuggestions) => {
    setStationName(city.name); // Store the city name
    setStationId(city.id); // Store the city id
    setShowSuggestions(false); // Hide suggestions after selection
  };

  const handleSwapStations = () => {
    const tempName = fromStationName;
    const tempId = fromStationId;
    setFromStationName(toStationName);
    setFromStationId(toStationId);
    setToStationName(tempName);
    setToStationId(tempId);
  };

  const filteredCities = (input, excludeId) => {
    if (!input) return [];
    return cities.filter(city => city.name.toLowerCase().includes(input.toLowerCase()) && city.id !== excludeId);
  };

  return (
    <div className="home-page">
      <div
        className="search-container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <h2>traintrack</h2>
        <h3 className="slogan">Ride the Rails to Adventure - Your Journey Begins Here!</h3>

        <div className="toggle-switch">
          <input
            type="checkbox"
            id="tripType"
            checked={selectedOption === 'roundtrip'}
            onChange={() => setSelectedOption(selectedOption === 'one-way' ? 'roundtrip' : 'one-way')}
          />
          <label htmlFor="tripType" className="slider">
            <span className={`label ${selectedOption === 'one-way' ? 'label-left' : 'label-hidden'}`}>One way</span>
            <span className={`label ${selectedOption === 'roundtrip' ? 'label-right' : 'label-hidden'}`}>Roundtrip</span>
          </label>
        </div>


        <div className="search-fields">

          <div className="input-wrapper">
            <input
              type="text"
              placeholder="From"
              value={fromStationName}
              onChange={(e) => {
                setFromStationName(e.target.value);
                setShowFromSuggestions(true);
              }}
              onFocus={() => setShowFromSuggestions(true)}
              onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
              className="station-input"
            />
            {showFromSuggestions && (
              <div className="suggestions-list">
                {filteredCities(fromStationName, toStationId).map(city => (
                  <div key={city.id} onClick={() => handleCitySelect(city, setFromStationName, setFromStationId, setShowFromSuggestions)} className="suggestion-item">
                    {city.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleSwapStations} className="swap-button" aria-label="Swap From and To">
            ⇆
          </button>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="To"
              value={toStationName}
              onChange={(e) => {
                setToStationName(e.target.value);
                setShowToSuggestions(true);
              }}
              onFocus={() => setShowToSuggestions(true)}
              onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
              className="station-input"
            />
            {showToSuggestions && (
              <div className="suggestions-list">
                {filteredCities(toStationName, fromStationId).map(city => (
                  <div key={city.id} onClick={() => handleCitySelect(city, setToStationName, setToStationId, setShowToSuggestions)} className="suggestion-item">
                    {city.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="passenger-selector ">
            <div className="icon-container">
              <IoPersonSharp className="person-icon" />
            </div>
            <select
              id="passengerCount"
              value={passengerCount}
              onChange={(e) => setPassengerCount(e.target.value)}
              className="passenger-select"
            >
              {[...Array(10).keys()].map(i => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <DatePicker
            selected={departureDate}
            onChange={(date) => setDepartureDate(date)}
            placeholderText="Departure Date"
            className="date-picker"
            minDate={new Date()}
          />

          {selectedOption === 'roundtrip' && (
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              placeholderText="Return Date"
              className="date-picker"
              minDate={departureDate || new Date()}
            />
          )}

          <button type="button" onClick={handleSearchTickets}>Search</button>
        </div>
      </div>
      <StepsToBookTickets />
      <FAQ />
    </div>
  );
};

export default HomePage;
