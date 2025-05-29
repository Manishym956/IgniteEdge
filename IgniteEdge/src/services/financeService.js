import axios from "axios";
import axiosInstance from '../config/api';

const API = axios.create({ 
  baseURL: "http://localhost:1600",
  withCredentials: true
});

export const getFinanceData = () => axiosInstance.get('/api/finance');
export const createFinanceEntry = (data) => API.post("/api/finance", data);
export const updateFinanceEntry = (id, data) => API.put(`/api/finance/${id}`, data);
export const deleteFinanceEntry = (id) => API.delete(`/api/finance/${id}`);
