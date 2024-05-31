import React, { useState } from 'react';
import '../admin.css';

const TrainManager = () => {
  const [trains, setTrains] = useState([
    { id: 1, name: 'TrainTrack', route: 'İzmir - Ankara', status: 'Active' },
    { id: 2, name: 'TrainTrack', route: 'İstanbul - İzmir', status: 'Active' },
    { id: 3, name: 'TrainTrack', route: 'Ankara - İstanbul', status: 'Inactive' }
  ]);

  const handleToggleTrainStatus = (trainId) => {
    setTrains(trains.map(train => {
      if (train.id === trainId) {
        return { ...train, status: train.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return train;
    }));
  };

  return (
    <div className="train-manager">
      <h2>Train Manager</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Route</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.id}>
              <td>{train.id}</td>
              <td>{train.name}</td>
              <td>{train.route}</td>
              <td>{train.status}</td>
              <td>
                <button onClick={() => handleToggleTrainStatus(train.id)}>
                  {train.status === 'Active' ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainManager;
