// At the top of your StepsToBookTickets.js file
import IconSelectRoute from '../icon_01.svg'; // Replace with your actual icon path
import IconBuyTickets from '../icon_02.svg'; // Replace with your actual icon path
import IconCheckTickets from '../icon_03.svg'; // Replace with your actual icon path

// In your StepsToBookTickets component
const StepsToBookTickets = () => {
  return (
    <div className="steps-container">
      <div className="step">
        <img src={IconSelectRoute} alt="Select Route" />
        <h3>Select Route</h3>
        <p>Choose among the routes you want to travel on.</p>
      </div>
      <div className="step">
        <img src={IconBuyTickets} alt="Buy Tickets" />
        <h3>Buy Ticket</h3>
        <p>Go to the ticket purchase page and buy your ticket.</p>
      </div>
      <div className="step">
        <img src={IconCheckTickets} alt="Check Tickets" />
        <h3>Check Your Ticket</h3>
        <p>Query your ticket with the PNR number given to you. Have a good trip!</p>
      </div>
    </div>
  );
};

export default StepsToBookTickets;
