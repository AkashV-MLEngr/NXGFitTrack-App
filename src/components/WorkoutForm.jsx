import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native';

export default function WorkoutForm({ initialData = {}, onSubmit, submitLabel = 'Next' }) {
    const [workoutName, setWorkoutName] = useState('');
    const [description, setDescription] = useState('');
    const [exerciseId, setExerciseId] = useState('');

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setWorkoutName(initialData.workout_name || '');
            setDescription(initialData.description || '');
            setExerciseId(initialData.exercise_id?.toString() || '');
        }
        // Only run on mount
    }, []);


    const handleSubmit = () => {
        if (!workoutName) return alert('Workout name is required');

        const workoutData = {
            ...initialData,
            workout_name: workoutName,
            description,
            exercise_id: exerciseId || null,
        };

        onSubmit(workoutData);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#fff' }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                {/* <Text style={styles.title}>Workout Details</Text> */}
                <TextInput
                    style={styles.input}
                    placeholder="Workout Name"
                    placeholderTextColor="#a394b0"
                    value={workoutName}
                    onChangeText={setWorkoutName}
                />
                <TextInput
                    style={[styles.input, styles.textarea]}
                    placeholder="Description"
                    placeholderTextColor="#a394b0"
                    value={description}
                    onChangeText={setDescription}
                    multiline={true}
                    numberOfLines={4} // optional: defines visible rows
                    textAlignVertical="top" // ensures text starts at top-left
                />

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>{submitLabel}</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#56255C',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#56255C',
        borderRadius: 16,
        paddingHorizontal: 15,
        marginBottom: 20,
        color: '#56255C',
        fontSize: 16,
        backgroundColor: '#fff',
    },
    textarea: {
        height: 120, // taller than normal input
        paddingTop: 10, // some top padding
    },

    submitButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#56255C',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
