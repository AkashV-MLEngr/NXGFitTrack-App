import axios from 'axios';
import { getToken } from '../storage/authStorage';

const api = axios.create({
    baseURL: 'http://10.235.141.21:8000',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
    async (config) => {
        try {
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (err) {
            console.warn('[apiBase] getToken failed:', err);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
