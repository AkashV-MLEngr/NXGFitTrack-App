import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconSource;

                    if (route.name === 'Home') {
                        iconSource = focused
                            ? require('../assets/home-active.png')
                            : require('../assets/home.png');
                    } else if (route.name === 'History') {
                        iconSource = focused
                            ? require('../assets/history-active.png')
                            : require('../assets/history.png');
                    } else if (route.name === 'Profile') {
                        iconSource = focused
                            ? require('../assets/userProfile-active.png')
                            : require('../assets/userprofile.png');
                    }

                    return <Image source={iconSource} style={{ width: size, height: size }} />;
                },
                tabBarActiveTintColor: '#56255C',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#fff',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderTopWidth: 0,
                    height: 60,
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
