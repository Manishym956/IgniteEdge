import axiosInstance, { API_URL } from '../config/api';

const authService = {
    login: async (email, password) => {
        const response = await axiosInstance.post('/api/auth/login', { email, password });
        return response.data;
    },

    register: async (name, email, password) => {
        try {
            console.log('Sending registration request:', { name, email }); // Debug log

            const response = await axiosInstance.post('/api/auth/register', {
                name,
                email,
                password
            });

            console.log('Registration response:', response.data); // Debug log
            return response.data;
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            throw error.response?.data || { message: 'An unexpected error occurred' };
        }
    },

    logout: async () => {
        const response = await axiosInstance.get('/api/auth/logout');
        return response.data;
    },

    verifyEmail: async (userId, otp) => {
        try {
            const response = await axiosInstance.post('/api/auth/verify-account', { 
                userId, 
                otp 
            });
            return response.data;
        } catch (error) {
            console.error('Email verification error:', error.response?.data || error.message);
            throw error.response?.data || { message: 'Verification failed' };
        }
    },

    sendVerifyOtp: async (userId) => {
        try {
            console.log('Sending OTP request for userId:', userId); // Debug log

            const response = await axiosInstance.post('/api/auth/send-verify-otp', { userId });
            
            console.log('OTP response:', response.data); // Debug log
            return response.data;
        } catch (error) {
            console.error('Send OTP error:', error.response?.data || error.message);
            throw error.response?.data || { message: 'Failed to send OTP' };
        }
    },

    isAuthenticated: async () => {
        try {
            const response = await axiosInstance.post('/api/auth/is-auth'); 
            return response.data;
        } catch (error) {
            console.error('Auth check error:', error);
            return { success: false };
        }
    },

    sendResetOtp: async (email) => {
        try {
            console.log('Sending reset OTP API request for:', email); // Debug log
            const response = await axiosInstance.post('/api/auth/send-reset-otp', { email });
            console.log('API Response:', response.data); // Debug log
            return response.data;
        } catch (error) {
            console.error('API Error:', error.response?.data || error); // Debug log
            throw error.response?.data || { message: 'Failed to send OTP' };
        }
    },

    resetPassword: async (email, otp, newPassword) => {
        try {
            const response = await axiosInstance.post('/api/auth/reset-password', {
                email,
                otp,
                newPassword
            });
            return response.data;
        } catch (error) {
            console.error('Reset password error:', error);
            throw error.response?.data || { message: 'Failed to reset password' };
        }
    }
};

export default authService;