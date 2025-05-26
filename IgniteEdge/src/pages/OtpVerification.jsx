import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OtpVerification.css';
import Illustration from '../Images/otp.jpeg';

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

 
  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  const handleChange = (index, value) => {
   
    if (value && !/^\d+$/.test(value)) return;

    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

   
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
   
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split('').slice(0, 6);
      const newOtp = [...otp];
      
      digits.forEach((digit, index) => {
        if (index < 6) {
          newOtp[index] = digit;
        }
      });
      
      setOtp(newOtp);
      
     
      if (digits.length < 6) {
        inputRefs[digits.length].current.focus();
      } else {
        inputRefs[5].current.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (otp.some(digit => digit === '')) {
      setMessage('Please enter all digits of the OTP');
      return;
    }
    
    setIsSubmitting(true);
    
   
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage('OTP verified successfully!');
      navigate('/Authentication/reset-password', { state: { email: location.state.email } });
    }, 1500);
  };

  return (
    <div className="otp-verification-container">
      <div className="otp-verification-content">
        <div className="otp-verification-illustration">
          <img 
            src={Illustration} 
            alt="Verification illustration" 
            className="illustration-image"
          />
        </div>
        
        <div className="otp-verification-form-container">
          <h1 className="company-name">IgniteEdge</h1>
          
          <div className="form-card">
            <h2 className="form-title">OTP Verification</h2>
            <p className="form-description">
              Enter the 6-digit code that was sent to your email address.
            </p>
            
            {message && (
              <div className={`message ${message.includes('successfully') ? 'success-message' : 'error-message'}`}>
                {message}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="otp-inputs">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength="1"
                    className="otp-input"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : null}
                    disabled={isSubmitting}
                    aria-label={`Digit ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                type="submit" 
                className="verify-button"
                disabled={isSubmitting || otp.some(digit => digit === '')}
              >
                {isSubmitting ? 'VERIFYING...' : 'VERIFY OTP'}
              </button>
            </form>
            
            <div className="resend-link">
              Didn't receive the code? <button className="text-button">Resend</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;