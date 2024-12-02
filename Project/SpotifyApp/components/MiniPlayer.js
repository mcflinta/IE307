

// MiniPlayer.js
import React, { useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MusicPlayerService from '../services/MusicPlayerService';
import TextTicker from 'react-native-text-ticker'; // Thêm dòng này
import AddIcon from '../assets/svg/AddIcon';
import LikedIcon from '../assets/svg/LikedIcon';
import axios from 'axios';
const MiniPlayer = ({ onPress, user, token }) => {
  const [currentSong, setCurrentSong] = useState(MusicPlayerService.currentSong);
  const [isPlaying, setIsPlaying] = useState(MusicPlayerService.isPlaying);
  const [isAdded, setIsAdded] = useState(false); // Trạng thái icon
  // console.log('MiniPlayer', user);
  const [progress, setProgress] = useState(MusicPlayerService.getProgress());

  // console.log('MiniPlayer', currentSong);
  // console.log("MiniPlayer Token", token);
  useEffect(() => {
    const checkSongInPlaylist = async () => {
        if (currentSong && token) {
            try {
                const response = await axios.get(`http://149.28.146.58:3000/playlists`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const playlists = response.data;

                const defaultPlaylist = playlists.find(p => p.name === 'My Liked Songs');
                if (defaultPlaylist) {
                    const isSongInPlaylist = defaultPlaylist.songs.includes(currentSong.id);
                    setIsAdded(isSongInPlaylist);
                }
            } catch (error) {
                console.error('Error checking song in playlist:', error);
            }
        }
    };

    checkSongInPlaylist();
}, [currentSong, user]);


  const handleLikedIconPress = async () => {
    if (!currentSong || !token) return;
    try {
      // Lấy danh sách playlist của người dùng
      const response = await axios.get(`http://149.28.146.58:3000/playlists`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const playlists = response.data;

      // Tìm playlist mặc định
      let defaultPlaylist = playlists.find(p => p.name === 'My Liked Songs');

      // Nếu chưa có playlist, tạo mới
      if (!defaultPlaylist) {
        const createResponse = await axios.post(
          `http://149.28.146.58:3000/playlists`,
          { name: 'My Liked Songs' },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        defaultPlaylist = createResponse.data.playlist;
      }

      // Thêm hoặc xóa bài hát khỏi playlist
      if (isAdded) {
        // Xóa bài hát
        await axios.delete(
          `http://149.28.146.58:3000/playlists/${defaultPlaylist._id}/songs/${currentSong.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
      );
        setIsAdded(false);
        Alert.alert('Removed', 'Song removed from your liked playlist.');
      } else {
        // Thêm bài hát
        await axios.post(
          `http://149.28.146.58:3000/playlists/${defaultPlaylist._id}/songs`,
          { songId: currentSong.id }, // Gửi songId từ Spotify
          { headers: { Authorization: `Bearer ${token}` } }
      );
        setIsAdded(true);
        Alert.alert('Added', 'Song added to your liked playlist.');
      }
    } catch (error) {
      console.error('Error toggling song in playlist:', error);
      Alert.alert('Error', 'Failed to update liked songs.');
    }
  };

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
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.contentContainer}>
        <Image source={{ uri: currentSong.albumImages }} style={styles.image} />
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
          {currentSong.title}
        </TextTicker>
        <Text style={styles.artistName} numberOfLines={1}>
          {currentSong.artists[0]}
        </Text>
      </View>
      {/* <TouchableOpacity style={styles.button} onPress={toggleIcon}>
        {isAdded ? (
          <LikedIcon width={24} height={24} fill="#1ed760" />
        ) : (
          <AddIcon width={24} height={24} fill="#fff" opacity="0.7" />
        )}
      </TouchableOpacity> */}
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
    backgroundColor: '#1e1e1e',
    padding: 6,
    // paddingTop: 8,
    borderTopWidth: 0,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image:{
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

