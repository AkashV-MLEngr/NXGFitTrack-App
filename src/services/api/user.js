import api from './apiBase';
import { getToken } from '../storage/authStorage';


//   Get basic user info
export const getUser = async () => {
    try {
        const token = await getToken();
        if (!token) throw { detail: "Token missing. Please login again." };

        const response = await api.get('/users/me', {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.log("❌ Get user error:", error);
        throw error?.response?.data || { detail: "Failed to fetch user" };
    }
};

//   Get user profile
export const getUserProfile = async () => {
    try {
        const token = await getToken();
        if (!token) throw { detail: "Token missing. Please login again." };

        const response = await api.get('/users/me/profile', {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.log("❌ Get profile error:", error);
        throw error?.response?.data || { detail: "Failed to fetch profile" };
    }
};


//   Add or update user profile
export const addOrUpdateUserProfile = async ({ user_id, name, weight, height }) => {
    try {
        console.log('addOrUpdateUserProfile called');
        const token = await getToken();
        if (!token) throw { detail: "Token missing. Please login again." };

        const response = await api.post(
            '/users/me/profile',
            { user_id, name, weight, height }, // include user_id
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Profile added/updated:', response.data);
        return response.data;
    } catch (error) {
        console.log("❌ Add/update profile error:", error.response?.data || error.message || error);
        throw error?.response?.data || { detail: "Failed to add/update profile" };
    }
};
