import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserCredStore } from '../store/useUserStore';
import { getUser } from '../services/api/user';

const { height } = Dimensions.get("window");

export default function SuccessScreen({ navigation }) {

    const setCredentials = useUserCredStore((state) => state.setCredentials);

    const handleStart = async () => {
        try {
            const user = await getUser();
            console.log('success.js userid', user.id)

            const userData = {
                user_id: user.id,
                email: user.email,
                created_at: user.created_at, // add created_at
            };

            // Save in Zustand
            setCredentials(userData);

            // Save in AsyncStorage
            await AsyncStorage.setItem(
                "userCredentials",
                JSON.stringify(userData)
            );
            console.log("success.js Credentials in store:", useUserCredStore.getState().credentials);


            // Navigate to Home
            navigation.replace("Main");

        } catch (error) {
            console.log("PROFILE FETCH ERROR:", error);
            Alert.alert("Error", error.detail || "Failed to fetch user");
        }
    };


    return (
        <View style={styles.container}>

            {/* 50% Illustration */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/profile.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomContainer}>
                <Text style={styles.title}>Welcome!</Text>
                <Text style={styles.subtitle}>
                    Your account is ready. Start exploring your fitness journey!
                </Text>

                <TouchableOpacity
                    style={styles.startButton}
                    onPress={handleStart}
                >
                    <Text style={styles.startButtonText}>Start</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", alignItems: "center" },
    imageContainer: {
        height: height * 0.50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    image: { width: "80%", height: "80%" },
    bottomContainer: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 20,
        alignItems: "center"
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#56255C",
        marginTop: 10
    },
    subtitle: {
        textAlign: "center",
        color: "#777",
        marginTop: 10,
        fontSize: 16,
        paddingHorizontal: 20
    },
    startButton: {
        width: "100%",
        height: 52,
        backgroundColor: "#56255C",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    },
    startButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    }
});
