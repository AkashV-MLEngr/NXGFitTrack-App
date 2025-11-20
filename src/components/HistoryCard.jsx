import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HistoryCard({ workoutName, date, onPress }) {
    return (
        <View style={styles.card}>
            <View style={styles.left}>
                <Text style={styles.workoutName}>{workoutName}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <View style={styles.right}>
                <Image
                    source={require('../assets/completed.png')}
                    style={styles.completedIcon}
                    resizeMode="contain"
                />
                <Text style={styles.completedText}>Completed</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#56255C',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        borderLeftWidth: 6,
        borderLeftColor: '#893b93ff'
    },
    left: {
        flexDirection: 'column',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    workoutName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    date: {
        color: '#f0e6f6',
        fontSize: 14,
    },
    completedIcon: {
        width: 20,
        height: 20,
        marginRight: 6,
        tintColor: '#05a505ff', // optional to tint the icon white
    },
    completedText: {
        color: '#05a505ff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
