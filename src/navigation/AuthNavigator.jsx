import React, { useEffect, useState } from 'react';
import { SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Auth screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

// App screens / navigator
import MainTabNavigator from './MainTabNavigator';
import EditProfileScreen from '../screens/EditProfileScreen';
import AddWorkoutScreen from '../screens/AddWorkoutScreen';
import ViewWorkoutScreen from '../screens/ViewWorkoutScreen';
import EditWorkoutScreen from '../screens/EditWorkoutScreen';
import EditExerciseScreen from '../screens/EditExerciseScreen';
import AddExerciseScreen from '../screens/AddExerciseScreen';
import SuccessScreen from '../screens/SuccessScreen';

// storage helper (adjust path if your file is elsewhere)
import { getToken } from '../services/storage/authStorage';

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        let mounted = true;
        const check = async () => {
            try {
                const token = await getToken();
                if (!mounted) return;
                setLoggedIn(!!token);
            } catch (err) {
                console.warn('AuthNavigation: token check failed', err);
                if (!mounted) return;
                setLoggedIn(false);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        check();
        return () => { mounted = false; };
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.center}>
                <ActivityIndicator size="large" color="#56255C" />
            </SafeAreaView>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={isLoggedIn ? 'Main' : 'Login'}
                screenOptions={{
                    headerTintColor: '#56255C',
                    headerTitleAlign: 'center',
                }}
            >
                {/** Auth stack */}
                {!isLoggedIn && (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Signup" component={SignupScreen} />
                    </>
                )}

                {/** App stack (Main + other screens). When logged in this will be used. */}
                <Stack.Screen
                    name="Main"
                    component={MainTabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
                <Stack.Screen name="Add Workout" component={AddWorkoutScreen} />
                <Stack.Screen name="View Workout" component={ViewWorkoutScreen} />
                <Stack.Screen name="Edit Workout" component={EditWorkoutScreen} />
                <Stack.Screen name="Edit Exercise" component={EditExerciseScreen} />
                <Stack.Screen name="Add Exercise" component={AddExerciseScreen} />
                <Stack.Screen
                    name="Success"
                    component={SuccessScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
