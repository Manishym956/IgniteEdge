import axiosInstance from '../config/api';

export const getAutomations = async (projectId) => {
  const response = await axiosInstance.get(`/api/automations?project=${projectId}`);
  return response.data;
};

export const createAutomation = async (data) => {
  const response = await axiosInstance.post('/api/automations', data);
  return response.data;
};

export const updateAutomation = async (id, data) => {
  const response = await axiosInstance.put(`/api/automations/${id}`, data);
  return response.data;
};

export const deleteAutomation = async (id) => {
  const response = await axiosInstance.delete(`/api/automations/${id}`);
  return response.data;
}; 