import React, { useState } from 'react';
import './ForgotPassword.css';
import illustration from './assets/illustration.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage('Password reset link sent! Please check your email.');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        <div className="forgot-password-illustration">
          <img 
            src={illustration} 
            alt="Password reset illustration" 
            className="illustration-image"
          />
        </div>
        
        <div className="forgot-password-form-container">
          <h1 className="company-name">IgniteEdge</h1>
          
          <div className="form-card">
            <h2 className="form-title">Forgot Password</h2>
            <p className="form-description">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            {message ? (
              <div className="success-message">{message}</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="reset-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'SENDING...' : 'RESET PASSWORD'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;