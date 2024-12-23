

// // MiniPlayer.js
// import React, { useState, useEffect} from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image, Alert} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import MusicPlayerService from '../services/MusicPlayerService';
// import TextTicker from 'react-native-text-ticker'; // Thêm dòng này
// import AddIcon from '../assets/svg/AddIcon';
// import LikedIcon from '../assets/svg/LikedIcon';
// import axios from 'axios';
// import tokenManager from '../services/TokenManager'; // Import TokenManager
// import { API_BASE_URL } from '../config/config';
// const MiniPlayer = ({ onPress, user}) => {
//   const [currentSong, setCurrentSong] = useState(MusicPlayerService.currentSong);
//   const [isPlaying, setIsPlaying] = useState(MusicPlayerService.isPlaying);
//   const [isAdded, setIsAdded] = useState(false); // Trạng thái icon
//   // console.log('MiniPlayer', user);
//   const [progress, setProgress] = useState(MusicPlayerService.getProgress());
//   // console.log('MiniPlayer', currentSong);
//   // console.log('MiniPlayer', currentSong);
//   // console.log("MiniPlayer Token", token);
//   useEffect(() => {

//     const checkSongInPlaylist = async () => {
//         if (currentSong) {
//             try {
//               const token = await tokenManager.getToken(); // Lấy token từ TokenManager
//               // console.log(token)
//               if (!token) {
//                 console.error('Token is missing.');
//                 return;
//               }
//                 const response = await axios.get(`${API_BASE_URL}/playlists`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 const playlists = response.data;
//                 // console.log(playlist)
//                 const defaultPlaylist = playlists.find(p => p.name === 'My Liked Songs');
//                 if (defaultPlaylist) {
//                     const isSongInPlaylist = defaultPlaylist.songs.includes(currentSong.track_id || currentSong.trackId);
//                     setIsAdded(isSongInPlaylist);
//                 }
//             } catch (error) {
//                 console.error('Error checking song in playlist:', error);
//             }
//         }
//     };

//     checkSongInPlaylist();
// }, [currentSong]);


//   const handleLikedIconPress = async () => {
//     if (!currentSong) return;
//     try {
//       const token = await tokenManager.getToken(); // Lấy token từ TokenManager
//       if (!token) {
//         console.error('Token is missing.');
//         return;
//       }
//       // Lấy danh sách playlist của người dùng
//       const response = await axios.get(`${API_BASE_URL}/playlists`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const playlists = response.data;

//       // Tìm playlist mặc định
//       let defaultPlaylist = playlists.find(p => p.name === 'My Liked Songs');

//       // Nếu chưa có playlist, tạo mới
//       if (!defaultPlaylist) {
//         const createResponse = await axios.post(
//           `${API_BASE_URL}/playlists`,
//           { name: 'My Liked Songs' },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         defaultPlaylist = createResponse.data.playlist;
//       }

//       // Thêm hoặc xóa bài hát khỏi playlist
//       if (isAdded) {
//         // Xóa bài hát
//         await axios.delete(
//           `${API_BASE_URL}/playlists/${defaultPlaylist._id}/songs/${currentSong.track_id || currentSong.trackId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//       );
//         setIsAdded(false);
//         Alert.alert('Removed', 'Song removed from your liked playlist.');
//       } else {
//         // Thêm bài hát
//         await axios.post(
//           `${API_BASE_URL}/playlists/${defaultPlaylist._id}/songs`,
//           { songId: currentSong.track_id || currentSong.trackId }, // Gửi songId từ Spotify
//           { headers: { Authorization: `Bearer ${token}` } }
//       );
//         setIsAdded(true);
//         Alert.alert('Added', 'Song added to your liked playlist.');
//       }
//     } catch (error) {
//       console.error('Error toggling song in playlist:', error);
//       Alert.alert('Error', 'Failed to update liked songs.');
//     }
//   };

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

//     const playbackStatusChangedListener = MusicPlayerService.emitter.addListener(
//       'playbackStatusChanged',
//       ({ isPlaying }) => {
//         setIsPlaying(isPlaying);
//       }
//     );

//     return () => {
//       // Gỡ bỏ listener khi component unmount
//       songChangedListener.remove();
//       playbackStatusUpdatedListener.remove();
//       playbackStatusChangedListener.remove();
//     };
//   }, []);
//   // console.log('MiniPlayer:', currentSong)
//   if (!currentSong) return null;
//   return (
//     <TouchableOpacity
//       style={[styles.container, { backgroundColor: currentSong.colorDark }]}
//       onPress={onPress}
//     >
//       <View style={styles.contentContainer}>
//         <Image source={{ uri: currentSong.albumImage }} style={styles.image} />
//       </View>

//       <View style={styles.infoContainer}>
//         <TextTicker
//           style={styles.songTitle}
//           duration={5000}
//           loop
//           bounce={false}
//           scrollSpeed={50}
//           marqueeDelay={1000}
//           repeatSpacer={50}
//         >
//           {currentSong.track_name || currentSong.trackName}
//         </TextTicker>
//         <Text style={styles.artistName} numberOfLines={1}>
//           {currentSong.artistName}
//         </Text>
//       </View>
//       {/* <TouchableOpacity style={styles.button} onPress={toggleIcon}>
//         {isAdded ? (
//           <LikedIcon width={24} height={24} fill="#1ed760" />
//         ) : (
//           <AddIcon width={24} height={24} fill="#fff" opacity="0.7" />
//         )}
//       </TouchableOpacity> */}
//       <TouchableOpacity style={styles.button} onPress={handleLikedIconPress}>
//         {isAdded ? (
//           <LikedIcon width={24} height={24} fill="#1ed760" />
//         ) : (
//           <AddIcon width={24} height={24} fill="#fff" opacity="0.7" />
//         )}
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => MusicPlayerService.togglePlayPause()} style={styles.button}>
//         <Ionicons name={isPlaying ? 'pause-circle' : 'play-circle'} size={32} color="#fff" />
//       </TouchableOpacity>

//       <View style={styles.progressBarContainer}>
//         <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
//       </View>
//     </TouchableOpacity>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 6,
//     // paddingTop: 8,
//     borderTopWidth: 0,
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   image:{
//     width: 40,
//     height: 40,
//     borderRadius: 4,
//     marginRight: 10,
//     marginLeft: 4,
//   },
//   infoContainer: {
//     flex: 1,
//     marginRight: 10,
//   },
//   songTitle: {
//     color: '#fff',
//     fontSize: 13,
//     fontWeight: 'bold',
//   },
//   artistName: {
//     color: '#888',
//     fontSize: 12,
//   },
//   button: {
//     padding: 5,
//   },
//   progressBarContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 5,
//     right: 5,
//     height: 2,
//     backgroundColor: '#555',
//   },
//   progressBar: {
//     height: '100%',
//     backgroundColor: '#fff',
//   },
// });

// export default MiniPlayer;


// MiniPlayer.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MusicPlayerService from '../services/MusicPlayerService';
import TextTicker from 'react-native-text-ticker';
import AddIcon from '../assets/svg/AddIcon';
import LikedIcon from '../assets/svg/LikedIcon';
import axios from 'axios';
import tokenManager from '../services/TokenManager';
import { API_BASE_URL } from '../config/config';

const MiniPlayer = ({ onPress, user }) => {
  const [currentSong, setCurrentSong] = useState(MusicPlayerService.currentSong);
  const [isPlaying, setIsPlaying] = useState(MusicPlayerService.isPlaying);
  const [isAdded, setIsAdded] = useState(false); // Trạng thái icon
  const [progress, setProgress] = useState(MusicPlayerService.getProgress());

  useEffect(() => {
    const checkSongInPlaylist = async () => {
      if (currentSong) {
        try {
          const token = await tokenManager.getToken(); // Lấy token từ TokenManager
          if (!token) {
            console.error('Token is missing.');
            return;
          }
          const response = await axios.get(`${API_BASE_URL}/playlists`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const playlists = response.data;
          const defaultPlaylist = playlists.find((p) => p.name === 'My Liked Songs');
          if (defaultPlaylist) {
            const isSongInPlaylist = defaultPlaylist.songs.includes(currentSong.track_id || currentSong.trackId);
            setIsAdded(isSongInPlaylist);
          }
        } catch (error) {
          console.error('Error checking song in playlist:', error);
        }
      }
    };

    checkSongInPlaylist();
  }, [currentSong]);

  const handleLikedIconPress = async () => {
    if (!currentSong) return;
    try {
      const token = await tokenManager.getToken(); // Lấy token từ TokenManager
      if (!token) {
        console.error('Token is missing.');
        return;
      }
      // Lấy danh sách playlist của người dùng
      const response = await axios.get(`${API_BASE_URL}/playlists`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const playlists = response.data;

      // Tìm playlist mặc định
      let defaultPlaylist = playlists.find((p) => p.name === 'My Liked Songs');

      // Nếu chưa có playlist, tạo mới
      if (!defaultPlaylist) {
        const createResponse = await axios.post(
          `${API_BASE_URL}/playlists`,
          { name: 'My Liked Songs' },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        defaultPlaylist = createResponse.data.playlist;
      }

      // Thêm hoặc xóa bài hát khỏi playlist
      if (isAdded) {
        // Xóa bài hát
        await axios.delete(
          `${API_BASE_URL}/playlists/${defaultPlaylist._id}/songs/${currentSong.track_id || currentSong.trackId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsAdded(false);
        Alert.alert('Removed', 'Song removed from your liked playlist.');
        // Emit sự kiện khi bài hát được xóa khỏi liked
        MusicPlayerService.emitter.emit('songLikedChanged', {
          songId: currentSong.track_id || currentSong.trackId,
          action: 'remove',
        });
      } else {
        // Thêm bài hát
        await axios.post(
          `${API_BASE_URL}/playlists/${defaultPlaylist._id}/songs`,
          { songId: currentSong.track_id || currentSong.trackId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsAdded(true);
        Alert.alert('Added', 'Song added to your liked playlist.');
        // Emit sự kiện khi bài hát được thêm vào liked
        MusicPlayerService.emitter.emit('songLikedChanged', {
          songId: currentSong.track_id || currentSong.trackId,
          action: 'add',
        });
      }
    } catch (error) {
      console.error('Error toggling song in playlist:', error);
      Alert.alert('Error', 'Failed to update liked songs.');
    }
  };

  useEffect(() => {
    // Lắng nghe sự kiện từ MusicPlayerService
    const songChangedListener = MusicPlayerService.emitter.addListener('songChanged', ({ currentSong, isPlaying }) => {
      setCurrentSong(currentSong);
      setIsPlaying(isPlaying);
      // Kiểm tra xem bài hát mới có được like không
      checkIfSongIsLiked(currentSong);
    });

    const playbackStatusUpdatedListener = MusicPlayerService.emitter.addListener('playbackStatusUpdated', () => {
      setProgress(MusicPlayerService.getProgress());
    });

    const playbackStatusChangedListener = MusicPlayerService.emitter.addListener('playbackStatusChanged', ({ isPlaying }) => {
      setIsPlaying(isPlaying);
    });

    return () => {
      // Gỡ bỏ listener khi component unmount
      songChangedListener.remove();
      playbackStatusUpdatedListener.remove();
      playbackStatusChangedListener.remove();
    };
  }, []);

  // Hàm kiểm tra xem bài hát có được like không
  const checkIfSongIsLiked = async (song) => {
    if (!song) {
      setIsAdded(false);
      return;
    }
    try {
      const token = await tokenManager.getToken();
      if (!token) {
        console.error('Token is missing.');
        setIsAdded(false);
        return;
      }
      const response = await axios.get(`${API_BASE_URL}/playlists`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const playlists = response.data;
      const defaultPlaylist = playlists.find((p) => p.name === 'My Liked Songs');
      if (defaultPlaylist) {
        const isSongInPlaylist = defaultPlaylist.songs.includes(song.track_id || song.trackId);
        setIsAdded(isSongInPlaylist);
      } else {
        setIsAdded(false);
      }
    } catch (error) {
      console.error('Error checking song in playlist:', error);
      setIsAdded(false);
    }
  };

  if (!currentSong) return null;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: currentSong.colorDark }]}
      onPress={onPress}
    >
      <View style={styles.contentContainer}>
        <Image source={{ uri: currentSong.albumImage }} style={styles.image} />
      </View>

      <View style={styles.infoContainer}>
        <TextTicker
          style={styles.songTitle}
          duration={5000}
          loop
          bounce={false}
          scrollSpeed={50}
          marqueeDelay={1000}
          repeatSpacer={50}
        >
          {currentSong.track_name || currentSong.trackName}
        </TextTicker>
        <Text style={styles.artistName} numberOfLines={1}>
          {currentSong.artistName}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLikedIconPress}>
        {isAdded ? (
          <LikedIcon width={24} height={24} fill="#1ed760" />
        ) : (
          <AddIcon width={24} height={24} fill="#fff" opacity="0.7" />
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => MusicPlayerService.togglePlayPause()} style={styles.button}>
        <Ionicons name={isPlaying ? 'pause-circle' : 'play-circle'} size={32} color="#fff" />
      </TouchableOpacity>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
    borderTopWidth: 0,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 10,
    marginLeft: 4,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  songTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#888',
    fontSize: 12,
  },
  button: {
    padding: 5,
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 5,
    right: 5,
    height: 2,
    backgroundColor: '#555',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default MiniPlayer;
