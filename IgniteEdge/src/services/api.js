import axiosInstance from '../config/api';

export const employeeService = {
  getAll: async () => {
    const response = await axiosInstance.get('/api/employees');
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/api/employees/${id}`);
    return response.data;
  },

  create: async (employee) => {
    const response = await axiosInstance.post('/api/employees', employee);
    return response.data;
  },

  update: async (id, employee) => {
    const response = await axiosInstance.put(`/api/employees/${id}`, employee);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/api/employees/${id}`);
    return response.data;
  }
}; 