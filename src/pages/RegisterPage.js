import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import '../RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!recaptchaValue) {
      alert('Please complete the reCAPTCHA.');
      return;
    }
    console.log('Registering with', email, password);
    // Add your registration logic here
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Register</h1>
        <form className="register-form" onSubmit={handleRegisterSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="recaptcha-container">
            <ReCAPTCHA
              sitekey="6Lediu4pAAAAACTcA9wptRER2xZR6KS0FHffZVR-"
              onChange={handleRecaptchaChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="login-link-container">
          <a href="" onClick={handleLoginRedirect} className="login-link">Already registered? Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
