import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'; // Màn hình chính của Premium
// import TrackAlbumArtistScreen from '../screens/TrackAlbumArtistScreen'; // Màn hình con
import BioArtistScreen from '../screens/BioArtistScreen';
import AlbumTrackDetailScreen from '../screens/AlbumTrackDetailScreen';
import ArtistScreen from '../screens/ArtistScreen';
import PlaylistDetailScreen from '../screens/PlaylistDetailScreen';
import MusicPlayerService from '../services/MusicPlayerService';
import WrappedScreen from '../screens/WrappedScreen';
const HomeStack = createStackNavigator();

const HomeStackNavigator = ({ route }) => {
    const { user, token } = route.params || {};
    // console.log('HomeStackNavigator', user);
    return (
        <HomeStack.Navigator
            screenOptions={{
                // backgroundColor: '#',
                headerStyle: { backgroundColor: '#121212' },
                headerTintColor: '#fff',
                headerShown: false,
            }}
        >

            <HomeStack.Screen
                name="HomeScreen"
                component={HomeScreen}
                initialParams={{ user, token }}
                options={{
                    title: 'HomeScreen',
                    // headerLeft: () => null,
                    // headerTitle: () => null,
                    headerShown: false,
                 }}
            />
            <HomeStack.Screen
                name="AlbumTrackDetailScreen"
                component={AlbumTrackDetailScreen}
                initialParams={{ user, token }}
                options={{
                    // title: 'AlbumTrackDetailScreen',
                    // headerLeft: true
                    // headerLeft: () => null,
                    // headerTitle: false,
                    // headerTitle: () => null,
                 }}
            />
            <HomeStack.Screen 
            name="BioArtistScreen" 
            component={BioArtistScreen} 
            initialParams={{ user, token }}

            options={{
                headerShown: true,
                title: 'Aimer',
                headerStyle: { backgroundColor: '#2a2a2a' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
            }}
            />
            <HomeStack.Screen 
            name="ArtistScreen" 
            component={ArtistScreen} 
            options={{
                headerShown: false,
              }}
              initialParams={{
                currentSong: MusicPlayerService.currentSong,
                isPlaying: MusicPlayerService.isPlaying,
              }}
            />
            <HomeStack.Screen
                name="PlaylistDetailScreen"
                component={PlaylistDetailScreen}
                initialParams={{ user, token }}
                options={{
                    // title: 'AlbumTrackDetailScreen',
                    // headerLeft: true
                    // headerLeft: () => null,
                    // headerTitle: false,
                    // headerTitle: () => null,
                 }}
            />
            <HomeStack.Screen
                name="WrappedScreen"
                component={WrappedScreen}
                initialParams={{ user, token }}
                options={{
                    // title: 'AlbumTrackDetailScreen',
                    // headerLeft: true
                    // headerLeft: () => null,
                    headerTitle: false,
                    // headerTitle: () => null,
                 }}
            />
        </HomeStack.Navigator>
    );
};

export default HomeStackNavigator;

