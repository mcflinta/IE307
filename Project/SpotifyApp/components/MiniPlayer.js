
// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import MusicPlayerService from '../services/MusicPlayerService';

// const MiniPlayer = () => {
//   const navigation = useNavigation();

//   const [currentSong, setCurrentSong] = useState(MusicPlayerService.currentSong);
//   const [isPlaying, setIsPlaying] = useState(MusicPlayerService.isPlaying);
//   const [progress, setProgress] = useState(MusicPlayerService.getProgress());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSong(MusicPlayerService.currentSong);
//       setIsPlaying(MusicPlayerService.isPlaying);
//       setProgress(MusicPlayerService.getProgress());
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   if (!currentSong) return null;

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.infoContainer}
//         onPress={() => navigation.navigate('FullPlayerScreen', { song: currentSong })}
//       >
//         <Text style={styles.songTitle} numberOfLines={1}>
//           {currentSong.title}
//         </Text>
//         <Text style={styles.artistName} numberOfLines={1}>
//           {currentSong.artist}
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => MusicPlayerService.togglePlayPause()} style={styles.button}>
//         <Ionicons name={isPlaying ? 'pause-circle' : 'play-circle'} size={32} color="#fff" />
//       </TouchableOpacity>

//       <View style={styles.progressBarContainer}>
//         <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   // (Giữ nguyên các styles hiện có)
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#1e1e1e',
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#333',
//   },
//   infoContainer: {
//     flex: 1,
//     marginRight: 10,
//   },
//   songTitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   artistName: {
//     color: '#888',
//     fontSize: 14,
//   },
//   button: {
//     padding: 5,
//   },
//   progressBarContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 4,
//     backgroundColor: '#555',
//   },
//   progressBar: {
//     height: '100%',
//     backgroundColor: '#1DB954',
//   },
// });

// export default MiniPlayer;

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import MusicPlayerService from '../services/MusicPlayerService';

// const MiniPlayer = () => {
//   const navigation = useNavigation();

//   const [currentSong, setCurrentSong] = useState(MusicPlayerService.currentSong);
//   const [isPlaying, setIsPlaying] = useState(MusicPlayerService.isPlaying);
//   const [progress, setProgress] = useState(MusicPlayerService.getProgress());

//   useEffect(() => {
//     // Lắng nghe sự kiện từ MusicPlayerService
//     const songChangedListener = MusicPlayerService.emitter.addListener(
//       'songChanged',
//       ({ currentSong, isPlaying }) => {
//         setCurrentSong(currentSong);
//         setIsPlaying(isPlaying);
//       }
//     );

//     const playbackStatusUpdatedListener = MusicPlayerService.emitter.addListener(
//       'playbackStatusUpdated',
//       () => {
//         setProgress(MusicPlayerService.getProgress());
//       }
//     );

//     return () => {
//       // Gỡ bỏ listener khi component unmount
//       songChangedListener.remove();
//       playbackStatusUpdatedListener.remove();
//     };
//   }, []);

//   if (!currentSong) return null;

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.infoContainer}
//         onPress={() => navigation.navigate('FullPlayerScreen', { song: currentSong })}
//       >
//         <Text style={styles.songTitle} numberOfLines={1}>
//           {currentSong.title}
//         </Text>
//         <Text style={styles.artistName} numberOfLines={1}>
//           {currentSong.artist}
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => MusicPlayerService.togglePlayPause()} style={styles.button}>
//         <Ionicons name={isPlaying ? 'pause-circle' : 'play-circle'} size={32} color="#fff" />
//       </TouchableOpacity>

//       <View style={styles.progressBarContainer}>
//         <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   // Giữ nguyên các styles hiện có
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#1e1e1e',
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#333',
//   },
//   infoContainer: {
//     flex: 1,
//     marginRight: 10,
//   },
//   songTitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   artistName: {
//     color: '#888',
//     fontSize: 14,
//   },
//   button: {
//     padding: 5,
//   },
//   progressBarContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 4,
//     backgroundColor: '#555',
//   },
//   progressBar: {
//     height: '100%',
//     backgroundColor: '#1DB954',
//   },
// });

// export default MiniPlayer;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MusicPlayerService from '../services/MusicPlayerService';

const MiniPlayer = () => {
  const navigation = useNavigation();

  const [currentSong, setCurrentSong] = useState(MusicPlayerService.currentSong);
  const [isPlaying, setIsPlaying] = useState(MusicPlayerService.isPlaying);
  const [progress, setProgress] = useState(MusicPlayerService.getProgress());

  useEffect(() => {
    // Lắng nghe sự kiện từ MusicPlayerService
    const songChangedListener = MusicPlayerService.emitter.addListener(
      'songChanged',
      ({ currentSong, isPlaying }) => {
        setCurrentSong(currentSong);
        setIsPlaying(isPlaying);
      }
    );

    const playbackStatusUpdatedListener = MusicPlayerService.emitter.addListener(
      'playbackStatusUpdated',
      () => {
        setProgress(MusicPlayerService.getProgress());
      }
    );

    const playbackStatusChangedListener = MusicPlayerService.emitter.addListener(
      'playbackStatusChanged',
      ({ isPlaying }) => {
        setIsPlaying(isPlaying);
      }
    );

    return () => {
      // Gỡ bỏ listener khi component unmount
      songChangedListener.remove();
      playbackStatusUpdatedListener.remove();
      playbackStatusChangedListener.remove();
    };
  }, []);

  if (!currentSong) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.infoContainer}
        onPress={() => navigation.navigate('FullPlayerScreen', { song: currentSong })}
      >
        <Text style={styles.songTitle} numberOfLines={1}>
          {currentSong.title}
        </Text>
        <Text style={styles.artistName} numberOfLines={1}>
          {currentSong.artist}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => MusicPlayerService.togglePlayPause()} style={styles.button}>
        <Ionicons name={isPlaying ? 'pause-circle' : 'play-circle'} size={32} color="#fff" />
      </TouchableOpacity>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Giữ nguyên các styles hiện có
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e1e1e',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#888',
    fontSize: 14,
  },
  button: {
    padding: 5,
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#555',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1DB954',
  },
});

export default MiniPlayer;

