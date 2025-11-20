import React from 'react';
import { SafeAreaView } from 'react-native';
import ExerciseForm from '../components/ExerciseForm';

export default function EditExercise({ route, navigation }) {
    const { workout } = route.params;

    const handleExerciseSubmit = (exercises) => {
        const updatedWorkout = { ...workout, template_exercises: exercises };
        // Send updatedWorkout to backend

        alert('Workout Updated Successfully!');
        navigation.popToTop();
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <ExerciseForm initialExercises={workout.template_exercises} onSubmit={handleExerciseSubmit} />
        </SafeAreaView>
    );
}
