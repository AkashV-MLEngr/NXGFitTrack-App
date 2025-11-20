import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = "user_profile";

export const storeProfile = async (profile) => {
    try {
        await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
        console.log("📦 Profile stored:", profile);
    } catch (error) {
        console.log("❌ Error storing profile:", error);
    }
};

export const getProfile = async () => {
    try {
        const stored = await AsyncStorage.getItem(PROFILE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.log("❌ Error getting profile:", error);
        return null;
    }
};

export const clearProfile = async () => {
    await AsyncStorage.removeItem(PROFILE_KEY);
};
