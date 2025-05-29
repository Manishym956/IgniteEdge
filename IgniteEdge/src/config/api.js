// API Configuration
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://igniteedge-1.onrender.com'
  : 'http://localhost:1600';

export const API_URL = `${API_BASE_URL}/api`;

// Create axios instance with default config
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance; 