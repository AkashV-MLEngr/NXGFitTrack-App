import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';

export default function ExerciseForm({ initialExercises = [], onSubmit }) {
    const [exerciseName, setExerciseName] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [notes, setNotes] = useState('');
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        setExercises(initialExercises);
    }, [initialExercises]);

    const handleAddExercise = () => {
        if (!exerciseName) return alert('Exercise name is required');

        const newExercise = {
            id: Math.floor(Math.random() * 100000),
            exercise_name: exerciseName,
            sets: Number(sets),
            reps: Number(reps),
            weight: Number(weight),
            notes,
        };

        setExercises([...exercises, newExercise]);

        // reset input fields
        setExerciseName('');
        setSets('');
        setReps('');
        setWeight('');
        setNotes('');
    };

    const handleFinish = () => {
        if (exercises.length === 0) return alert('Add at least one exercise');
        onSubmit(exercises);
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            {/* <Text style={styles.title}>Add Exercises</Text> */}

            <TextInput
                style={styles.input}
                placeholder="Exercise Name"
                placeholderTextColor="#a394b0"
                value={exerciseName}
                onChangeText={setExerciseName}
            />
            <TextInput
                style={styles.input}
                placeholder="Sets"
                placeholderTextColor="#a394b0"
                value={sets}
                keyboardType="numeric"
                onChangeText={setSets}
            />
            <TextInput
                style={styles.input}
                placeholder="Reps"
                placeholderTextColor="#a394b0"
                value={reps}
                keyboardType="numeric"
                onChangeText={setReps}
            />
            <TextInput
                style={styles.input}
                placeholder="Weight (kg)"
                placeholderTextColor="#a394b0"
                value={weight}
                keyboardType="numeric"
                onChangeText={setWeight}
            />
            <TextInput
                style={[styles.input, styles.notesInput]}
                placeholder="Notes"
                placeholderTextColor="#a394b0"
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
                <Text style={styles.addButtonText}>Add Exercise</Text>
            </TouchableOpacity>

            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.exerciseBox}>
                        <Text style={styles.exerciseName}>{item.exercise_name}</Text>
                        <Text style={styles.exerciseDetails}>
                            {item.sets} x {item.reps} | {item.weight} kg
                        </Text>
                        {item.notes ? <Text style={styles.exerciseDetails}>Notes: {item.notes}</Text> : null}
                    </View>
                )}
                style={{ width: '100%', marginVertical: 20 }}
            />

            <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                <Text style={styles.finishButtonText}>Finish</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 28,
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
        marginBottom: 15,
        fontSize: 16,
        color: '#56255C',
        backgroundColor: '#FDF6FF',
    },
    notesInput: {
        height: 100,
        paddingTop: 10,
    },
    addButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#56255C',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    exerciseBox: {
        width: '100%',
        padding: 15,
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: '#F6E7F6',
        borderWidth: 1,
        borderColor: '#E0CFF2',
    },
    exerciseName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#56255C',
    },
    exerciseDetails: {
        fontSize: 14,
        color: '#5B4B63',
        marginTop: 2,
    },
    finishButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#8B5FBF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    finishButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
