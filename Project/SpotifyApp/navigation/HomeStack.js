import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'; // Màn hình chính của Premium
// import TrackAlbumArtistScreen from '../screens/TrackAlbumArtistScreen'; // Màn hình con

import AlbumTrackDetailScreen from '../screens/AlbumTrackDetailScreen';
const HomeStack = createStackNavigator();

const HomeStackNavigator = ({ route }) => {
    const { user } = route.params || {};
    console.log('HomeStackNavigator route:', route);
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#121212' },
                headerTintColor: '#fff',
                headerShown: false,
            }}
        >
            <HomeStack.Screen
                name="HomeScreen"
                component={HomeScreen}
                initialParams={{ user }}
                options={{
                    title: 'HomeScreen',
                    headerLeft: () => null,
                    headerTitle: () => null,
                 }}
            />
            <HomeStack.Screen
                name="AlbumTrackDetailScreen"
                component={AlbumTrackDetailScreen}
                initialParams={{ user }}
                options={{
                    title: 'AlbumTrackDetailScreen',
                    // headerLeft: () => null,
                    headerTitle: false,
                    headerTitle: () => null,
                 }}
            />
        </HomeStack.Navigator>
    );
};

export default HomeStackNavigator;

