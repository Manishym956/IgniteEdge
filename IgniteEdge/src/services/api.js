import axios from 'axios';

const API_URL = 'http://localhost:1600/api';

export const employeeService = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_URL}/employees/${id}`);
    return response.data;
  },

  create: async (employee) => {
    const response = await axios.post(`${API_URL}/employees`, employee);
    return response.data;
  },

  update: async (id, employee) => {
    const response = await axios.put(`${API_URL}/employees/${id}`, employee);
    return response.data;
  },

  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/employees/${id}`);
    return response.data;
  }
}; 