import React from 'react';
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin  } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Footer = () => {
  return (
    <footer className="py-3 my-4 container">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Features</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Pricing</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
      </ul>


      <div class="d-flex justify-content-between py-3">

      <div className="col-md-4 d-flex align-items-center">
        <span className="mb-3 mb-md-0 text-body-secondary">© 2024 TrainTrack. All rights reserved.</span>
      </div>
      
      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <a className="text-body-secondary" href="#">
            <FaTwitter size={24} />
          </a>
        </li> 
        <li className="ms-3">
          <a className="text-body-secondary" href="#">
            <FaInstagram size={24} />
          </a>
        </li>
        <li className="ms-3">
          <a className="text-body-secondary" href="#">
            <FaFacebook size={24} />
          </a>
        </li>
      </ul>

      </div>
    </footer>
  );
};

export default Footer;
