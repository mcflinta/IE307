




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
import tokenManager from '../services/TokenManager'; // Import TokenManager
const screenHeight = Dimensions.get('window').height;

const FullPlayerScreen = ({onClose, user, token }) => {
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
  console.log("Full Player  Screen:", currentSong.artists[0])
  const  artistId = currentSong.artistIds[0]
  const navigation = useNavigation(); // Get navigation object from hook
  // console.log("Full Player  Screen:", user, token)
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
        const token = await tokenManager.getToken(); // Lấy token từ TokenManager
        if (!token) {
          console.error('Token is missing.');
          return;
        }
        const response = await fetch(
          `http://149.28.146.58:3000/artist/artistInfo/${artistId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setArtist(data); // Lưu thông tin nghệ sĩ
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
  console.log("Full Player  Screen:", artist)
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
    setIsSliding(false);
  };

  const handleSliding = (value) => {
    // setSliderValue(value);
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
            <Text style={styles.artistName}>{currentSong?.artists[0] || 'Unknown Artist'}</Text>
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
                  params: {
                    screen: 'ArtistScreen',
                    params: { artistId: artistId }, // Truyền artistId ở đây
                  },
                });
            }}>
              <ImageBackground
                source={{ uri: artist.gallery }}
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
                    params: {
                      screen: 'BioArtistScreen',
                      params: { artistId: artistId }, // Truyền artistId ở đây
                    },
                  });
                }}>
                <Text style={styles.artistNameText}>{artist.name}</Text>
                <Text style={styles.artistStats}>{formatNumber(artist.monthlyListeners)} monthly listeners</Text>
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
    marginTop: 30,
    // paddingHorizontal: 5,
    // paddingBottom: 1,
  },
  artistHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 10,
    // marginBlockStart: 10,
    padding: 15
  },
  artistCard: {
    flexDirection: 'column',
    // alignItems: 'flex-start',
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    // padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    // height: 3,
  },
  artistImage: {
    width: '100%',
    height: 250,
    overflow: 'hidden',
    // borderRadius: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    lineHeight: 16,
    // alignSelf: 'center',
    marginTop: 10,
    // paddingHorizontal:  10

  },
  contentScroll: {
    // flex: 1,
    backgroundColor: '#121212',
    paddingBottom:50,
    // paddingBottom: 200,
  }
});

export default FullPlayerScreen;