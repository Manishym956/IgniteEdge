import axiosInstance from '../config/api';

export const getProjects = async () => {
  const response = await axiosInstance.get('/api/projects');
  return response.data;
};

export const createProject = async (data) => {
  const response = await axiosInstance.post('/api/projects', data);
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await axiosInstance.get(`/api/projects/${id}`);
  return response.data;
};

export const inviteMember = async (id, email) => {
  const response = await axiosInstance.post(`/api/projects/${id}/invite`, { email });
  return response.data;
}; 