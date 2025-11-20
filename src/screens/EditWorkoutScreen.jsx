import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import WorkoutForm from '../components/WorkoutForm';
import { updateWorkoutTemplate } from '../services/api/workout';
import { useUserCredStore } from '../store/useUserStore';

export default function EditWorkoutScreen({ route, navigation }) {
    const { workout } = route.params;
    console.log('old workout:', workout);

    const userCred = useUserCredStore((state) => state.credentials); // to get user_id
    const [loading, setLoading] = useState(false);

    const handleWorkoutSubmit = async (updatedWorkout) => {
        if (!userCred) {
            Alert.alert("Error", "User credentials not found.");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                template_id: workout.id,
                user_id: userCred.user_id,
                workout_name: updatedWorkout.workout_name,
                description: updatedWorkout.description,
                exercise_id: updatedWorkout.exercise_id || null,
            };

            const res = await updateWorkoutTemplate(payload);
            console.log('Updated workout from API:', res);

            Alert.alert("Success", "Workout updated successfully!");
            // Navigate to Add Exercise screen with the updated workout id
            navigation.navigate('Add Exercise', { workoutId: res.id });
        } catch (error) {
            console.log('❌ Update workout error:', error);
            Alert.alert("Error", error.detail || "Failed to update workout");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <WorkoutForm
                initialData={workout}
                onSubmit={handleWorkoutSubmit}
                submitLabel="Update"
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
