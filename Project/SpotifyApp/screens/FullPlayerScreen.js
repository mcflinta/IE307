
// // import React, { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   Image,
// //   StyleSheet,
// //   Dimensions,
// //   TouchableOpacity,
// // } from 'react-native';
// // import Slider from '@react-native-community/slider';
// // import { PanGestureHandler } from 'react-native-gesture-handler';
// // import Animated, {
// //   useSharedValue,
// //   useAnimatedStyle,
// //   useAnimatedGestureHandler,
// //   withSpring,
// //   runOnJS,
// // } from 'react-native-reanimated';
// // import { Ionicons } from '@expo/vector-icons';
// // import MusicPlayerService from '../services/MusicPlayerService';

// // const screenHeight = Dimensions.get('window').height;

// // const FullPlayerScreen = ({ route, navigation }) => {
// //   const [currentSong, setCurrentSong] = useState(MusicPlayerService.currentSong);
// //   const [isPlaying, setIsPlaying] = useState(MusicPlayerService.isPlaying);
// //   const [status, setStatus] = useState(MusicPlayerService.status);
// //   const [sliderValue, setSliderValue] = useState(0);
// //   const [isSliding, setIsSliding] = useState(false);

// //   const [repeatMode, setRepeatMode] = useState(MusicPlayerService.repeatMode);
// //   const [shuffleMode, setShuffleMode] = useState(MusicPlayerService.shuffleMode);

// //   const translateY = useSharedValue(0);

// //   useEffect(() => {
// //     // Lắng nghe sự kiện từ MusicPlayerService
// //     const songChangedListener = MusicPlayerService.emitter.addListener(
// //       'songChanged',
// //       ({ currentSong, isPlaying, status }) => {
// //         setCurrentSong(currentSong);
// //         setIsPlaying(isPlaying);
// //         setStatus(status);
// //       }
// //     );

// //     const playbackStatusChangedListener = MusicPlayerService.emitter.addListener(
// //       'playbackStatusChanged',
// //       ({ isPlaying, status }) => {
// //         setIsPlaying(isPlaying);
// //         setStatus(status);
// //       }
// //     );

// //     const playbackStatusUpdatedListener = MusicPlayerService.emitter.addListener(
// //       'playbackStatusUpdated',
// //       ({ isPlaying, status }) => {
// //         setIsPlaying(isPlaying);
// //         setStatus(status);
// //         if (!isSliding && status.isLoaded) {
// //           setSliderValue(status.positionMillis / status.durationMillis);
// //         }
// //       }
// //     );

// //     const repeatModeChangedListener = MusicPlayerService.emitter.addListener(
// //       'repeatModeChanged',
// //       ({ repeatMode }) => {
// //         setRepeatMode(repeatMode);
// //       }
// //     );

// //     const shuffleModeChangedListener = MusicPlayerService.emitter.addListener(
// //       'shuffleModeChanged',
// //       ({ shuffleMode }) => {
// //         setShuffleMode(shuffleMode);
// //       }
// //     );

// //     return () => {
// //       // Gỡ bỏ listener khi component unmount
// //       songChangedListener.remove();
// //       playbackStatusChangedListener.remove();
// //       playbackStatusUpdatedListener.remove();
// //       repeatModeChangedListener.remove();
// //       shuffleModeChangedListener.remove();
// //     };
// //   }, [isSliding]);


// //   const gestureHandler = useAnimatedGestureHandler({
// //     onStart: (_, context) => {
// //       context.startY = translateY.value; // Lưu vị trí bắt đầu
// //     },
// //     onActive: (event, context) => {
// //       // Chỉ cho phép giá trị dương (người dùng vuốt xuống)
// //       translateY.value = Math.max(context.startY + event.translationY, 0);
// //     },
// //     onEnd: () => {
// //       // Nếu lướt xuống hơn 30% chiều cao màn hình, đóng trình phát
// //       if (translateY.value > screenHeight * 0.3) {
// //         runOnJS(navigation.goBack)();
// //       } else {
// //         // Quay lại vị trí ban đầu
// //         translateY.value = withSpring(0);
// //       }
// //     },
// //   });
  
// //   const animatedStyle = useAnimatedStyle(() => ({
// //     transform: [{ translateY: translateY.value }],
// //   }));

// //   const handleSlidingStart = () => {
// //     setIsSliding(true);
// //   };

// //   const handleSliding = (value) => {
// //     setSliderValue(value);
// //   };

// //   const handleSlidingComplete = (value) => {
// //     setIsSliding(false);
// //     MusicPlayerService.seekToPosition(value * status.durationMillis);
// //   };

// //   const togglePlayPause = () => {
// //     MusicPlayerService.togglePlayPause();
// //   };

// //   const playNextSong = () => {
// //     MusicPlayerService.playNextSong();
// //   };

// //   const playPreviousSong = () => {
// //     MusicPlayerService.playPreviousSong();
// //   };

// //   const toggleShuffleMode = () => {
// //     MusicPlayerService.toggleShuffleMode();
// //   };

// //   const toggleRepeatMode = () => {
// //     MusicPlayerService.toggleRepeatMode();
// //   };

// //   // Hàm định dạng thời gian từ milliseconds thành mm:ss
// //   const formatTime = (milliseconds) => {
// //     const minutes = Math.floor(milliseconds / 60000);
// //     const seconds = Math.floor((milliseconds % 60000) / 1000);
// //     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
// //   };

// //   // Lấy biểu tượng cho chế độ lặp lại và trộn bài
// //   const getRepeatIcon = () => {
// //     if (repeatMode === 'off') {
// //       return 'repeat';
// //     } else if (repeatMode === 'repeat_all') {
// //       return 'repeat';
// //     } else if (repeatMode === 'repeat_one') {
// //       return 'repeat';
// //     }
// //   };

// //   const getRepeatIconColor = () => {
// //     if (repeatMode === 'off') {
// //       return '#fff';
// //     } else {
// //       return '#1DB954'; // Màu hiển thị khi kích hoạt
// //     }
// //   };

// //   const getShuffleIconColor = () => {
// //     return shuffleMode ? '#1DB954' : '#fff';
// //   };

// //   return (
// //     <PanGestureHandler onGestureEvent={gestureHandler}>
// //       <Animated.View style={[styles.container, animatedStyle]}>
// //         <View style={styles.innerContainer}>
// //           <Image
// //             source={{
// //               uri: currentSong?.image || 'https://via.placeholder.com/150',
// //             }}
// //             style={styles.backgroundImage}
// //             resizeMode="cover"
// //           />

// //           <View style={styles.content}>
// //             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
// //               <Ionicons name="chevron-down" size={28} color="#fff" />
// //             </TouchableOpacity>

// //             <Text style={styles.playlistText}>ĐANG PHÁT TỪ PLAYLIST</Text>
// //             <Text style={styles.playlistTitle}>{currentSong?.title || 'Unknown Song'}</Text>

// //             <View style={styles.songInfo}>
// //               <Image
// //                 source={{
// //                   uri: currentSong?.image || 'https://via.placeholder.com/150',
// //                 }}
// //                 style={styles.songThumbnail}
// //               />
// //               <View>
// //                 <Text style={styles.songTitle}>{currentSong?.title || 'Unknown Title'}</Text>
// //                 <Text style={styles.artistName}>{currentSong?.artist || 'Unknown Artist'}</Text>
// //               </View>
// //             </View>

// //             <View style={styles.progressContainer}>
// //               <Slider
// //                 style={styles.slider}
// //                 minimumValue={0}
// //                 maximumValue={1}
// //                 value={sliderValue}
// //                 onSlidingStart={handleSlidingStart}
// //                 onValueChange={handleSliding}
// //                 onSlidingComplete={handleSlidingComplete}
// //                 minimumTrackTintColor="#1DB954"
// //                 maximumTrackTintColor="#888"
// //                 thumbTintColor="#1DB954"
// //               />
// //               <View style={styles.timeContainer}>
// //                 <Text style={styles.timeText}>
// //                   {status.isLoaded ? formatTime(status.positionMillis) : '0:00'}
// //                 </Text>
// //                 <Text style={styles.timeText}>
// //                   {status.isLoaded ? formatTime(status.durationMillis) : '0:00'}
// //                 </Text>
// //               </View>
// //             </View>

// //             <View style={styles.controls}>
// //               <TouchableOpacity onPress={toggleShuffleMode}>
// //                 <Ionicons name="shuffle" size={24} color={getShuffleIconColor()} />
// //               </TouchableOpacity>
// //               <TouchableOpacity onPress={playPreviousSong}>
// //                 <Ionicons name="play-skip-back" size={32} color="#fff" />
// //               </TouchableOpacity>
// //               <TouchableOpacity onPress={togglePlayPause}>
// //                 <Ionicons
// //                   name={isPlaying ? 'pause-circle' : 'play-circle'}
// //                   size={64}
// //                   color="#fff"
// //                 />
// //               </TouchableOpacity>
// //               <TouchableOpacity onPress={playNextSong}>
// //                 <Ionicons name="play-skip-forward" size={32} color="#fff" />
// //               </TouchableOpacity>
// //               <TouchableOpacity onPress={toggleRepeatMode} style={styles.repeatButton}>
// //                 <Ionicons name={getRepeatIcon()} size={24} color={getRepeatIconColor()} />
// //                 {repeatMode === 'repeat_one' && (
// //                   <View style={styles.repeatOneIcon}>
// //                     <Text style={styles.repeatOneText}>1</Text>
// //                   </View>
// //                 )}
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </View>
// //       </Animated.View>
// //     </PanGestureHandler>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   // Giữ nguyên các styles hiện có, thêm styles cho repeatOneIcon
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#121212',
// //   },
// //   innerContainer: {
// //     flex: 1,
// //     borderTopLeftRadius: 30,
// //     borderTopRightRadius: 30,
// //     overflow: 'hidden',
// //     backgroundColor: '#121212',
// //   },
// //   backgroundImage: {
// //     ...StyleSheet.absoluteFillObject,
// //     opacity: 0.4,
// //   },
// //   content: {
// //     flex: 1,
// //     justifyContent: 'space-between',
// //     paddingHorizontal: 20,
// //     paddingVertical: 20,
// //   },
// //   backButton: {
// //     alignSelf: 'flex-start',
// //     marginBottom: 20,
// //   },
// //   playlistText: {
// //     color: '#fff',
// //     fontSize: 12,
// //     textTransform: 'uppercase',
// //     marginBottom: 5,
// //     letterSpacing: 1,
// //   },
// //   playlistTitle: {
// //     color: '#fff',
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //     marginBottom: 20,
// //   },
// //   songInfo: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 30,
// //   },
// //   songThumbnail: {
// //     width: 80,
// //     height: 80,
// //     borderRadius: 10,
// //     marginRight: 15,
// //   },
// //   songTitle: {
// //     color: '#fff',
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //   },
// //   artistName: {
// //     color: '#888',
// //     fontSize: 16,
// //   },
// //   progressContainer: {
// //     marginTop: 10,
// //     marginBottom: 20,
// //   },
// //   slider: {
// //     width: '100%',
// //     height: 40,
// //   },
// //   timeContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginTop: 5,
// //   },
// //   timeText: {
// //     color: '#aaa',
// //     fontSize: 12,
// //     fontWeight: 'bold',
// //   },
// //   controls: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     alignItems: 'center',
// //     marginTop: 20,
// //     paddingVertical: 10,
// //   },
// //   repeatButton: {
// //     position: 'relative',
// //   },
// //   repeatOneIcon: {
// //     position: 'absolute',
// //     right: -5,
// //     top: -5,
// //     backgroundColor: 'transparent',
// //   },
// //   repeatOneText: {
// //     color: '#1DB954',
// //     fontSize: 12,
// //     fontWeight: 'bold',
// //   },
// // });

// // export default FullPlayerScreen;

// // FullPlayerScreen.js
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
// import axios from 'axios';
// import Icon from 'react-native-vector-icons/Ionicons';
// import ShuffleIcon from '../assets/svg/ShuffleIcon';
// import RepeatIcon from '../assets/svg/RepeatIcon';
// import RepeatAllIcon from '../assets/svg/RepeatAllIcon';
// import RepeatOneIcon from '../assets/svg/RepeatOneIcon';
// const screenHeight = Dimensions.get('window').height;

// const FullPlayerScreen = ({ onClose, user, token }) => {
//   const [currentSong, setCurrentSong] = useState(MusicPlayerService.currentSong);
//   const [isPlaying, setIsPlaying] = useState(MusicPlayerService.isPlaying);
//   const [status, setStatus] = useState(MusicPlayerService.status);
//   const [sliderValue, setSliderValue] = useState(0);
//   const [isSliding, setIsSliding] = useState(false);
//   console.log("Full Player  Screen:", user, token)
//   const [repeatMode, setRepeatMode] = useState(MusicPlayerService.repeatMode);
//   const [shuffleMode, setShuffleMode] = useState(MusicPlayerService.shuffleMode);

//   const translateY = useSharedValue(screenHeight);

//   useEffect(() => {
//     // Hiển thị FullPlayerScreen khi component được mount
//     translateY.value = withSpring(0, { damping: 20 });

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
//       // translateY.value = context.startY + event.translationY;

//     },
//     onEnd: () => {
//       // Nếu lướt xuống hơn 30% chiều cao màn hình, đóng trình phát
//       if (translateY.value > screenHeight * 0.3) {
//         runOnJS(onClose)();
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
//       // return 'repeat';
//       return <RepeatIcon height={24} width={24} fill={"#fff"} />;
//     } else if (repeatMode === 'repeat_all') {
//       return <RepeatAllIcon height={24} width={24} fill={"#1DB954"} />;
//     } else if (repeatMode === 'repeat_one') {
//       return <RepeatOneIcon height={24} width={24} fill={"#1DB954"} />;
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
//           <View style={styles.content}>
//             <TouchableOpacity onPress={onClose} style={styles.backButton}>
//               <Ionicons name="chevron-down" size={28} color="#fff" />
//             </TouchableOpacity>
//             <View style={styles.playlistContainer}>
//                 <Text style={styles.playlistText}>ĐANG PHÁT TỪ PLAYLIST</Text>
//                 <Text style={styles.playlistTitle}>{currentSong?.title || 'Unknown Song'}</Text>
//             </View>
//             <TouchableOpacity style={styles.moreIcon}>
//               <Icon name="ellipsis-vertical" size={20} color="#ffffff" />
//             </TouchableOpacity>
//           </View>
//             <View style={styles.thumbnailContainer}>
//               <Image
//                 source={{
//                   uri: currentSong.albumImages || 'https://via.placeholder.com/150',
//                 }}
//                 style={styles.songThumbnail}
//               />
//             </View>
//             <View style={styles.songInfo}>
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
//                 <ShuffleIcon height={24} width={24} fill={getShuffleIconColor()} />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={playPreviousSong}>
//                 <Ionicons name="play-skip-back" size={32} color="#fff" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={togglePlayPause}>
//                 <Ionicons
//                   name={isPlaying ? 'pause-circle' : 'play-circle'}
//                   size={78}
//                   color="#fff"
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={playNextSong}>
//                 <Ionicons name="play-skip-forward" size={32} color="#fff" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={toggleRepeatMode} style={styles.repeatButton}>
//                 {/* <Ionicons name={getRepeatIcon()} size={24} color={getRepeatIconColor()} />
//                 {repeatMode === 'repeat_one' && (
//                   <View style={styles.repeatOneIcon}>
//                     <Text style={styles.repeatOneText}>1</Text>
//                   </View>
//                 )} */}
//                   {getRepeatIcon()}
//               </TouchableOpacity>
//             </View>
//             <View style={styles.artistInfoContainer}>
//               <Text style={styles.artistHeaderText}>About the artist</Text>
//               <View style={styles.artistCard}>
//                 <Image
//                   source={{ uri: 'https://via.placeholder.com/150' }} // Đổi URL thành ảnh của artist
//                   style={styles.artistImage}
//                 />
//                 <View style={styles.artistDetails}>
//                   <Text style={styles.artistNameText}>SIXTYUPTOWN</Text>
//                   <Text style={styles.artistStats}>200.5K monthly listeners</Text>
//                   <Text style={styles.artistBio}>
//                     Born in 2001 and being a Hanoi-based rapper and producer who grew up idolizing foreign artists like Kanye, Drake, and more.
//                   </Text>
//                 </View>
//               </View>
//             </View>
//         </View>
//       </Animated.View>
//     </PanGestureHandler>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute', // Đảm bảo FullPlayerScreen nằm trên cùng
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     // backgroundColor: 'transparent',
//     zIndex: 100, // Đảm bảo nó nằm trên các thành phần khác
//   },
//   innerContainer: {
//     flex: 1,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     overflow: 'hidden',
//     backgroundColor: '#121212',
//     flexDirection: 'column',
//     paddingHorizontal: 16,
//     // al/ignItems: 'center',        // Căn giữa các thành phần theo trục ngang
//     // flex: 1,                  
//        // Chiếm toàn bộ màn hình
//   },
//   backgroundImage: {
//     ...StyleSheet.absoluteFillObject,
//     opacity: 0.4,
//   },
//   content: {
//     flexDirection: 'row',       // Sắp xếp các thành phần theo hàng ngang
//     alignItems: 'center',       // Căn giữa theo trục dọc
//     justifyContent: 'space-between', // Đẩy backButton và moreIcon ra hai bên
//     // paddingHorizontal: 16,   s   // Thêm khoảng cách ở hai bên
//     // marginBottom: 20,           // Khoảng cách dưới cùng
//     paddingVertical: 50,
    
//   },
//   backButton: {
//     // Không cần `alignSelf` khi đã căn chỉnh trong `content`
//   },
//   playlistContainer: {
//     flex: 1,                    // Chiếm toàn bộ không gian còn lại giữa backButton và moreIcon
//     alignItems: 'center',       // Căn giữa nội dung bên trong theo trục ngang
//   },
//   playlistText: {
//     color: '#fff',
//     fontSize: 10,
//     textTransform: 'uppercase',
//     letterSpacing: 1,
//   },
//   playlistTitle: {
//     color: '#fff',
//     fontSize: 13,
//     fontWeight: 'bold',
//   },
//   moreIcon: {
//     padding: 5,                 // Điều chỉnh nếu cần để tăng vùng chạm
//   },

//   // thumbnailContainer: {
//   //   flex: 1,                     // Đảm bảo View cha chiếm toàn bộ không gian
//   //   justifyContent: 'center',    // Căn giữa theo trục dọc
//   //   alignItems: 'center',        // Căn giữa theo trục ngang
//   // },
//   // songThumbnail: {
//   //   width: 350,
//   //   height: 350,
//   //   borderRadius: 10,
//   //   marginTop: 50,
//   // },
//   // songInfo: {
//   //   // flexDirection: 'row',
//   //   // alignItems: 'center',
//   //   // marginBottom: 80,
//   //   // marginTop: 20,
//   // },
//   // songTitle: {
//   //   color: '#fff',
//   //   fontSize: 20,
//   //   fontWeight: 'bold',
//   // },
//   // artistName: {
//   //   color: '#888',
//   //   fontSize: 16,
//   // },
//   thumbnailContainer: {
//     marginTop: 10,               // Cách đỉnh màn hình 50px
//     justifyContent: 'center',    // Căn giữa nội dung trong container theo trục dọc
//     alignItems: 'center',        // Căn giữa nội dung theo trục ngang
//   },
//   songThumbnail: {
//     width: 350,                  // Chiều rộng ảnh
//     height: 350,                 // Chiều cao ảnh
//     borderRadius: 10,            // Góc bo tròn
//   },
//   songInfo: {
//     marginTop: 70,               // Khoảng cách giữa thumbnailContainer và songInfo
//     // alignItems: 'center',        // Căn giữa nội dung theo trục ngang
//   },
//   songTitle: {
//     color: '#fff',               // Màu chữ
//     fontSize: 20,                // Kích thước chữ
//     fontWeight: 'bold',          // Chữ đậm
//     // textAlign: 'center',         // Căn giữa văn bản
//   },
//   artistName: {
//     color: '#888',               // Màu chữ
//     fontSize: 16,                // Kích thước chữ
//     marginTop: 5,                // Khoảng cách với songTitle
//     // textAlign: 'center',         // Căn giữa văn bản
//   },
//   progressContainer: {
//     marginTop: 10,
//     marginBottom: 20,
//     // flex:1,
//     // paddingHorizontal: 16, // Phải khớp với innerContainer    
//     width: '100%',
//   },
//   slider: {
//     // flex: 1,
//     width: '100%',
//     // maxWidth: '100%',
//     // height: 40,
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     // marginTop: 5,
//     // flex: 1,
  
//   },
//   timeText: {
//     color: '#aaa',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   controls: {
//     // flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     // marginTop: 20,
//     // paddingVertical: 10,
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
//   artistInfoContainer: {
//     marginTop: 20,
//     paddingHorizontal: 16,
//   },
//   artistHeaderText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   artistCard: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     backgroundColor: '#1e1e1e',
//     borderRadius: 10,
//     padding: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 5, // Đổ bóng cho Android
//   },
//   artistImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   artistDetails: {
//     flex: 1,
//   },
//   artistNameText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   artistStats: {
//     color: '#aaa',
//     fontSize: 14,
//     marginVertical: 5,
//   },
//   artistBio: {
//     color: '#ccc',
//     fontSize: 12,
//     lineHeight: 16,
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
  ScrollView, // Added ScrollView import
  ImageBackground,
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
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import ShuffleIcon from '../assets/svg/ShuffleIcon';
import RepeatIcon from '../assets/svg/RepeatIcon';
import RepeatAllIcon from '../assets/svg/RepeatAllIcon';
import RepeatOneIcon from '../assets/svg/RepeatOneIcon';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
const screenHeight = Dimensions.get('window').height;

const FullPlayerScreen = ({onClose, user, token }) => {
  const [currentSong, setCurrentSong] = useState(MusicPlayerService.currentSong);
  const [isPlaying, setIsPlaying] = useState(MusicPlayerService.isPlaying);
  const [status, setStatus] = useState(MusicPlayerService.status);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [repeatMode, setRepeatMode] = useState(MusicPlayerService.repeatMode);
  const [shuffleMode, setShuffleMode] = useState(MusicPlayerService.shuffleMode);
  // console.log("Full Player  Screen:", currentSong)
  const navigation = useNavigation(); // Get navigation object from hook
  // console.log("Full Player  Screen:", user, token)
  const translateY = useSharedValue(screenHeight);
  useEffect(() => {
    translateY.value = withSpring(0, { damping: 20 });

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
      songChangedListener.remove();
      playbackStatusChangedListener.remove();
      playbackStatusUpdatedListener.remove();
      repeatModeChangedListener.remove();
      shuffleModeChangedListener.remove();
    };
  }, [isSliding]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateY.value = Math.max(context.startY + event.translationY, 0);
    },
    onEnd: () => {
      if (translateY.value > screenHeight * 0.3) {
        runOnJS(onClose)();
      } else {
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

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const getRepeatIcon = () => {
    if (repeatMode === 'off') {
      return <RepeatIcon height={24} width={24} fill={'#fff'} />;
    } else if (repeatMode === 'repeat_all') {
      return <RepeatAllIcon height={24} width={24} fill={'#1DB954'} />;
    } else if (repeatMode === 'repeat_one') {
      return <RepeatOneIcon height={24} width={24} fill={'#1DB954'} />;
    }
  };

  const getShuffleIconColor = () => {
    return shuffleMode ? '#1DB954' : '#fff';
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <ScrollView   contentContainerStyle={styles.contentScroll}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={styles.header}>
          <View style={styles.content}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Ionicons name="chevron-down" size={28} color="#fff" />
            </TouchableOpacity>
            <View style={styles.playlistContainer}>
              <Text style={styles.playlistText}>ĐANG PHÁT TỪ PLAYLIST</Text>
              <Text style={styles.playlistTitle}>{currentSong?.title || 'Unknown Song'}</Text>
            </View>
            <TouchableOpacity style={styles.moreIcon}>
              <Icon name="ellipsis-vertical" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>
        <View style={styles.innerContainer}>
          <View style={styles.thumbnailContainer}>
            <Image
              source={{
                uri: currentSong.albumImages || 'https://via.placeholder.com/150',
              }}
              style={styles.songThumbnail}
            />
          </View>
          <View style={styles.songInfo}>
            <Text style={styles.songTitle}>{currentSong?.title || 'Unknown Title'}</Text>
            <Text style={styles.artistName}>{currentSong?.artist || 'Unknown Artist'}</Text>
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
              <ShuffleIcon height={24} width={24} fill={getShuffleIconColor()} />
            </TouchableOpacity>
            <TouchableOpacity onPress={playPreviousSong}>
              <Ionicons name="play-skip-back" size={32} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePlayPause}>
              <Ionicons
                name={isPlaying ? 'pause-circle' : 'play-circle'}
                size={78}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={playNextSong}>
              <Ionicons name="play-skip-forward" size={32} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleRepeatMode} style={styles.repeatButton}>
              {getRepeatIcon()}
            </TouchableOpacity>
          </View>
          <View style={styles.artistInfoContainer}>
            
            <View style={styles.artistCard}>
              <TouchableOpacity onPress={() => {
                onClose();
                navigation.navigate('HomeTabs', {
                  screen: 'HomeStack',
                  params: user, token,
                  params: {
                    screen: 'ArtistScreen',
                    params: user, token,

                  },
                });
            }}>
              <ImageBackground
                source={{ uri: currentSong.artistImages }}
                style={styles.artistImage}
              >
                <Text style={styles.artistHeaderText}>About the Artist</Text>
              </ImageBackground>
            </TouchableOpacity>
              <TouchableOpacity  style={styles.artistDetails}
                onPress={() => {
                  onClose();
                  // console.log("User:", user, token)
                  navigation.navigate('HomeTabs', {
                    screen: 'HomeStack',
                    params: user, token,
                    params: {
                      screen: 'BioArtistScreen',
                      params:  user, token,
                    },
                  });
                }}>
                <Text style={styles.artistNameText}>SIXTYUPTOWN</Text>
                <Text style={styles.artistStats}>200.5K monthly listeners</Text>
                <Text style={styles.artistBio}>
                  Born in 2001 and being a Hanoi-based rapper and producer who grew up idolizing
                  foreign artists like Kanye, Drake, and more.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: 'transparent',
  },
  header: {
    // Style for the header wrapped by PanGestureHandler
    // backgroundColor: '#121212',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#121212',
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  backButton: {},
  playlistContainer: {
    flex: 1,
    alignItems: 'center',
  },
  playlistText: {
    color: '#fff',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  moreIcon: {
    padding: 5,
  },
  thumbnailContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songThumbnail: {
    width: 350,
    height: 350,
    borderRadius: 10,
  },
  songInfo: {
    marginTop: 70,
  },
  songTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#888',
    fontSize: 16,
    marginTop: 5,
  },
  progressContainer: {
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
  },
  slider: {
    width: '100%',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  repeatButton: {
    position: 'relative',
  },
  artistInfoContainer: {
    marginTop: 20,
    // paddingHorizontal: 5,
  },
  artistHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 10,
    // marginBlockStart: 10,
    padding: 10
  },
  artistCard: {
    flexDirection: 'column',
    // alignItems: 'flex-start',
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    // padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  artistImage: {
    width: '100%',
    height: 250,
    overflow: 'hidden',
    // borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // marginRight: 10,
  },
  artistDetails: {
    flex: 1,
    padding: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
  },
  artistNameText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistStats: {
    color: '#aaa',
    fontSize: 14,
    marginVertical: 5,
  },
  artistBio: {
    color: '#ccc',
    fontSize: 12,
    lineHeight: 16,
    // alignSelf: 'center',

  },
  contentScroll: {
    // flex: 1,
    backgroundColor: '#121212',
    paddingBottom:50,
    // paddingBottom: 200,
  }
});

export default FullPlayerScreen;