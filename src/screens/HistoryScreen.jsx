import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Alert, Image, RefreshControl } from 'react-native';
import HistoryCard from '../components/HistoryCard';
import deleteIcon from '../assets/delete.png';
import MetricsCard from '../components/MetricsCard';
import { getWorkoutHistory, deleteAllWorkoutHistory } from '../services/api/history'; // import your function
import { useUserStore } from '../store/useUserStore';

export default function HistoryScreen({ navigation }) {
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Sample metrics data
    const trainingVolumeData = [
        { date: 'Mon', volume: 1200 },
        { date: 'Wed', volume: 1500 },
        { date: 'Fri', volume: 1800 },
    ];
    const personalBestData = [
        { exercise_name: 'Bench Press', max_weight: 100 },
        { exercise_name: 'Squat', max_weight: 150 },
        { exercise_name: 'Deadlift', max_weight: 180 },
    ];

    const fetchHistory = useCallback(async () => {
        const setHistoryCount = useUserStore.getState().setHistoryCount;

        try {
            const data = await getWorkoutHistory();
            setHistoryData(data);

            // Store count in Zustand
            setHistoryCount(data.length);
        } catch (error) {
            console.log('❌ Failed to fetch workout history:', error);
            Alert.alert('Error', error.detail || 'Failed to fetch workout history');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const handleViewWorkout = (id) => {
        navigation.navigate('ViewWorkout', { workoutId: id });
    };

    const handleClearHistory = async () => {
        Alert.alert(
            'Clear History',
            'Are you sure you want to clear all history?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            const result = await deleteAllWorkoutHistory();
                            console.log('History cleared:', result);
                            Alert.alert('Success', 'All history has been cleared.');
                        } catch (error) {
                            console.log('Failed to clear history:', error);
                            Alert.alert('Error', error.detail || 'Failed to clear history');
                        }
                    },
                },
            ]
        );
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchHistory();
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading history...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Workout History</Text>
                <TouchableOpacity onPress={handleClearHistory} style={styles.clearButton}>
                    <Image source={deleteIcon} style={styles.icon} />
                    <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>
            </View>

            {/* Metrics */}
            <View>
                <MetricsCard
                    trainingVolumeData={trainingVolumeData}
                    personalBestData={personalBestData}
                /></View>

            {/* Workout History List */}
            {historyData.length === 0 ? (
                <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666' }}>
                    No workouts completed yet
                </Text>
            ) : (
                <FlatList
                    data={historyData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <HistoryCard
                            workoutName={item.workout_name}
                            date={new Date(item.completed_at).toLocaleDateString()}
                            onPress={() => handleViewWorkout(item.id)}
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#56255C',
    },
    clearButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 6,
        resizeMode: 'contain',
    },
    clearText: {
        color: '#B20000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
