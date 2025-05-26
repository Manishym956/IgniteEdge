import axios from 'axios';

const API_URL = 'http://localhost:1600/api/profitloss';

export const getProfitLossRecords = () => axios.get(API_URL);

export const addProfitLossRecord = (data) => axios.post(API_URL, data);

export const updateProfitLossRecord = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteProfitLossRecord = (id) => axios.delete(`${API_URL}/${id}`);
