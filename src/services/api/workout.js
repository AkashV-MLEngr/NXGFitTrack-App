// src/services/api/workout.js
import api from './apiBase';
import { getToken } from '../storage/authStorage';

// Fetch all workout templates
export const getWorkoutTemplates = async () => {
    try {
        const token = await getToken();
        if (!token) throw { detail: "Token missing. Please login again." };

        const response = await api.get('/workouts/templates', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data; // array of workout templates
    } catch (error) {
        console.log('❌ Get workout templates error:', error);
        throw error?.response?.data || { detail: 'Failed to fetch workout templates' };
    }
};


// Add a new workout template
export const addWorkoutTemplate = async ({ user_id, workout_name, description, exercise_id }) => {
    try {
        const token = await getToken();
        if (!token) throw { detail: "Token missing. Please login again." };

        const response = await api.post(
            '/workouts/templates',
            { user_id, workout_name, description, exercise_id },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data; // newly created workout template
    } catch (error) {
        console.log('❌ Add workout template error:', error);
        throw error?.response?.data || { detail: 'Failed to add workout template' };
    }
};

// update workout
export const updateWorkoutTemplate = async ({ template_id, user_id, workout_name, description, exercise_id }) => {
    try {
        const token = await getToken();
        if (!token) throw { detail: "Token missing. Please login again." };

        const response = await api.put(
            `/workouts/templates/${template_id}`,
            { user_id, workout_name, description, exercise_id },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data; // updated workout template
    } catch (error) {
        console.log('❌ Update workout template error:', error);
        throw error?.response?.data || { detail: 'Failed to update workout template' };
    }
};


// add exercise
export const addExerciseToTemplate = async (template_id, exerciseData) => {
    try {
        const token = await getToken();
        if (!token) throw { detail: "Token missing. Please login again." };

        const response = await api.post(
            `/workouts/templates/${template_id}/exercises`,
            exerciseData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data; // newly created exercise
    } catch (error) {
        console.log('❌ Add exercise error:', error);
        throw error?.response?.data || { detail: 'Failed to add exercise' };
    }
};

// delete workout
export const deleteWorkoutTemplate = async (template_id) => {
    try {
        const token = await getToken();
        if (!token) throw { detail: "Token missing. Please login again." };

        const response = await api.delete(
            `/workouts/templates/${template_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data; // response from server
    } catch (error) {
        console.log('❌ Delete workout template error:', error);
        throw error?.response?.data || { detail: 'Failed to delete workout template' };
    }
};
