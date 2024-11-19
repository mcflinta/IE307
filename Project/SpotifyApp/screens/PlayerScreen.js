import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Audio } from 'expo-av';
import { Icon } from 'react-native-elements';
import { API_URL } from '../services/api';

const PlayerScreen = ({ route }) => {
  const { song } = route.params;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: `${API_URL}${song.url}` },
      { shouldPlay: true }
    );
    setSound(sound);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    });
  };

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    playSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: `${API_URL}${song.artwork}` }} style={styles.artwork} />
      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>
      <Icon
        name={isPlaying ? 'pause-circle' : 'play-circle'}
        type="font-awesome"
        size={64}
        onPress={togglePlayPause}
        style={styles.playPause}
      />
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  artwork: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
  },
  artist: {
    fontSize: 18,
    color: 'gray',
  },
  playPause: {
    marginTop: 30,
  },
});
