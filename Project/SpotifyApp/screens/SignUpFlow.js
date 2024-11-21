// SignUpFlow.js

import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import SignUpScreen from './SignUpScreen';
import SignUpPwScreen from './SignUpPwScreen';

const SignUpStack = createStackNavigator();

const SignUpFlow = () => (
  <SignUpStack.Navigator
    initialRouteName="SignUpScreen"
    screenOptions={{
      headerStyle: { backgroundColor: '#121212' },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerTitle: 'Create Account', // Consistent header title
    }}
  >
    <SignUpStack.Screen 
      name="SignUpScreen" 
      component={SignUpScreen} 
      // No need to set individual titles; inherit from navigator
    />
    <SignUpStack.Screen 
      name="SignUpPwScreen" 
      component={SignUpPwScreen} 
      // No need to set individual titles; inherit from navigator
    />
  </SignUpStack.Navigator>
);

export default SignUpFlow;
