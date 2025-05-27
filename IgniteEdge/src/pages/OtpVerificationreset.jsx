import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import authService from '../services/authService';
import './OtpVerification.css';

const OtpVerificationReset = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.email) {
      toast.error('Missing email details');
      navigate('/forgot-password');
    }
  }, []);

  const { email } = location.state || {};

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '') {
      if (index < 5) {
        const nextInput = document.querySelector(`input[name='otp-${index + 1}']`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name='otp-${index - 1}']`);
      if (prevInput) {
        prevInput.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      // Store OTP in localStorage for password reset
      localStorage.setItem('resetOtp', otpString);
      toast.success('OTP verified successfully!');
      setTimeout(() => navigate('/Authentication/reset-password', { state: { email } }), 2000);
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Verification failed. Please try again.');
      setOtp(['', '', '', '', '', '']);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendLoading) return;

    setResendLoading(true);
    try {
      const response = await authService.sendResetOtp(email);
      if (response.success) {
        toast.success('New OTP sent successfully');
        setResendTimer(30);
        setOtp(['', '', '', '', '', '']);
      } else {
        toast.error(response.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Resend error:', error);
      toast.error('Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="otp-card">
        <h2>Verify OTP</h2>
        <p>Please enter the 6-digit code sent to {email}</p>

        <form onSubmit={handleVerify}>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                name={`otp-${index}`}
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={loading}
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button
            type="submit"
            className={`verify-btn ${loading ? 'loading' : ''}`}
            disabled={loading || otp.join('').length !== 6}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div className="resend-section">
          {resendTimer > 0 ? (
            <p>Resend OTP in {resendTimer}s</p>
          ) : (
            <button
              onClick={handleResendOtp}
              className="resend-btn"
              disabled={resendLoading}
            >
              {resendLoading ? 'Sending...' : 'Resend OTP'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationReset;