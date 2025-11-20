import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { signupUser } from '../services/api/auth';
import {

    KeyboardAvoidingView,
} from 'react-native';
export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSignup = async () => {
        setError(""); // clear previous error

        console.log("Entered email:", email);
        console.log("Entered password:", password);

        // Empty fields
        if (!email || !password || !confirmPassword) {
            setError("Please fill all fields");
            return;
        }

        // Email format check
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        // Password match check
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await signupUser(email, password);
            // console.log("Signup Success:", res);

            navigation.replace('Login');

        } catch (err) {
            // console.log(" SIGNUP ERROR:", err);
            setError(err.detail || "Signup failed. Try again.");
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
                    {/* Small motivational line */}
                    <Text style={styles.tagline}>Start your fitness journey today!</Text>

                    {/* <Text style={styles.title}>Signup</Text> */}

                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        autoCapitalize="none"
                        keyboardType="email-address"
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


                    <TextInput
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        style={styles.input}
                        secureTextEntry
                        placeholderTextColor="#9843a3ff"
                    />
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}


                    <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                        <Text style={styles.signupButtonText}>Signup & Login</Text>
                    </TouchableOpacity>

                    <View style={styles.loginContainer}>
                        <Text>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.loginText}>Login</Text>
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
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 16,
        paddingHorizontal: 15,
        marginBottom: 20,
        color: "#56255C"
    },
    signupButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#56255C',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 14,
    },

    signupButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    loginContainer: { flexDirection: 'row', alignItems: 'center' },
    loginText: { color: '#007bff', fontWeight: 'bold' },
});
