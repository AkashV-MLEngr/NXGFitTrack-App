import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem("access_token", token);
        console.log("token stored success: ", token)
    } catch (error) {
        console.log("❌ Failed to store token:", error);
    }
};

export const getToken = async () => {
    try {
        return await AsyncStorage.getItem("access_token");
    } catch (error) {
        console.log("❌ Failed to get token:", error);
        return null;
    }
};

export const clearToken = async () => {
    try {
        await AsyncStorage.removeItem("access_token");
    } catch (error) {
        console.log("❌ Failed to clear token:", error);
    }
};
