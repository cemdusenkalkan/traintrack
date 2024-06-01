import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/PassengerInformation.css';

const PassengerInformation = () => {
    const location = useLocation();
    const { selectedSeats, passengers } = location.state;

    const [passengerDetails, setPassengerDetails] = useState(
        Array.from({ length: passengers }, () => ({
            name: '',
            surname: '',
            idNumber: '',
            phone: '',
            email: '',
            passengerType: 'Adult'
        }))
    );

    const navigate = useNavigate();

    const handleChange = (index, field, value) => {
        const updatedDetails = [...passengerDetails];
        updatedDetails[index][field] = value;
        setPassengerDetails(updatedDetails);
    };

    const handleSubmit = () => {
        const allFieldsFilled = passengerDetails.every(passenger =>
            passenger.name && passenger.surname && passenger.idNumber && passenger.phone && passenger.email
        );

        if (!allFieldsFilled) {
            alert("Please fill out all passenger information.");
            return;
        }

        // You can process the passenger details here
        console.log({ selectedSeats, passengerDetails });

        navigate(`/payment`);
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
                        <span className="">3. Select Seats</span>
                        <span className="arrow">→</span>
                        <span className="active-step">4. Passenger Information</span>
                        <span className="arrow">→</span>
                        <span className="disabled-step">5. Payment</span>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <h2 className="mb-4">Passenger Information</h2>
                {passengerDetails.map((passenger, index) => (
                    <div key={index} className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Passenger {index + 1}</h5>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Name:</label>
                                    <input
                                        type="text"
                                        value={passenger.name}
                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Surname:</label>
                                    <input
                                        type="text"
                                        value={passenger.surname}
                                        onChange={(e) => handleChange(index, 'surname', e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">National ID Number:</label>
                                    <input
                                        type="text"
                                        value={passenger.idNumber}
                                        onChange={(e) => handleChange(index, 'idNumber', e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Phone:</label>
                                    <input
                                        type="text"
                                        value={passenger.phone}
                                        onChange={(e) => handleChange(index, 'phone', e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        value={passenger.email}
                                        onChange={(e) => handleChange(index, 'email', e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Passenger Type:</label>
                                    <select
                                        value={passenger.passengerType}
                                        onChange={(e) => handleChange(index, 'passengerType', e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="Adult">Adult</option>
                                        <option value="Student">Student</option>
                                        <option value="65+ Years">65+ Years</option>
                                        <option value="Child (7-12)">Child (7-12)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <button onClick={handleSubmit} className="btn btn-primary">Continue</button>
            </div>
        </div>
    );
};

export default PassengerInformation;
