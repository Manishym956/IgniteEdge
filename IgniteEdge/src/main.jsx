import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import SignupPage from './Authentication/Signup';
import LoginPage from './Authentication/Login';
import OtpVerification from './Authentication/OtpVerification';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Authentication/Signup" element={<SignupPage />} />
        <Route path="/Authentication/Login" element={<LoginPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Onboarding" element={<Onboarding />} />
        <Route 
          path="/Authentication/OtpVerification" 
          element={
            <OtpVerification />
          } 
        />
      </Routes>
    </BrowserRouter>
     
  </React.StrictMode>
);