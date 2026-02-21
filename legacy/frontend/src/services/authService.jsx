import api from './api';

export const authService = {
    login: async (credentials) => {
        const response = await api.post('/auth/login/', credentials);
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post('/auth/registration/', userData);
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/auth/logout/');
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/user/');
        return response.data;
    },

    updateProfile: async (userData) => {
        const response = await api.put('/auth/user/', userData);
        return response.data;
    },

    resetPassword: async (email) => {
        const response = await api.post('/auth/password/reset/', { email });
        return response.data;
    },
};