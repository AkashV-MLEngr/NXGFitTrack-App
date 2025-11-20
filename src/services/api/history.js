import api from './apiBase';
import { getToken } from '../storage/authStorage';


export const markWorkoutCompleted = async ({ user_id, template_id, workout_name, total_volume }) => {
    try {
        const token = await getToken();
        if (!token) throw { detail: 'Token missing. Please login again.' };

        const response = await api.post(
            '/history/complete',
            { user_id, template_id, workout_name, total_volume },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data; // server response
    } catch (error) {
        console.log('❌ Mark workout completed error:', error);
        throw error?.response?.data || { detail: 'Failed to mark workout as completed' };
    }
};

// Fetch all completed workouts / history
export const getWorkoutHistory = async () => {
    try {
        const token = await getToken();
        if (!token) throw { detail: 'Token missing. Please login again.' };

        const response = await api.get('/history/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // array of completed workouts
    } catch (error) {
        console.log('❌ Get workout history error:', error);
        throw error?.response?.data || { detail: 'Failed to fetch workout history' };
    }
};

// clear all history
export const deleteAllWorkoutHistory = async () => {
    try {
        const token = await getToken();
        if (!token) throw { detail: 'Token missing. Please login again.' };

        const response = await api.delete('/history/all', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // server response
    } catch (error) {
        console.log('❌ Delete all workout history error:', error);
        throw error?.response?.data || { detail: 'Failed to delete workout history' };
    }
};