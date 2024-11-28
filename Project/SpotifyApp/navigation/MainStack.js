import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import InitScreen from '../screens/InitScreen';
import SignUpFlow from './SignUpFlow';
import LoginFlow from './LoginFlow';
import HomeTabs from './HomeTabs';
import LoadingScreen from '../screens/LoadingScreen';

const MainStack = createStackNavigator();

const MainStackNavigator = () => (
  <MainStack.Navigator initialRouteName="InitScreen">
    <MainStack.Screen
      name="InitScreen"
      component={InitScreen}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="SignUpFlow"
      component={SignUpFlow}
      options={{
        title: 'Create account',
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleAlign: 'center',
      }}
    />
    <MainStack.Screen
      name="LoadingScreen"
      component={LoadingScreen}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="LoginFlow"
      component={LoginFlow}
      options={{
        title: '',
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleAlign: 'center',
      }}
    />
    <MainStack.Screen
      name="HomeTabs"
      component={HomeTabs}
      options={{
        headerShown: false,
        headerLeft: () => null,
        headerTitle: () => null,
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleAlign: 'center',
      }}
    />
  </MainStack.Navigator>
);

export default MainStackNavigator;
