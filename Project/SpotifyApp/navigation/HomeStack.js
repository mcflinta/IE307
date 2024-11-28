import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'; // Màn hình chính của Premium
import TrackAlbumArtistScreen from '../screens/TrackAlbumArtistScreen'; // Màn hình con

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
                name="TrackAlbumArtistScreen"
                component={TrackAlbumArtistScreen}
                initialParams={{ user }}
                options={{
                    title: 'TrackAlbumArtistScreen',
                    // headerLeft: () => null,
                    headerTitle: () => null,
                 }}
            />
        </HomeStack.Navigator>
    );
};

export default HomeStackNavigator;

