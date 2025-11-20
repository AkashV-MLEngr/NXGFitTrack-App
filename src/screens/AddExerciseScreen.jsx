import React from 'react';
import {
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import ExerciseForm from '../components/ExerciseForm';
import { addExerciseToTemplate } from '../services/api/workout';

export default function AddExerciseScreen({ route, navigation }) {
    const { workoutId } = route.params;
    console.log('exercise workid', workoutId)

    const handleExerciseSubmit = async (exercises) => {
        try {
            const createdExercises = [];
            for (const ex of exercises) {
                const newExercise = await addExerciseToTemplate(workoutId, ex);
                createdExercises.push(newExercise);
            }

            console.log('Success', 'Workout and exercises created successfully!');
            navigation.popToTop();
        } catch (err) {
            console.log('Error adding exercises:', err);
            console.log('Error', err.detail || 'Failed to add exercises');
        }
    };


    return (<KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
                <ExerciseForm initialExercises={[]} onSubmit={handleExerciseSubmit} />
            </SafeAreaView>
        </ScrollView>
    </KeyboardAvoidingView>
    );
}
