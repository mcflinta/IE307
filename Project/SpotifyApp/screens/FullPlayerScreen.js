
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import Slider from '@react-native-community/slider';
// import { PanGestureHandler } from 'react-native-gesture-handler';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   useAnimatedGestureHandler,
//   withSpring,
//   runOnJS,
// } from 'react-native-reanimated';
// import { Ionicons } from '@expo/vector-icons';
// import MusicPlayerService from '../services/MusicPlayerService';

// const screenHeight = Dimensions.get('window').height;

// const FullPlayerScreen = ({ route, navigation }) => {
//   const [currentSong, setCurrentSong] = useState(MusicPlayerService.currentSong);
//   const [isPlaying, setIsPlaying] = useState(MusicPlayerService.isPlaying);
//   const [status, setStatus] = useState(MusicPlayerService.status);
//   const [sliderValue, setSliderValue] = useState(0);
//   const [isSliding, setIsSliding] = useState(false);

//   const [repeatMode, setRepeatMode] = useState(MusicPlayerService.repeatMode);
//   const [shuffleMode, setShuffleMode] = useState(MusicPlayerService.shuffleMode);

//   const translateY = useSharedValue(0);

//   useEffect(() => {
//     // Lắng nghe sự kiện từ MusicPlayerService
//     const songChangedListener = MusicPlayerService.emitter.addListener(
//       'songChanged',
//       ({ currentSong, isPlaying, status }) => {
//         setCurrentSong(currentSong);
//         setIsPlaying(isPlaying);
//         setStatus(status);
//       }
//     );

//     const playbackStatusChangedListener = MusicPlayerService.emitter.addListener(
//       'playbackStatusChanged',
//       ({ isPlaying, status }) => {
//         setIsPlaying(isPlaying);
//         setStatus(status);
//       }
//     );

//     const playbackStatusUpdatedListener = MusicPlayerService.emitter.addListener(
//       'playbackStatusUpdated',
//       ({ isPlaying, status }) => {
//         setIsPlaying(isPlaying);
//         setStatus(status);
//         if (!isSliding && status.isLoaded) {
//           setSliderValue(status.positionMillis / status.durationMillis);
//         }
//       }
//     );

//     const repeatModeChangedListener = MusicPlayerService.emitter.addListener(
//       'repeatModeChanged',
//       ({ repeatMode }) => {
//         setRepeatMode(repeatMode);
//       }
//     );

//     const shuffleModeChangedListener = MusicPlayerService.emitter.addListener(
//       'shuffleModeChanged',
//       ({ shuffleMode }) => {
//         setShuffleMode(shuffleMode);
//       }
//     );

//     return () => {
//       // Gỡ bỏ listener khi component unmount
//       songChangedListener.remove();
//       playbackStatusChangedListener.remove();
//       playbackStatusUpdatedListener.remove();
//       repeatModeChangedListener.remove();
//       shuffleModeChangedListener.remove();
//     };
//   }, [isSliding]);


//   const gestureHandler = useAnimatedGestureHandler({
//     onStart: (_, context) => {
//       context.startY = translateY.value; // Lưu vị trí bắt đầu
//     },
//     onActive: (event, context) => {
//       // Chỉ cho phép giá trị dương (người dùng vuốt xuống)
//       translateY.value = Math.max(context.startY + event.translationY, 0);
//     },
//     onEnd: () => {
//       // Nếu lướt xuống hơn 30% chiều cao màn hình, đóng trình phát
//       if (translateY.value > screenHeight * 0.3) {
//         runOnJS(navigation.goBack)();
//       } else {
//         // Quay lại vị trí ban đầu
//         translateY.value = withSpring(0);
//       }
//     },
//   });
  
//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: translateY.value }],
//   }));

//   const handleSlidingStart = () => {
//     setIsSliding(true);
//   };

//   const handleSliding = (value) => {
//     setSliderValue(value);
//   };

//   const handleSlidingComplete = (value) => {
//     setIsSliding(false);
//     MusicPlayerService.seekToPosition(value * status.durationMillis);
//   };

//   const togglePlayPause = () => {
//     MusicPlayerService.togglePlayPause();
//   };

//   const playNextSong = () => {
//     MusicPlayerService.playNextSong();
//   };

//   const playPreviousSong = () => {
//     MusicPlayerService.playPreviousSong();
//   };

//   const toggleShuffleMode = () => {
//     MusicPlayerService.toggleShuffleMode();
//   };

//   const toggleRepeatMode = () => {
//     MusicPlayerService.toggleRepeatMode();
//   };

//   // Hàm định dạng thời gian từ milliseconds thành mm:ss
//   const formatTime = (milliseconds) => {
//     const minutes = Math.floor(milliseconds / 60000);
//     const seconds = Math.floor((milliseconds % 60000) / 1000);
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   // Lấy biểu tượng cho chế độ lặp lại và trộn bài
//   const getRepeatIcon = () => {
//     if (repeatMode === 'off') {
//       return 'repeat';
//     } else if (repeatMode === 'repeat_all') {
//       return 'repeat';
//     } else if (repeatMode === 'repeat_one') {
//       return 'repeat';
//     }
//   };

//   const getRepeatIconColor = () => {
//     if (repeatMode === 'off') {
//       return '#fff';
//     } else {
//       return '#1DB954'; // Màu hiển thị khi kích hoạt
//     }
//   };

//   const getShuffleIconColor = () => {
//     return shuffleMode ? '#1DB954' : '#fff';
//   };

//   return (
//     <PanGestureHandler onGestureEvent={gestureHandler}>
//       <Animated.View style={[styles.container, animatedStyle]}>
//         <View style={styles.innerContainer}>
//           <Image
//             source={{
//               uri: currentSong?.image || 'https://via.placeholder.com/150',
//             }}
//             style={styles.backgroundImage}
//             resizeMode="cover"
//           />

//           <View style={styles.content}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//               <Ionicons name="chevron-down" size={28} color="#fff" />
//             </TouchableOpacity>

//             <Text style={styles.playlistText}>ĐANG PHÁT TỪ PLAYLIST</Text>
//             <Text style={styles.playlistTitle}>{currentSong?.title || 'Unknown Song'}</Text>

//             <View style={styles.songInfo}>
//               <Image
//                 source={{
//                   uri: currentSong?.image || 'https://via.placeholder.com/150',
//                 }}
//                 style={styles.songThumbnail}
//               />
//               <View>
//                 <Text style={styles.songTitle}>{currentSong?.title || 'Unknown Title'}</Text>
//                 <Text style={styles.artistName}>{currentSong?.artist || 'Unknown Artist'}</Text>
//               </View>
//             </View>

//             <View style={styles.progressContainer}>
//               <Slider
//                 style={styles.slider}
//                 minimumValue={0}
//                 maximumValue={1}
//                 value={sliderValue}
//                 onSlidingStart={handleSlidingStart}
//                 onValueChange={handleSliding}
//                 onSlidingComplete={handleSlidingComplete}
//                 minimumTrackTintColor="#1DB954"
//                 maximumTrackTintColor="#888"
//                 thumbTintColor="#1DB954"
//               />
//               <View style={styles.timeContainer}>
//                 <Text style={styles.timeText}>
//                   {status.isLoaded ? formatTime(status.positionMillis) : '0:00'}
//                 </Text>
//                 <Text style={styles.timeText}>
//                   {status.isLoaded ? formatTime(status.durationMillis) : '0:00'}
//                 </Text>
//               </View>
//             </View>

//             <View style={styles.controls}>
//               <TouchableOpacity onPress={toggleShuffleMode}>
//                 <Ionicons name="shuffle" size={24} color={getShuffleIconColor()} />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={playPreviousSong}>
//                 <Ionicons name="play-skip-back" size={32} color="#fff" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={togglePlayPause}>
//                 <Ionicons
//                   name={isPlaying ? 'pause-circle' : 'play-circle'}
//                   size={64}
//                   color="#fff"
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={playNextSong}>
//                 <Ionicons name="play-skip-forward" size={32} color="#fff" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={toggleRepeatMode} style={styles.repeatButton}>
//                 <Ionicons name={getRepeatIcon()} size={24} color={getRepeatIconColor()} />
//                 {repeatMode === 'repeat_one' && (
//                   <View style={styles.repeatOneIcon}>
//                     <Text style={styles.repeatOneText}>1</Text>
//                   </View>
//                 )}
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Animated.View>
//     </PanGestureHandler>
//   );
// };

// const styles = StyleSheet.create({
//   // Giữ nguyên các styles hiện có, thêm styles cho repeatOneIcon
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//   },
//   innerContainer: {
//     flex: 1,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     overflow: 'hidden',
//     backgroundColor: '#121212',
//   },
//   backgroundImage: {
//     ...StyleSheet.absoluteFillObject,
//     opacity: 0.4,
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//   },
//   backButton: {
//     alignSelf: 'flex-start',
//     marginBottom: 20,
//   },
//   playlistText: {
//     color: '#fff',
//     fontSize: 12,
//     textTransform: 'uppercase',
//     marginBottom: 5,
//     letterSpacing: 1,
//   },
//   playlistTitle: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   songInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   songThumbnail: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//     marginRight: 15,
//   },
//   songTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   artistName: {
//     color: '#888',
//     fontSize: 16,
//   },
//   progressContainer: {
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   slider: {
//     width: '100%',
//     height: 40,
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 5,
//   },
//   timeText: {
//     color: '#aaa',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   controls: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     marginTop: 20,
//     paddingVertical: 10,
//   },
//   repeatButton: {
//     position: 'relative',
//   },
//   repeatOneIcon: {
//     position: 'absolute',
//     right: -5,
//     top: -5,
//     backgroundColor: 'transparent',
//   },
//   repeatOneText: {
//     color: '#1DB954',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
// });

// export default FullPlayerScreen;

// FullPlayerScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import MusicPlayerService from '../services/MusicPlayerService';

const screenHeight = Dimensions.get('window').height;

const FullPlayerScreen = ({ onClose }) => {
  const [currentSong, setCurrentSong] = useState(MusicPlayerService.currentSong);
  const [isPlaying, setIsPlaying] = useState(MusicPlayerService.isPlaying);
  const [status, setStatus] = useState(MusicPlayerService.status);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const [repeatMode, setRepeatMode] = useState(MusicPlayerService.repeatMode);
  const [shuffleMode, setShuffleMode] = useState(MusicPlayerService.shuffleMode);

  const translateY = useSharedValue(screenHeight);

  useEffect(() => {
    // Hiển thị FullPlayerScreen khi component được mount
    translateY.value = withSpring(0, { damping: 20 });

    // Lắng nghe sự kiện từ MusicPlayerService
    const songChangedListener = MusicPlayerService.emitter.addListener(
      'songChanged',
      ({ currentSong, isPlaying, status }) => {
        setCurrentSong(currentSong);
        setIsPlaying(isPlaying);
        setStatus(status);
      }
    );

    const playbackStatusChangedListener = MusicPlayerService.emitter.addListener(
      'playbackStatusChanged',
      ({ isPlaying, status }) => {
        setIsPlaying(isPlaying);
        setStatus(status);
      }
    );

    const playbackStatusUpdatedListener = MusicPlayerService.emitter.addListener(
      'playbackStatusUpdated',
      ({ isPlaying, status }) => {
        setIsPlaying(isPlaying);
        setStatus(status);
        if (!isSliding && status.isLoaded) {
          setSliderValue(status.positionMillis / status.durationMillis);
        }
      }
    );

    const repeatModeChangedListener = MusicPlayerService.emitter.addListener(
      'repeatModeChanged',
      ({ repeatMode }) => {
        setRepeatMode(repeatMode);
      }
    );

    const shuffleModeChangedListener = MusicPlayerService.emitter.addListener(
      'shuffleModeChanged',
      ({ shuffleMode }) => {
        setShuffleMode(shuffleMode);
      }
    );

    return () => {
      // Gỡ bỏ listener khi component unmount
      songChangedListener.remove();
      playbackStatusChangedListener.remove();
      playbackStatusUpdatedListener.remove();
      repeatModeChangedListener.remove();
      shuffleModeChangedListener.remove();
    };
  }, [isSliding]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startY = translateY.value; // Lưu vị trí bắt đầu
    },
    onActive: (event, context) => {
      // Chỉ cho phép giá trị dương (người dùng vuốt xuống)
      translateY.value = Math.max(context.startY + event.translationY, 0);
    },
    onEnd: () => {
      // Nếu lướt xuống hơn 30% chiều cao màn hình, đóng trình phát
      if (translateY.value > screenHeight * 0.3) {
        runOnJS(onClose)();
      } else {
        // Quay lại vị trí ban đầu
        translateY.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleSlidingStart = () => {
    setIsSliding(true);
  };

  const handleSliding = (value) => {
    setSliderValue(value);
  };

  const handleSlidingComplete = (value) => {
    setIsSliding(false);
    MusicPlayerService.seekToPosition(value * status.durationMillis);
  };

  const togglePlayPause = () => {
    MusicPlayerService.togglePlayPause();
  };

  const playNextSong = () => {
    MusicPlayerService.playNextSong();
  };

  const playPreviousSong = () => {
    MusicPlayerService.playPreviousSong();
  };

  const toggleShuffleMode = () => {
    MusicPlayerService.toggleShuffleMode();
  };

  const toggleRepeatMode = () => {
    MusicPlayerService.toggleRepeatMode();
  };

  // Hàm định dạng thời gian từ milliseconds thành mm:ss
  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Lấy biểu tượng cho chế độ lặp lại và trộn bài
  const getRepeatIcon = () => {
    if (repeatMode === 'off') {
      return 'repeat';
    } else if (repeatMode === 'repeat_all') {
      return 'repeat';
    } else if (repeatMode === 'repeat_one') {
      return 'repeat';
    }
  };

  const getRepeatIconColor = () => {
    if (repeatMode === 'off') {
      return '#fff';
    } else {
      return '#1DB954'; // Màu hiển thị khi kích hoạt
    }
  };

  const getShuffleIconColor = () => {
    return shuffleMode ? '#1DB954' : '#fff';
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.innerContainer}>
          <Image
            source={{
              uri: currentSong?.image || 'https://via.placeholder.com/150',
            }}
            style={styles.backgroundImage}
            resizeMode="cover"
          />

          <View style={styles.content}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Ionicons name="chevron-down" size={28} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.playlistText}>ĐANG PHÁT TỪ PLAYLIST</Text>
            <Text style={styles.playlistTitle}>{currentSong?.title || 'Unknown Song'}</Text>

            <View style={styles.songInfo}>
              <Image
                source={{
                  uri: currentSong?.image || 'https://via.placeholder.com/150',
                }}
                style={styles.songThumbnail}
              />
              <View>
                <Text style={styles.songTitle}>{currentSong?.title || 'Unknown Title'}</Text>
                <Text style={styles.artistName}>{currentSong?.artist || 'Unknown Artist'}</Text>
              </View>
            </View>

            <View style={styles.progressContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={sliderValue}
                onSlidingStart={handleSlidingStart}
                onValueChange={handleSliding}
                onSlidingComplete={handleSlidingComplete}
                minimumTrackTintColor="#1DB954"
                maximumTrackTintColor="#888"
                thumbTintColor="#1DB954"
              />
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                  {status.isLoaded ? formatTime(status.positionMillis) : '0:00'}
                </Text>
                <Text style={styles.timeText}>
                  {status.isLoaded ? formatTime(status.durationMillis) : '0:00'}
                </Text>
              </View>
            </View>

            <View style={styles.controls}>
              <TouchableOpacity onPress={toggleShuffleMode}>
                <Ionicons name="shuffle" size={24} color={getShuffleIconColor()} />
              </TouchableOpacity>
              <TouchableOpacity onPress={playPreviousSong}>
                <Ionicons name="play-skip-back" size={32} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={togglePlayPause}>
                <Ionicons
                  name={isPlaying ? 'pause-circle' : 'play-circle'}
                  size={64}
                  color="#fff"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={playNextSong}>
                <Ionicons name="play-skip-forward" size={32} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleRepeatMode} style={styles.repeatButton}>
                <Ionicons name={getRepeatIcon()} size={24} color={getRepeatIconColor()} />
                {repeatMode === 'repeat_one' && (
                  <View style={styles.repeatOneIcon}>
                    <Text style={styles.repeatOneText}>1</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Đảm bảo FullPlayerScreen nằm trên cùng
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 100, // Đảm bảo nó nằm trên các thành phần khác
  },
  innerContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#121212',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  playlistText: {
    color: '#fff',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 5,
    letterSpacing: 1,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  songThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  songTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#888',
    fontSize: 16,
  },
  progressContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  timeText: {
    color: '#aaa',
    fontSize: 12,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
  },
  repeatButton: {
    position: 'relative',
  },
  repeatOneIcon: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'transparent',
  },
  repeatOneText: {
    color: '#1DB954',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default FullPlayerScreen;
