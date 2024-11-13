// App.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, AuthContext } from './components/AuthContext';
import AuthStack from './components/AuthStack';
import MainBottomTab from './components/MainBottomTab';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

const RootNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <MainBottomTab /> : <AuthStack />;
};

export default App;
