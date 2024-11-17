// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext';
import RootNavigator from './navigators/RootNavigator';

const App = () => (
  <AuthProvider>
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaView>
  </AuthProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
