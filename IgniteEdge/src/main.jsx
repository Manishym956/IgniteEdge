import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import SignupPage from './Authentication/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// This is the main entry point for a Vite-based React application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />} />
    <Route path="/Authentication/Signup" element={<SignupPage />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);