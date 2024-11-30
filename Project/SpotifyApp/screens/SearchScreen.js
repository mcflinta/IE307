// import React, { useEffect, useState } from 'react';
// import { View, Button } from 'react-native';
// import { Audio } from 'expo-av';

// const SearchScreen = () => {
//   const [sound, setSound] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Hàm để tải và chuẩn bị âm thanh
//   const loadSound = async () => {
//     const { sound } = await Audio.Sound.createAsync(
//       { uri: 'http://192.168.105.35:3000/music/Lady Gaga, Bruno Mars - Die With A Smile.mp3' },
//       { shouldPlay: false }
//     );
//     setSound(sound);
//   };

//   // Hàm phát âm thanh
//   const playSound = async () => {
//     if (sound) {
//       await sound.playAsync();
//       setIsPlaying(true);
//     }
//   };

//   // Hàm tạm dừng âm thanh
//   const pauseSound = async () => {
//     if (sound) {
//       await sound.pauseAsync();
//       setIsPlaying(false);
//     }
//   };

//   // Hàm hủy âm thanh khi component bị unmount
//   useEffect(() => {
//     loadSound();

//     return () => {
//       if (sound) {
//         sound.unloadAsync();
//       }
//     };
//   }, []);

//   return (
//     <View>
//       <Button
//         title={isPlaying ? 'Pause' : 'Play'}
//         onPress={isPlaying ? pauseSound : playSound}
//       />
//     </View>
//   );
// };

// export default SearchScreen;

// App.js

import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import Slider from '@react-native-community/slider';

const songList = [
  {
    id: '1',
    title: 'Bài hát 1',
    url: 'http://192.168.105.35:3000/music/Lady%20Gaga,%20Bruno%20Mars%20-%20Die%20With%20A%20Smile.mp3',
  },

  // Bạn có thể thêm các bài hát khác vào danh sách này
];

const SearchScreen = () => {
  const [currentSongUrl, setCurrentSongUrl] = useState(null);

  const selectSong = (url) => {
    setCurrentSongUrl(url);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={songList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button title={item.title} onPress={() => selectSong(item.url)} />
        )}
      />
      {currentSongUrl ? (
        <MusicPlayer songUrl={currentSongUrl} />
      ) : (
        <Text>Vui lòng chọn một bài hát để phát</Text>
      )}
    </View>
  );
};

const MusicPlayer = ({ songUrl }) => {
  const [sound, setSound] = useState(null);
  const [status, setStatus] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // Tải và phát âm thanh khi component được mount hoặc khi songUrl thay đổi
    loadAndPlaySound();

    // Dọn dẹp khi component bị unmount hoặc trước khi tải bài hát mới
    return () => {
      unloadSound();
    };
  }, [songUrl]);

  const loadAndPlaySound = async () => {
    try {
      // Dừng và dọn dẹp âm thanh trước đó nếu có
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      // Tạo đối tượng âm thanh từ URL
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: songUrl },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
    } catch (err) {
      setError(err.message);
    }
  };

  const unloadSound = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const onPlaybackStatusUpdate = (playbackStatus) => {
    setStatus(playbackStatus);
  };

  const playPauseSound = async () => {
    if (sound) {
      if (status.isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    }
  };

  const seekPosition = async (value) => {
    if (sound && status.isLoaded) {
      const position = value * status.durationMillis;
      await sound.setPositionAsync(position);
    }
  };

  return (
    <View style={styles.playerContainer}>
      {error ? (
        <Text style={styles.errorText}>Lỗi: {error}</Text>
      ) : (
        <>
          <Button
            title={status.isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
            onPress={playPauseSound}
            disabled={!sound}
          />
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={
              status.positionMillis && status.durationMillis
                ? status.positionMillis / status.durationMillis
                : 0
            }
            onSlidingComplete={seekPosition}
            disabled={!status.isLoaded}
          />
          <Text>
            {status.positionMillis
              ? `${(status.positionMillis / 1000).toFixed(2)}s / ${(status.durationMillis / 1000).toFixed(2)}s`
              : '0.00s / 0.00s'}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 10,
  },
  playerContainer: {
    marginTop: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  errorText: {
    color: 'red',
  },
});


export default SearchScreen;




// const SearchScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>This is the Search Screen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#121212',
//   },
//   text: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });

