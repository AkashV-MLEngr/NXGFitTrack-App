import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserCredStore = create((set) => ({
    credentials: null, // { user_id, email, }

    setCredentials: (data) => set({ credentials: data }),

    loadCredentialsFromStorage: async () => {
        try {
            const saved = await AsyncStorage.getItem('userCredentials');
            if (saved) set({ credentials: JSON.parse(saved) });
        } catch (err) {
            console.log('❌ Failed to load credentials from storage', err);
        }
    },

    updateCredentials: async (data) => {
        set({ credentials: data });
        await AsyncStorage.setItem('userCredentials', JSON.stringify(data));
    },
}));

// Immediately load credentials on store creation
useUserCredStore.getState().loadCredentialsFromStorage();


export const useUserStore = create((set) => ({
    user: null, // full profile
    historyCount: 0,
    setUser: (data) => set({ user: data }),
    loadUserFromStorage: async () => {
        const saved = await AsyncStorage.getItem('userProfile');
        if (saved) set({ user: JSON.parse(saved) });
    },
    updateUserProfile: async (profileData) => {
        set({ user: profileData });
        await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
    },
    setHistoryCount: (count) => set({ historyCount: count }),
}));

