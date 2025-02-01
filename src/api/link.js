import api from './api';

export const createLink =  async (url, remarks, dateTime) => {
    try {
        const response = await api.post("/link/create", {
            destinationURL: url,
            remarks: remarks,
            linkExpiration: dateTime
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const fetchLink = async (id) => {
    try {
        const response = await api.get(`/link/${id}`);

        return response.data;

    }  catch(error) {
        throw error.response?.data || error.message;
    }
}

export const fetchLinks = async (page, limit, sortBy, order) => {
    try {
        const response = await api.get(`/link`, {
            params: {
                page,
                limit,
                sortBy,
                order
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const editLink = async (id, url, remarks, dateTime) => {
    try {
        const response = await api.post(`/link/edit/${id}`, {
            destinationURL: url,
            remarks: remarks,
            linkExpiration: dateTime
        });

        return response.data;

    }  catch(error) {
        throw error.response?.data || error.message;
    }
}

export const deleteLink = async (id) => {
    try {
        const response = await api.delete(`/link/${id}`);

        return response.data;

    }  catch(error) {
        throw error.response?.data || error.message;
    }
}

export const fetchAnalytics = async () => {
    try {
        const response = await api.get(`/analytics/user`);

        return response.data;

    }  catch(error) {
        throw error.response?.data || error.message;
    }
}

export const dashboardAnalytics = async () => {
    try {
        const response = await api.get(`/analytics`);

        return response.data;

    }  catch(error) {
        throw error.response?.data || error.message;
    }
}

export const searchRemarks = async (query) => {
    try {
        const response = await api.get(`/link/search?remark=${query}`);
        
        return response.data;
      } catch (error) {
        console.error('Error searching links:', error);
      }
}