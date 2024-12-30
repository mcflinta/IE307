import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
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
import Icon from 'react-native-vector-icons/Ionicons';
import ShuffleIcon from '../assets/svg/ShuffleIcon';
import RepeatIcon from '../assets/svg/RepeatIcon';
import RepeatAllIcon from '../assets/svg/RepeatAllIcon';
import RepeatOneIcon from '../assets/svg/RepeatOneIcon';
import { useNavigation } from '@react-navigation/native';
import tokenManager from '../services/TokenManager';
import { API_BASE_URL } from '../config/config';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';

const screenHeight = Dimensions.get('window').height;

const FullPlayerScreen = ({ onClose, user, token }) => {
  const [currentSong, setCurrentSong] = useState(MusicPlayerService.currentSong);
  const [isPlaying, setIsPlaying] = useState(MusicPlayerService.isPlaying);
  const [status, setStatus] = useState(MusicPlayerService.status);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [repeatMode, setRepeatMode] = useState(MusicPlayerService.repeatMode);
  const [shuffleMode, setShuffleMode] = useState(MusicPlayerService.shuffleMode);
  const [artist, setArtist] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const artistId = currentSong.artistID;
  const navigation = useNavigation();

  // Ref cho Video
  const videoRef = useRef(null);

  const formatNumber = (num) => {
    num = Number(num);
    if (isNaN(num)) {
      return '0';
    }

    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }

    return num.toString();
  };

  useEffect(() => {
    const fetchArtist = async () => {
      setLoading(true);
      try {
        const token = await tokenManager.getToken();
        if (!token) {
          console.error('Token is missing.');
          return;
        }
        const response = await fetch(
          `${API_BASE_URL}/artist/artistInfo/${artistId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setArtist(data);
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err);
        setError('Không thể tải dữ liệu.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [artistId]);

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

  // Xác định xem có sử dụng video làm nền hay không
  const useVideoBackground = currentSong.albumVideo && currentSong.albumVideo.trim() !== '';
  // console.log("fullPlayerScree: ", currentSong.albumVideo);

  // Hàm xử lý khi nhấn vào tên bài hát
  // const handleAlbumPress = useCallback(async () => {
  //   if (!currentSong.albumID) {
  //     Alert.alert('Lỗi', 'Thông tin album không có sẵn.');
  //     return;
  //   }
  
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/search/album/${currentSong.artistID}/${currentSong.albumID}`);
  //     if (!response.ok) {
  //       throw new Error(`Server error: ${response.statusText}`);
  //     }
  
  //     const albumData = await response.json();
  //     navigation.navigate('HomeStack', { // Điều hướng tới HomeStack
  //       screen: 'AlbumTrackDetailScreen', // Màn hình con trong HomeStack
  //       params: {
  //         albumName: albumData.albumName,
  //         artistName: albumData.artistName,
  //         tracks: albumData.tracks,
  //         albumImage: albumData.albumImage,
  //         artistImageUrl: albumData.artistImageUrl || null,
  //         releaseYear: albumData.releaseYear,
  //         fullReleaseDate: albumData.fullReleaseDate,
  //         totalTracks: albumData.totalTracks,
  //         totalDuration: albumData.totalDuration,
  //         colorDark: albumData.colorDark,
  //         albumType: albumData.albumType,
  //         moreAlbumsByArtist: albumData.moreAlbumsByArtist,
  //         copyright: albumData.copyright,
  //       },
  //     });
  //   } catch (err) {
  //     console.error('Error fetching album details:', err);
  //     Alert.alert('Error', 'Unable to fetch album details. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [navigation, currentSong.albumID, currentSong.artistID]);

  const handleAlbumPress = useCallback(async () => {
    if (!currentSong.albumID) {
      Alert.alert('Lỗi', 'Thông tin album không có sẵn.');
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/search/album/${currentSong.artistID}/${currentSong.albumID}`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
  
      const albumData = await response.json();
      onClose(); // Đóng FullPlayerScreen trước khi điều hướng
  
      navigation.navigate('HomeTabs', {
        screen: 'HomeStack',              // Navigator con// Điều hướng đến HomeStack
        params: {
          screen: 'AlbumTrackDetailScreen', // Màn hình con trong HomeStack
          params: {
            albumName: albumData.albumName,
            artistName: albumData.artistName,
            tracks: albumData.tracks,
            albumImage: albumData.albumImage,
            artistImageUrl: albumData.artistImageUrl || null,
            releaseYear: albumData.releaseYear,
            fullReleaseDate: albumData.fullReleaseDate,
            totalTracks: albumData.totalTracks,
            totalDuration: albumData.totalDuration,
            colorDark: albumData.colorDark,
            albumType: albumData.albumType,
            moreAlbumsByArtist: albumData.moreAlbumsByArtist,
            copyright: albumData.copyright,
          },
        }

      });
    } catch (err) {
      console.error('Error fetching album details:', err);
      Alert.alert('Error', 'Unable to fetch album details. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [navigation, currentSong.albumID, currentSong.artistID, onClose]);
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {useVideoBackground ? (
        // Video nền nếu có videoUrl
        <Video
          ref={videoRef}
          source={{
            uri: currentSong.albumVideo,
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={StyleSheet.absoluteFill}
        />
      ) : null}

      {/* Lớp phủ Gradient */}
      <LinearGradient
        colors={
          useVideoBackground
            ? ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)', '#000']
            : [currentSong.colorDark || '#000', '#000']
        }
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      <ScrollView contentContainerStyle={styles.contentScroll}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={styles.header}>
            <View style={styles.content}>
              <TouchableOpacity onPress={onClose} style={styles.backButton}>
                <Ionicons name="chevron-down" size={28} color="#fff" />
              </TouchableOpacity>
              <View style={styles.playlistContainer}>
                <Text style={styles.playlistText}>ĐANG PHÁT TỪ PLAYLIST</Text>
                <Text style={styles.playlistTitle} numberOfLines={1}>
                  {currentSong?.albumName || 'Unknown Song'}
                </Text>
              </View>
              <TouchableOpacity style={styles.moreIcon}>
                <Icon name="ellipsis-vertical" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </PanGestureHandler>
        <View style={styles.innerContainer}>
          {useVideoBackground ? (
            // Layout khi sử dụng video nền
            <View style={styles.songInfoRow}>
              <Image
                source={{
                  uri: currentSong.albumImage || 'https://via.placeholder.com/150',
                }}
                style={styles.smallSongThumbnail}
              />
              <View style={styles.songInfoAligned}>
                {/* Bọc tên bài hát trong TouchableOpacity */}
                <TouchableOpacity onPress={handleAlbumPress}>
                  <Text style={styles.songTitle}>{currentSong?.track_name || currentSong.trackName || 'Unknown Title'}</Text>
                </TouchableOpacity>
                <Text style={styles.artistName}>{currentSong?.artistName || 'Unknown Artist'}</Text>
              </View>
            </View>
          ) : (
            // Layout khi sử dụng màu nền gradient
            <View style={styles.thumbnailContainer}>
              <Image
                source={{
                  uri: currentSong.albumImage || 'https://via.placeholder.com/150',
                }}
                style={styles.songThumbnail}
              />
                {/* Nếu bạn muốn tên bài hát ở đây cũng có thể nhấn được */}
              <View style={styles.songInfoAlignedNoVideo}>
              <TouchableOpacity onPress={handleAlbumPress}>
                <Text style={styles.songTitle}>{currentSong?.track_name || currentSong.trackName}</Text>
                </TouchableOpacity>
                <Text style={styles.artistName}>{currentSong?.artistName || 'Unknown Artist'}</Text>
              </View>
              


            </View>
          )}
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
              <TouchableOpacity
                onPress={() => {
                  onClose();
                  navigation.navigate('HomeTabs', {
                    screen: 'HomeStack',
                    params: {
                      screen: 'ArtistScreen',
                      params: { artistId: artistId },
                    },
                  });
                }}
              >
                <ImageBackground
                  source={{ uri: artist.gallery || 'https://via.placeholder.com/150' }}
                  style={styles.artistImage}
                >
                  <Text style={styles.artistHeaderText}>About the Artist</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.artistDetails}
                onPress={() => {
                  onClose();
                  navigation.navigate('HomeTabs', {
                    screen: 'HomeStack',
                    params: {
                      screen: 'BioArtistScreen',
                      params: { artistId: artistId },
                    },
                  });
                }}
              >
                <Text style={styles.artistNameText}>{artist.name || 'Unknown Artist'}</Text>
                <Text style={styles.artistStats}>
                  {formatNumber(artist.monthlyListeners)} monthly listeners
                </Text>
                <Text style={styles.artistBio} numberOfLines={3}>
                  {artist.biography || 'No biography available'}
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
  },
  header: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    flexDirection: 'column',
    paddingHorizontal: 10,
    // Không cần thêm backgroundColor ở đây vì gradient đã phủ nền
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
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
    marginBottom: 10,
  },
  songThumbnail: {
    width: 350,
    height: 350,
    borderRadius: 10,
  },
  songInfo: {
    marginTop: 70,
  },
  songInfoHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
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
  smallSongThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
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
    marginTop: 10,
  },
  repeatButton: {
    position: 'relative',
  },
  artistInfoContainer: {
    marginTop: 30,
  },
  artistHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
  },
  artistCard: {
    flexDirection: 'column',
    backgroundColor: 'rgba(30, 30, 30, 0.8)', // Sử dụng nền bán trong suốt để gradient có thể nhìn thấy
    borderRadius: 20,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-end', // Để text "About the Artist" nằm ở dưới cùng
  },
  artistDetails: {
    flex: 1,
    padding: 10,
  },
  artistNameText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  artistStats: {
    color: '#aaa',
    fontSize: 14,
    marginVertical: 5,
  },
  artistBio: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 10,
  },
  contentScroll: {
    paddingBottom: 50,
  },
  songInfoRow: {
    marginTop: 400,
    flexDirection: 'row',
    alignItems: 'center',
  },
  songInfoAligned: {
    flex: 1,
    justifyContent: 'center',
  },
  songInfoAlignedNoVideo: {
    flex: 1,
    width:'80%',
    // marginHorizontal: 10,
    marginRight: 50,
    marginTop: 20,
    // paddingRight: 100,

  },
});

export default FullPlayerScreen;
