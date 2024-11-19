import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Đăng Nhập" component={LoginScreen} />
    <Stack.Screen name="Đăng Ký" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthStack;
