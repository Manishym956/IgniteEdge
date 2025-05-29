import axiosInstance from '../config/api';

export const getProfitLossRecords = () => axiosInstance.get('/api/profitloss');

export const addProfitLossRecord = (data) => axiosInstance.post('/api/profitloss', data);

export const updateProfitLossRecord = (id, data) => axiosInstance.put(`/api/profitloss/${id}`, data);

export const deleteProfitLossRecord = (id) => axiosInstance.delete(`/api/profitloss/${id}`);
