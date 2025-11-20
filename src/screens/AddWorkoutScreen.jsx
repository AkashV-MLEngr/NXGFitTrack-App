import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WorkoutForm from '../components/WorkoutForm';
import { addWorkoutTemplate } from '../services/api/workout';
import { useUserCredStore } from '../store/useUserStore';

export default function AddWorkoutScreen({ navigation }) {
    const userCred = useUserCredStore((state) => state.credentials);
    console.log('addwork', userCred?.user_id)
    const handleWorkoutSubmit = async (workoutData) => {
        try {
            const userCred = useUserCredStore.getState().credentials; // get user_id from store

            if (!userCred?.user_id) {
                console.log("❌ User ID not found");
                return;
            }

            // Call API to add new workout
            const newWorkout = await addWorkoutTemplate({
                user_id: userCred.user_id,
                workout_name: workoutData.workout_name,
                description: workoutData.description,
                exercise_id: workoutData.exercise_id || null,
            });

            console.log('New workout created:', newWorkout);

            // Navigate to Add Exercise screen with the created workout ID
            navigation.navigate('Add Exercise', { workoutId: newWorkout.id });

        } catch (error) {
            console.log('❌ Failed to create workout:', error.detail || error);
        }
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <WorkoutForm onSubmit={handleWorkoutSubmit} submitLabel="Next" />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
