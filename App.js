// import React from 'react';
// import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import RootNavigator from './src/navigation/RootNavigator';

// export default function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <NavigationContainer>
//         <RootNavigator />
//       </NavigationContainer>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import AuthNavigation from './src/navigation/AuthNavigator';
import { useUserStore } from "./src/store/useUserStore";

export default function App() {
  const loadUserFromStorage = useUserStore((state) => state.loadUserFromStorage);
  useEffect(() => {
    loadUserFromStorage();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <AuthNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
