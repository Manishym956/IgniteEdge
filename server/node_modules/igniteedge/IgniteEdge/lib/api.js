import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:1600/api',
  withCredentials: true, 
});

export const loginUser = async (email, password) => {
  const res = await API.post('/auth/login', { email, password });
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await API.post('/auth/register', userData);
  return res.data;
};

export const logoutUser = async () => {
  const res = await API.post('/auth/logout');
  return res.data;
};

export const getUserProfile = async () => {
  const res = await API.get('/user/profile');
  return res.data;
};

export const updateUserProfile = async (updatedData) => {
  const res = await API.put('/user/update', updatedData);
  return res.data;
};
