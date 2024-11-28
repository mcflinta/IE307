import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import SignUpScreen from '../screens/SignUpScreen';
import SignUpPwScreen from '../screens/SignUpPwScreen';
import SignUpGenderScreen from '../screens/SignUpGenderScreen';
import SignUpPolicyScreen from '../screens/SignUpPolicyScreen';

const SignUpStack = createStackNavigator();

const SignUpFlow = () => (
  <SignUpStack.Navigator
    screenOptions={{
      headerShown: false, 
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <SignUpStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <SignUpStack.Screen name="SignUpPwScreen" component={SignUpPwScreen} />
    <SignUpStack.Screen name="SignUpGenderScreen" component={SignUpGenderScreen} />
    <SignUpStack.Screen name="SignUpPolicyScreen" component={SignUpPolicyScreen} />
  </SignUpStack.Navigator>
);

export default SignUpFlow;
