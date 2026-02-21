import api from './api';

export const propertyService = {
    getAllProperties: async (params = {}) => {
        const response = await api.get('/properties/', { params });
        return response.data;
    },

    getPropertyBySlug: async (slug) => {
        const response = await api.get(`/properties/${slug}/`);
        return response.data;
    },

    createProperty: async (propertyData) => {
        const response = await api.post('/properties/', propertyData);
        return response.data;
    },

    updateProperty: async (slug, propertyData) => {
        const response = await api.put(`/properties/${slug}/`, propertyData);
        return response.data;
    },

    deleteProperty: async (slug) => {
        const response = await api.delete(`/properties/${slug}/`);
        return response.data;
    },

    getFeaturedProperties: async () => {
        const response = await api.get('/properties/featured/');
        return response.data;
    },

    getForSale: async () => {
        const response = await api.get('/properties/for_sale/');
        return response.data;
    },

    getForRent: async () => {
        const response = await api.get('/properties/for_rent/');
        return response.data;
    },

    getTrending: async () => {
        const response = await api.get('/properties/trending/');
        return response.data;
    },

    getRecent: async () => {
        const response = await api.get('/properties/recent/');
        return response.data;
    },

    getStats: async () => {
        const response = await api.get('/properties/stats/');
        return response.data;
    },

    createInquiry: async (slug, inquiryData) => {
        const response = await api.post(`/properties/${slug}/inquire/`, inquiryData);
        return response.data;
    },
};
