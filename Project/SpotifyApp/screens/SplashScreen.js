import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import SpotifyIcon from '../assets/svg/SpotifyIconGreen.svg'; // Đường dẫn tới file SVG
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = () => {
  return (
    <LinearGradient
    colors={['#1c1c1c', '#121212']}
    style={styles.container}>
        <SpotifyIcon width={160} height={160} /> 
          
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1DB954',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 20,
  },
});

export default SplashScreen;
