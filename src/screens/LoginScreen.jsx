import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Platform
} from 'react-native';
import { loginUser } from '../services/api/auth';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError("");

        if (!username || !password) {
            setError("Please enter username and password");
            return;
        }

        try {
            const res = await loginUser(username, password);

            console.log("🔥 Login Success:", res);
            navigation.replace('Success');

        } catch (err) {
            console.log("🚨 LOGIN ERROR:", err);
            setError(err?.detail || "Invalid username or password");
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>

                    <Text style={styles.tagline}>Track your workouts. Achieve your goals.</Text>
                    {error ? <Text style={styles.error}>{error}</Text> : null}

                    <TextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                        autoCapitalize="none"
                        placeholderTextColor="#9843a3ff"
                    />

                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                        placeholderTextColor="#9843a3ff"
                    />

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    <View style={styles.signupContainer}>
                        <Text>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.signupText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
    tagline: { fontSize: 16, color: '#555', marginBottom: 30, textAlign: 'center' },
    error: { color: "red", marginBottom: 8 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 16,
        paddingHorizontal: 15,
        marginBottom: 20,
        color: '#56255C'
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#56255C',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    signupContainer: { flexDirection: 'row', alignItems: 'center' },
    signupText: { color: '#007bff', fontWeight: 'bold' },
});
