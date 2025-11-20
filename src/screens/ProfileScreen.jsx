import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useUserStore, useUserCredStore } from '../store/useUserStore';

const { height, width } = Dimensions.get('window');

export default function ProfileScreen({ navigation }) {

    const userProf = useUserStore((state) => state.user);
    const userCred = useUserCredStore((state) => state.credentials);
    const historyCount = useUserStore((state) => state.historyCount);

    console.log('profile.js userCred:', userCred)
    console.log('hcount', historyCount)
    return (
        <View style={styles.container}>
            {/* Header with title and edit button */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('Edit Profile')}
                >
                    <Image
                        source={require('../assets/edit.png')}
                        style={styles.editIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            {/* Top half container for image */}
            <View style={styles.topHalf}>
                <Image
                    source={require('../assets/profileImage.png')}
                    style={styles.profileImage}
                    resizeMode="contain"
                />
            </View>

            {/* Content below image */}
            <View style={styles.content}>
                <Text style={styles.name}>{userProf?.name ?? `Name`}</Text>
                <Text style={styles.email}>{userCred?.email ?? `emailid@email.com`}</Text>

                {/* Stats boxes */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{historyCount ?? 0}</Text>
                        <Text style={styles.statLabel}>Workouts Completed</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>
                            {userCred?.created_at
                                ? new Date(userCred.created_at).toLocaleDateString('en-GB') // "dd/mm/yyyy"
                                : '22-01-2025'}
                        </Text>
                        <Text style={styles.statLabel}>Journey Started</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{userProf?.weight ?? 0} kg</Text>
                        <Text style={styles.statLabel}>Weight</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{userProf?.height ?? 0} cm</Text>
                        <Text style={styles.statLabel}>Height</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        marginTop: 15,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        zIndex: 3,
    },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#56255C' },
    editButton: {
        position: 'absolute',
        right: 20,
        top: 15,
        backgroundColor: 'rgba(110, 90, 90, 0)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    editIcon: {
        width: 24,
        height: 24,
        tintColor: '#56255C',
    },

    topHalf: {
        marginTop: 60, // make space for header
        height: height * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    name: { fontSize: 26, fontWeight: 'bold', marginBottom: 5, color: '#56255C' },
    email: { fontSize: 16, color: '#913b9cff', marginBottom: 30 },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%',
    },
    statBox: {
        flex: 1,
        minWidth: (width - 60) / 3, // 4 boxes per row with some margin
        backgroundColor: '#56255C',
        marginHorizontal: 5,
        marginBottom: 10,
        paddingVertical: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    statValue: { fontSize: 20, fontWeight: 'bold', marginBottom: 5, color: '#fff' },
    statLabel: { fontSize: 14, color: '#fff', textAlign: 'center' },
});
