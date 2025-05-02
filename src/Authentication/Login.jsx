import React from 'react';
import './Login.css';
import googleIcon from './assets/google-icon.svg';
import officeIcon from './assets/office.png';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="login-left">

      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>IgniteEdge</div>
        <img src={officeIcon} alt="Office icon" />
      </div>
      
      <div className="login-right">
        <div className="form-container">
          <h1>Login</h1>
          
          <div className="social-buttons">
            <button className="google-btn">
              <img src={googleIcon} alt="Google icon" />
              SignIn With Google
            </button>
            
           
          </div>
          
          <div className="divider">
            <span>-OR-</span>
          </div>
          
          <form className="login-form">
            <div className="form-group">
              <input type="email" placeholder="Email" className="form-input" />
            </div>
            
            <div className="form-group">
              <input type="password" placeholder="Password" className="form-input" />
            </div>
            
            <button type="submit" className="login-btn">LOGIN</button>
          </form>
          <div className="signup-link" style={{ cursor: 'pointer', marginTop: '10px' }}>
            <p onClick={() => navigate('/Authentication/Signup')}>Don't have an account? Sign Up</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;