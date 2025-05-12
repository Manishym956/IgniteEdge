import axios from 'axios';

const API_URL = 'http://localhost:1600/api/auth';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

const authService = {
    login: async (email, password) => {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    },

    register: async (name, email, password) => {
        try {
            console.log('Sending registration request:', { name, email }); // Debug log

            const response = await axios.post(`${API_URL}/register`, {
                name,
                email,
                password
            });

            console.log('Registration response:', response.data); // Debug log
            return response.data;
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            throw error.response?.data || error;
        }
    },

    logout: async () => {
        const response = await axios.get(`${API_URL}/logout`);
        return response.data;
    },

    verifyEmail: async (userId, otp) => {
        try {
            const response = await axios.post(`${API_URL}/verify-account`, { 
                userId, 
                otp 
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    sendVerifyOtp: async (userId) => {
        try {
            console.log('Sending OTP request for userId:', userId); // Debug log

            const response = await axios.post(`${API_URL}/send-verify-otp`, { userId });
            
            console.log('OTP response:', response.data); // Debug log
            return response.data;
        } catch (error) {
            console.error('Send OTP error:', error.response?.data || error.message);
            throw error.response?.data || error;
        }
    }
};

export default authService;
