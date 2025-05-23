import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import SignupPage from './Authentication/Signup';
import LoginPage from './Authentication/Login';
import OtpVerification from './pages/OtpVerification';
import ForgetPassword from './pages/ForgetPassword';
import NewPassword from './pages/NewPassword';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import EmployeeList from './pages/EmployeeList';
import AddEditEmployee from './pages/AddEditEmployee';

// This is the main entry point for a Vite-based React application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Authentication/Signup" element={<SignupPage />} />
        <Route path="/Authentication/Login" element={<LoginPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Onboarding" element={<Onboarding />} />
        <Route path="/Authentication/forgot-password" element={<ForgetPassword />} />
        <Route path="/Authentication/reset-password" element={<NewPassword />} />
        <Route path="/Authentication/OtpVerification" element={<OtpVerification />} />
         <Route path="/forgot-password" element={<ForgetPassword />} />
         <Route path="/EmployeeList" element={<EmployeeList />} />
        <Route path="/add" element={<AddEditEmployee />} />
        <Route path="/edit/:id" element={<AddEditEmployee />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);