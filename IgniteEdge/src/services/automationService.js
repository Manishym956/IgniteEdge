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
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const deleteAutomation = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return res.json();
}; 