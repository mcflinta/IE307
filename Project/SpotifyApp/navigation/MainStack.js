import React from 'react';
import { createStackNavigator, CardStyleInterpolators,TransitionPresets  } from '@react-navigation/stack';
import InitScreen from '../screens/InitScreen';
import SignUpFlow from './SignUpFlow';
import LoginFlow from './LoginFlow';
import HomeTabs from './HomeTabs';
import MiniPlayer from '../components/MiniPlayer';
import LoadingScreen from '../screens/LoadingScreen';
import FullPlayerScreen from '../screens/FullPlayerScreen';
const MainStack = createStackNavigator();

const MainStackNavigator = () => (

  <MainStack.Navigator
    initialRouteName="InitScreen"
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      ...TransitionPresets.ModalSlideFromBottomIOS, // Hiệu ứng trượt từ dưới lên
    }}
  >
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
    <MainStack.Screen name="FullPlayerScreen" component={FullPlayerScreen} />

    </MainStack.Navigator>


);

export default MainStackNavigator;
