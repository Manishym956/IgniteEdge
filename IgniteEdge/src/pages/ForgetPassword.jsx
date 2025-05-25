import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authService from '../services/authService';
import './ForgetPassword.css';
import illustration from '../Images/password.jpeg';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    setIsSubmitting(true);
    
    try {
      console.log('Sending reset OTP request for:', email); // Debug log
      const response = await authService.sendResetOtp(email);
      console.log('Reset OTP response:', response); // Debug log
      
      if (response.success) {
        toast.success('OTP sent successfully!');
        localStorage.setItem('resetEmail', email);
        setTimeout(() => {
         navigate('/Authentication/OtpVerification', { state: { email, isPasswordReset: true } });
        }, 2000);
      } else {
        toast.error(response.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Reset OTP error:', error); // Debug log
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <ToastContainer position="top-right" autoClose={3000} />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;