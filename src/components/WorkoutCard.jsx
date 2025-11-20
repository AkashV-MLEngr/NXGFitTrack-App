import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const workoutImages = [
    require('../assets/work1.png'),
    require('../assets/work2.png'),
    require('../assets/work3.png'),
    require('../assets/work4.png'),
    require('../assets/work5.png'),
    require('../assets/work6.png'),
    require('../assets/work-push.png'),

];
export default function WorkoutCard({ workout, onPress }) {
    const exerciseCount = workout.template_exercises.length;
    const randomImage = workoutImages[Math.floor(Math.random() * workoutImages.length)];

    return (
        <TouchableOpacity style={styles.cardWrapper} onPress={onPress}>
            <ImageBackground
                source={randomImage}
                style={styles.card}
                imageStyle={{ borderRadius: 16 }}
            >
                {/* Gradient overlay */}
                <View style={styles.overlay} />

                {/* Card content */}
                <View style={styles.content}>
                    <Text style={styles.title}>{workout.workout_name}</Text>
                    <Text style={styles.description}>{workout.description}</Text>
                    <Text style={styles.count}>{exerciseCount} exercises</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardWrapper: {
        marginVertical: 10,
        alignItems: 'center',
    },
    card: {
        width: width * 0.9,
        height: 150,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(86, 37, 92, 0.7)',
        borderRadius: 16,
    },
    content: {
        padding: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 5,
    },
    count: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
    },
});
