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
        <div className="illustration">
          {/* <img src={officeIcon} alt="Office icon" /> */}
          <div className="office-scene">
            <div className="people">
              {/* Simple representation of the people in the illustration */}
            </div>
            <div className="plants">
              {/* <img src={officeIcon} alt="Office icon" /> */}
              {/* Plants representation */}
            </div>
          </div>
        </div>
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
        
        <div className="language-selector">
          English (UK)
          <span className="dropdown-arrow">▼</span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;