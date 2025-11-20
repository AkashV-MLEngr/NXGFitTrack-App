import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { getUserProfile, addOrUpdateUserProfile } from '../services/api/user';
import { useUserStore, useUserCredStore } from '../store/useUserStore';

export default function EditProfileScreen({ navigation }) {
    const user = useUserStore((state) => state.user);
    const userCred = useUserCredStore((state) => state.credentials);

    console.log('user id edit profile:', user?.id);
    console.log('user id userCred profile:', userCred?.user_id);


    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load existing profile
        const loadProfile = async () => {
            try {
                const profile = await getUserProfile();
                setName(profile.name || '');
                setWeight(profile.weight?.toString() || '');
                setHeight(profile.height?.toString() || '');
            } catch (err) {
                console.log("Error", err.detail || "Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    const updateUserProfile = useUserStore((state) => state.updateUserProfile);
    const handleSave = async () => {
        try {
            const updatedProfile = {
                user_id: userCred?.user_id,
                name,
                weight: parseFloat(weight),
                height: parseFloat(height),
            };
            console.log('Updating profile:', updatedProfile);

            const res = await addOrUpdateUserProfile(updatedProfile);
            console.log('Profile updated:', res);

            // Save updated profile in Zustand
            updateUserProfile(res);
            console.log("user profile:", useUserStore.getState().user);
            console.log("user credentials:", useUserCredStore.getState().credentials);


            Alert.alert("Success", "Profile updated successfully!");
            navigation.goBack();
        } catch (err) {
            console.log("PROFILE UPDATE ERROR:", err);
            Alert.alert("Error", err.detail || "Failed to update profile");
        }
    };
    // const handleSave = async () => {
    //     try {
    //         const updatedProfile = {
    //             user_id: user.id, // ensure this comes from route.params or Zustand
    //             name,
    //             weight: parseFloat(weight),
    //             height: parseFloat(height),
    //         };

    //         console.log('Updating profile:', updatedProfile);

    //         const res = await addOrUpdateUserProfile(updatedProfile);
    //         console.log('Profile updated:', res);

    //         Alert.alert("Success", "Profile updated successfully!");
    //         navigation.goBack();
    //     } catch (err) {
    //         console.log("PROFILE UPDATE ERROR:", err);
    //         Alert.alert("Error", err.detail || "Failed to update profile");
    //     }
    // };


    if (loading) return null; // Add a spinner if you want

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#999"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Weight (kg)"
                    value={weight}
                    onChangeText={setWeight}
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Height (cm)"
                    value={height}
                    onChangeText={setHeight}
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 16,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        color: '#56255C',
    },
    saveButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#56255C',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
