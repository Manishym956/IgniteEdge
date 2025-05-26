import axios from "axios";

const API = axios.create({ 
  baseURL: "http://localhost:1600",
  withCredentials: true
});

export const getFinanceData = () => API.get("/api/finance");
export const createFinanceEntry = (data) => API.post("/api/finance", data);
export const updateFinanceEntry = (id, data) => API.put(`/api/finance/${id}`, data);
export const deleteFinanceEntry = (id) => API.delete(`/api/finance/${id}`);
