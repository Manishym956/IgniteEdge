import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authService from '../services/authService';
import './Login.css';
import googleIcon from './assets/google-icon.svg';
import officeIcon from './assets/office.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const response = await authService.login(formData.email, formData.password);
      if (response.success) {
        toast.success('Login successful!');
        setTimeout(() => navigate('/onboarding'), 1500);
      } else {
        toast.error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="login-left">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>IgniteEdge</div>
        <img src={officeIcon} alt="Office icon" />
      </div>
      
      <div className="login-right">
        <div className="form-container">
          <h1>Login</h1>
          
          <div className="social-buttons">
            <button 
              type="button"
              className="google-btn"
              onClick={() => toast.info('Google sign-in coming soon!')}
            >
              <img src={googleIcon} alt="Google icon" />
              Sign In With Google
            </button>
          </div>
          
          <div className="divider">
            <span>-OR-</span>
          </div>
          
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                className={`form-input ${errors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={handleChange} 
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group password-group">
              <input 
                type={showPassword ? "text" : "password"}
                name="password" 
                placeholder="Password" 
                className={`form-input ${errors.password ? 'error' : ''}`}
                value={formData.password}
                onChange={handleChange} 
              />
              <button 
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <button 
              type="submit" 
              className="login-btn" 
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : 'LOGIN'}
            </button>
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