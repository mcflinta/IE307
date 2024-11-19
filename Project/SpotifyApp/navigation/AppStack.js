import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import PlaylistDetailScreen from '../screens/PlaylistDetailScreen';
import AddSongScreen from '../screens/AddSongScreen';
import PlayerScreen from '../screens/PlayerScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PlaylistStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Playlists" component={PlaylistScreen} />
    <Stack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
    <Stack.Screen name="AddSong" component={AddSongScreen} />
    <Stack.Screen name="Player" component={PlayerScreen} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Trang Chủ" component={HomeScreen} />
    <Stack.Screen name="Player" component={PlayerScreen} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Playlists" component={PlaylistStack} />
  </Tab.Navigator>
);

export default AppStack;
