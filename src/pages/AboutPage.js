import React from 'react';
import '../AboutPage.css';
import founder1 from '../img/founder1.jpeg';
import founder2 from '../img/founder2.jpg';
import founder3 from '../img/founder3.jpeg';


const AboutPage = () => {
    return (
        <div className="about-page">
            <div className="about-container">
                <h1>About Us</h1>
                <p>
                    At TrainTrack, we are here to offer you the best train travel experience.
                    Our mission is to make your journeys enjoyable and safe. Thank you for choosing to travel with us!
                </p>

            </div>
            <div className="founders-container">
                <a className="founder" style={{ textDecoration: 'none' }} href="https://www.linkedin.com/in/meryemcanga/"
                    target="_blank" rel="noopener noreferrer">
                    <h2>Founder</h2>
                    <img src={founder1} alt="Founder 1" className="founder-image" />
                    <p> Meryem Çanga </p>
                </a>
                <a className="founder" style={{ textDecoration: 'none' }} href="https://www.linkedin.com/in/meryemcanga/"
                    target="_blank" rel="noopener noreferrer">
                    <h2>Founder</h2>
                    <img src={founder2} alt="Founder 2" className="founder-image" />
                    <p>Cem Düşenkalkan</p>
                </a>
                <a className="founder" style={{ textDecoration: 'none' }} href="https://www.linkedin.com/in/meryemcanga/"
                    target="_blank" rel="noopener noreferrer">
                    <h2>Founder</h2>
                    <img src={founder3} alt="Founder 3" className="founder-image" />
                    <p> Miray Köksal</p>
                </a>
            </div>
        </div>
    );
};

export default AboutPage;
