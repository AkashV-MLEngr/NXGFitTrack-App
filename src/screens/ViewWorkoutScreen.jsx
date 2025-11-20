import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
    Pressable,
    Image,
    Alert,
    ImageBackground,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import { markWorkoutCompleted } from '../services/api/history';
import { useUserCredStore } from '../store/useUserStore';
import { deleteWorkoutTemplate } from '../services/api/workout';
const { height, width } = Dimensions.get('window');

export default function ViewWorkoutScreen({ route, navigation }) {
    const { workout } = route.params;
    const [exercises, setExercises] = useState(workout.template_exercises);
    const [modalVisible, setModalVisible] = useState(false);
    const userCred = useUserCredStore((state) => state.credentials);

    const handleEdit = () => {
        navigation.navigate('Edit Workout', { workout });
    };

    const handleDeleteConfirmed = async () => {
        try {
            setModalVisible(false);

            // Call API to delete the workout template
            await deleteWorkoutTemplate(workout.id);

            // Optional: show success message
            Alert.alert('Success', 'Workout deleted successfully');

            // Navigate back to Home or previous screen
            navigation.popToTop();
        } catch (error) {
            console.log('❌ Delete workout error:', error);
            Alert.alert('Error', error.detail || 'Failed to delete workout');
        }
    };

    const handleCompleteWorkout = async () => {
        try {
            // Get current user from Zustand
            if (!userCred) throw { detail: 'User not found' };

            console.log('Completing workout:', workout.id);

            // Call API to mark workout as completed
            const result = await markWorkoutCompleted({
                user_id: userCred.user_id,
                template_id: workout.id, // assuming workout.id is template_id
                workout_name: workout.workout_name,
                total_volume: workout.total_volume || 0, // pass actual volume if available
            });

            console.log('Workout marked as completed:', result);

            // Optional: update local state or store in Zustand
            // Example: add completed workout to user.completedWorkouts array
            // const updatedUser = {
            //   ...user,
            //   completedWorkouts: [...(user.completedWorkouts || []), result],
            // };
            // useUserStore.getState().setUser(updatedUser);

            // Redirect back to Home
            navigation.popToTop();

        } catch (error) {
            console.log('Error completing workout:', error);
            console.log('Error', error.detail || 'Failed to complete workout');
        }
    };



    return (
        <SafeAreaView style={styles.container}>
            {/* Top Image */}
            <ImageBackground
                source={require('../assets/work-push.png')}
                style={styles.topImage}
                resizeMode="cover"
            >
                {/* Optional overlay for gradient */}
                <View style={styles.overlay} />
            </ImageBackground>

            {/* Content below image */}
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>{workout.workout_name}</Text>
                    <View style={styles.headerButtons}>
                        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                            <Image
                                source={require('../assets/edit.png')}
                                style={styles.editIcon}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => setModalVisible(true)}
                        >
                            <Image
                                source={require('../assets/delete.png')}
                                style={styles.deleteIcon}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.description}>{workout.description}</Text>

                <FlatList
                    data={exercises}
                    keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                    renderItem={({ item }) => (
                        <View style={styles.exerciseBox}>
                            <Text style={styles.exerciseName}>{item.exercise_name}</Text>
                            <Text style={styles.eitem}>
                                {item.sets} sets x {item.reps} reps | {item.weight} kg
                            </Text>
                            {item.notes ? <Text style={styles.enotes}>Notes: {item.notes}</Text> : null}
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text style={{ textAlign: 'center', marginTop: 20, color: '#555' }}>
                            No exercises available
                        </Text>
                    }
                />
                {/* Complete Workout Button */}
                <View style={styles.completeBtnWrapper}>
                    <TouchableOpacity style={styles.completeBtn} onPress={handleCompleteWorkout}>
                        <Text style={styles.completeBtnText}>Finish Workout</Text>
                    </TouchableOpacity>
                </View>

            </View>

            {/* Delete Confirmation Modal */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you confirm to delete workout?</Text>
                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.modalButton, styles.deleteButtonModal]}
                                onPress={handleDeleteConfirmed}
                            >
                                <Text style={styles.modalButtonText}>Delete</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    topImage: {
        width: '100%',
        height: height * 0.3, // 30% of screen height
        justifyContent: 'flex-end', // content can be bottom if needed
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(86,37,92,0.3)', // optional gradient/overlay
    },
    content: {
        flex: 1,
        padding: 15,
        marginTop: 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerButtons: { flexDirection: 'row' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#56255C' },
    description: { fontSize: 16, color: '#67486bff', marginBottom: 15 },
    exerciseBox: {
        backgroundColor: '#761f81ff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#56255C',
    },
    exerciseName: { fontWeight: 'bold', color: '#fff', marginBottom: 5 },
    eitem: { color: '#ffffffff', fontSize: 14, marginBottom: 3 },
    enotes: { color: '#d7d6d6ff', fontSize: 13, fontStyle: 'italic' },

    editButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginRight: 10 },
    editIcon: { width: 24, height: 24, tintColor: '#56255C' },
    deleteButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    deleteIcon: { width: 24, height: 24, tintColor: '#B20000' },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: '#fff', width: '80%', borderRadius: 12, padding: 20, alignItems: 'center' },
    modalText: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
    modalButton: { flex: 1, paddingVertical: 10, borderRadius: 8, marginHorizontal: 5, alignItems: 'center' },
    cancelButton: { backgroundColor: '#ccc' },
    deleteButtonModal: { backgroundColor: '#ff4d4d' },
    modalButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    completeBtnWrapper: {
        width: '100%',
        padding: 15,
        backgroundColor: '#fff',
    },

    completeBtn: {
        backgroundColor: '#56255C',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },

    completeBtnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },


});
