import api from './apiBase';
import qs from 'qs';
import { storeToken } from '../storage/authStorage';

export const signupUser = async (email, password) => {
    try {
        const response = await api.post('/auth/signup', { email, password });
        return response.data;
    } catch (error) {
        throw error?.response?.data || { detail: "Signup failed" };
    }
};

export const loginUser = async (username, password) => {
    try {
        const formData = qs.stringify({ username, password });

        const response = await api.post(
            '/auth/token',
            formData,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        await storeToken(response.data.access_token);

        return response.data;
    } catch (error) {
        throw error?.response?.data || { detail: "Login failed" };
    }
};
