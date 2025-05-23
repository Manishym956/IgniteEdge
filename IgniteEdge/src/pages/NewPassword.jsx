import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authService from '../services/authService';
import './NewPassword.css';
import illustration from '../Images/newpass.jpeg';

const NewPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const { email, resetToken } = location.state || {};

  useEffect(() => {
  if (!email || !resetToken) {
    toast.error('Missing reset information');
    navigate('/forgot-password');
  }
}, [email, resetToken, navigate]);

  const validatePassword = (password) => {
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (!/\d/.test(password)) return 'Password must contain a number';
    if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validatePassword(formData.password);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const email = localStorage.getItem('resetEmail');
      const otp = localStorage.getItem('resetOtp');
      
      console.log('Resetting password for:', email);
      const response = await authService.resetPassword(email, otp, formData.password);
      console.log('Reset password response:', response);
      
      if (response.success) {
        toast.success('Password reset successful!');
        localStorage.removeItem('resetEmail');
        localStorage.removeItem('resetOtp');
        setTimeout(() => navigate('/Authentication/Login'), 2000);
      } else {
        toast.error(response.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-password-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <button 
            type="button" 
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        <div className="form-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="reset-button">
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default NewPassword;