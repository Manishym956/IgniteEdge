import axios from 'axios';

const API_URL = 'http://localhost:1600/api/profitloss';

// Create axios instance with credentials
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

export const getProfitLossRecords = () => axiosInstance.get('/');

export const addProfitLossRecord = (data) => axiosInstance.post('/', data);

export const updateProfitLossRecord = (id, data) => axiosInstance.put(`/${id}`, data);

export const deleteProfitLossRecord = (id) => axiosInstance.delete(`/${id}`);
