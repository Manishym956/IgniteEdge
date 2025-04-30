import React from 'react';
import './Signup.css';
import googleIcon from './assets/google-icon.svg';
import officeIcon from './assets/office.png';

const SignupPage = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo">IgniteEdge</div>
        <img src={officeIcon} alt="Office icon" />
      </div>
      <div className="login-right">
        <div className="form-container">
          <h1>Sign-Up</h1><br></br>
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
              <input type="Full name " placeholder="Full name " className="form-input" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email" className="form-input" />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" className="form-input" />
            </div>
            <button type="submit" className="login-btn">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;