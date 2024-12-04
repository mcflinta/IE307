import React from 'react';
import { createStackNavigator, CardStyleInterpolators,TransitionPresets  } from '@react-navigation/stack';
import InitScreen from '../screens/InitScreen';
import SignUpFlow from './SignUpFlow';
import LoginFlow from './LoginFlow';
import HomeTabs from './HomeTabs';
import MiniPlayer from '../components/MiniPlayer';
import LoadingScreen from '../screens/LoadingScreen';
import FullPlayerScreen from '../screens/FullPlayerScreen';
import BioArtistScreen from '../screens/BioArtistScreen';
import ArtistScreen from '../screens/ArtistScreen';
import MusicPlayerService from '../services/MusicPlayerService';
const MainStack = createStackNavigator();

const MainStackNavigator = () => (

  <MainStack.Navigator
    initialRouteName="InitScreen"
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
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
        headerShown: false,
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

      }}
    />
    {/* <MainStack.Screen
      name="BioArtistScreen"
      component={BioArtistScreen}
      options={{
        title: 'Aimer',
        headerShown: true,
        headerStyle: { backgroundColor: '#2a2a2a' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
      initialParams={{
        currentSong: MusicPlayerService.currentSong,
        isPlaying: MusicPlayerService.isPlaying,
      }}
    />
    <MainStack.Screen
      name="ArtistScreen"
      component={ArtistScreen}
      options={{
        headerShown: false,
      }}
      initialParams={{
        currentSong: MusicPlayerService.currentSong,
        isPlaying: MusicPlayerService.isPlaying,
      }}
    /> */}

    {/* <MainStack.Screen
      name="FullPlayerScreen"
      component={FullPlayerScreen}
      options={{
        presentation: 'modal', // Hiển thị dưới dạng modal (trượt từ dưới lên)
        gestureDirection: 'vertical',
      }}
    /> */}

    </MainStack.Navigator>


);

export default MainStackNavigator;
