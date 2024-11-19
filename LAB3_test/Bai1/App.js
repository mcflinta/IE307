// App.js
import React, { useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
// import RootNavigator from './navigators/RootNavigator';
import AuthStack from './components/AuthStack';
import MainBottomTab from './components/MainBottomTab';

const App = () => (
  <AuthProvider>
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <RootNavigator />      
      </NavigationContainer>
    </SafeAreaView>
  </AuthProvider>
);


const RootNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <MainBottomTab /> : <AuthStack />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
