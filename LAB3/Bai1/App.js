// App.js
import React, { useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AuthProvider, AuthContext } from './store/AuthContext';
// import RootNavigator from './navigators/RootNavigator';
import AuthStack from './navigation/AuthStack';
import MainBottomTab from './components/MainBottomTab';
import RootStackHome from './navigation/RootHomeStack';

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
