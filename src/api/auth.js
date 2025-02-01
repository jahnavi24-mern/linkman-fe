import axios from "axios";

const baseURL = "https://linkman-be.onrender.com/api";

import api from './api';

export const signin = async ({email, password}) => {
    try{
        const response = await axios.post(`${baseURL}/auth/signin`, { email, password });
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const signup = async ({name, email, password, confirmPassword, mobile}) => {
    try{
        const response = await axios.post(`${baseURL}/auth/signup`, { name, email, password, confirmPassword, mobile });
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const getUserDetails =  async () => {
    try {
        const response = await api.get("/auth/profile");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const editUserDetails = async ({userName, email, mobile}) => {
    try{
        const response = await api.post(`/auth/edit-profile`, { email, userName, mobile });
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}