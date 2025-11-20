import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AddWorkoutScreen from '../screens/AddWorkoutScreen';
import ViewWorkoutScreen from '../screens/ViewWorkoutScreen';
import EditWorkoutScreen from '../screens/EditWorkoutScreen';
import MainTabNavigator from './MainTabNavigator';

import EditExerciseScreen from '../screens/EditExerciseScreen';
import AddExerciseScreen from '../screens/AddExerciseScreen';
import SuccessScreen from '../screens/SuccessScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerTintColor: '#56255C',
                headerTitleAlign: 'center', // Center the title horizontally
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
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
    );
}
