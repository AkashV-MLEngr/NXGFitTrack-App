import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native';
import WorkoutCard from '../components/WorkoutCard';
import { useUserStore } from '../store/useUserStore';
import { getWorkoutTemplates } from '../services/api/workout';

export default function HomeScreen({ navigation }) {
    const user = useUserStore((state) => state.user);

    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Fetch workouts
    const fetchWorkouts = useCallback(async () => {
        try {
            const data = await getWorkoutTemplates();
            setWorkouts(data);
        } catch (err) {
            console.log('Failed to fetch workouts:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWorkouts();
    }, [fetchWorkouts]);

    // Pull-to-refresh handler
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchWorkouts();
        setRefreshing(false);
    }, [fetchWorkouts]);

    const handleCardPress = (workout) => {
        navigation.navigate('View Workout', { workout });
    };

    const handleAddWorkout = () => {
        navigation.navigate('Add Workout');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Workouts</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddWorkout}>
                    <Text style={styles.addButtonText}>+ Add</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={workouts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <WorkoutCard workout={item} onPress={() => handleCardPress(item)} />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 70 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    !loading && (
                        <View style={{ padding: 20, alignItems: 'center' }}>
                            <Text>No workouts added yet.</Text>
                        </View>
                    )
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        zIndex: 10,
        marginTop: 20,
    },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#56255C' },
    addButton: {
        backgroundColor: '#56255C',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
