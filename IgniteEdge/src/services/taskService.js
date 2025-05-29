import axiosInstance from '../config/api';

export const getTasks = async (projectId) => {
  const response = await axiosInstance.get(`/api/tasks?project=${projectId}`);
  return response.data;
};

export const createTask = async (data) => {
  const response = await axiosInstance.post('/api/tasks', data);
  return response.data;
};

export const updateTask = async (id, data) => {
  const response = await axiosInstance.put(`/api/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axiosInstance.delete(`/api/tasks/${id}`);
  return response.data;
}; 