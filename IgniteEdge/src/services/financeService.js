import axios from "axios";
import axiosInstance from '../config/api';

const API = axios.create({ 
  baseURL: "https://igniteedge-1.onrender.com",
  withCredentials: true
});

export const getFinanceData = () => axiosInstance.get('/api/finance');
export const createFinanceEntry = (data) => axiosInstance.post('/api/finance', data);
export const updateFinanceEntry = (id, data) => axiosInstance.put(`/api/finance/${id}`, data);
export const deleteFinanceEntry = (id) => axiosInstance.delete(`/api/finance/${id}`);
