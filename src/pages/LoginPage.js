import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validUsers = [
    { id: 1, firstName: 'Admin', lastName: 'Admin', email: 'admin@gmail.com', password: 'password', role: 'admin' },
    { id: 2, firstName: 'Miray', lastName: 'Köksal', email: 'miray@gmail.com', password: 'password', role: 'user' },
    { id: 3, firstName: 'Cem', lastName: 'Kalkandüşen', email: 'cem@gmail.com', password: 'password', role: 'user' },
    { id: 4, firstName: 'Meryem', lastName: 'Çanga', email: 'meryem@gmail.com', password: 'password', role: 'user' }
  ];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const user = validUsers.find(u => u.email === email && u.password === password);

    if (user) {
      console.log('Logging in with', email, 'Role:', user.role);
      localStorage.setItem('user', JSON.stringify(user));
      onLogin();
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  const handleRegisterRedirect = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const handleForgotPasswordRedirect = (e) => {
    e.preventDefault();
    navigate('/forgot-password');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={handleLoginSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <div className="register-link-container">
          <a href="" onClick={handleRegisterRedirect} className="register-link">Don't have an account yet? Sign Up</a>
          <a href="" onClick={handleForgotPasswordRedirect} className="forgot-password-link">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
