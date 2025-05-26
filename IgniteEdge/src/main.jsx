import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import SignupPage from './Authentication/Signup';
import LoginPage from './Authentication/Login';
import OtpVerification from './pages/OtpVerification';
import ForgetPassword from './pages/ForgetPassword';
import NewPassword from './pages/NewPassword';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import EmployeeList from './pages/EmployeeList';
import AddEditEmployee from './pages/AddEditEmployee';
import { useEffect, useState } from 'react';
import authService from './services/authService';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authService.isAuthenticated();
        setIsAuthenticated(response.success);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/Authentication/Login" replace />;
  }

  return children;
};

// This is the main entry point for a Vite-based React application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Authentication/Signup" element={<SignupPage />} />
        <Route path="/Authentication/Login" element={<LoginPage />} />
        <Route path="/Dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/Onboarding" element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        } />
        <Route path="/Authentication/forgot-password" element={<ForgetPassword />} />
        <Route path="/Authentication/reset-password" element={<NewPassword />} />
        <Route path="/Authentication/OtpVerification" element={<OtpVerification />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/EmployeeList" element={
          <ProtectedRoute>
            <EmployeeList />
          </ProtectedRoute>
        } />
        <Route path="/add" element={
          <ProtectedRoute>
            <AddEditEmployee />
          </ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <AddEditEmployee />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);