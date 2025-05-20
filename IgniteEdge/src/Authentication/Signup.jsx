import React, { useState } from 'react';
import './Signup.css';
import googleIcon from './assets/google-icon.svg';
import officeIcon from './assets/office.png';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authService from '../services/authService';
import {OtpVerification} from './OtpVerification';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const registerResponse = await authService.register(
        formData.name,
        formData.email,
        formData.password
      );

      console.log('Register response:', registerResponse); // Debug log

      if (registerResponse.success && registerResponse.user) {
        toast.success('Account created successfully!');
        
        // Store user data temporarily
        localStorage.setItem('tempUserId', registerResponse.user._id);
        localStorage.setItem('tempEmail', registerResponse.user.email);

        // Send verification OTP
        try {
          const otpResponse = await authService.sendVerifyOtp(registerResponse.user._id);
          
          console.log('OTP response:', otpResponse); // Debug log

          if (otpResponse.success) {
            toast.success('Verification code sent to your email!');
            // Navigate after a short delay to ensure toast is visible
            setTimeout(() => {
              navigate('/verify-otp', {
                state: {
                  userId: registerResponse.user._id,
                  email: registerResponse.user.email
                }
              });
            }, 1500);
          } else {
            throw new Error(otpResponse.message || 'Failed to send verification code');
          }
        } catch (otpError) {
          console.error('OTP error:', otpError);
          toast.error('Failed to send verification code. Please try again.');
        }
      } else {
        throw new Error(registerResponse.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="login-left">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>IgniteEdge</div>
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
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text"
                name="name"
                placeholder="Full name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="form-group">
              <input 
                type="email"
                name="email"
                placeholder="Email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group">
              <input 
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
              />
              <button 
                type="button" 
                className="toggle-password-btn" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form> 
          <div className="login-link" style={{ cursor: 'pointer', marginTop: '10px' }}>
            <p onClick={() => navigate('/Authentication/Login')}>Already have an account? Login</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;