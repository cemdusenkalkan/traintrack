import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  let navigate = useNavigate();

  return (
    <div className="login-button-container" style={{ position: 'absolute', top: 0, left: 0 }}>
      <button className="login-button" onClick={() => navigate('/login')}>Giriş / Kayıt</button>
    </div>
  );
};

export default LoginButton;
