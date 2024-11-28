import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';

const LoginStack = createStackNavigator();

const LoginFlow = () => (
  <LoginStack.Navigator
    screenOptions={{
      headerShown: false, 
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
  </LoginStack.Navigator>
);

export default LoginFlow;
