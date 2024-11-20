import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SpotifyIcon from '../assets/svg/SpotifyIcon.svg';
import ActionButtons from '../components/ActionButtons';

const InitScreen = () => {
    return (
        <>
          <View style={styles.logoContainer}>
            <SpotifyIcon width={60} height={60} />
          </View>
    
          <Text style={styles.title}>
            Hang trieu bai hat.{"\n"}Mien phi tren Spotify.
          </Text>
    
          <ActionButtons />
        </>
      );
    };
    
    const styles = StyleSheet.create({
      logoContainer: {
        marginTop: 220,
        alignItems: 'center',
      },
      title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 30,
        fontFamily: 'Spotify-font',
        fontWeight: 'bold',
        marginTop: 20,
      },
    });
export default InitScreen;
