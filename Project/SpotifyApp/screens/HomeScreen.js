import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, FlatList, Animated, StyleSheet, Alert, StatusBar, TouchableOpacity, Image, ScrollView, Text, ActivityIndicator } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { getAccessToken, fetchAlbumsByArtistName, fetchAlbumTracks } from '../services/spotifyService';
import AlbumCard from '../components/AlbumCard';
import AlbumWrappedCard from '../components/AlbumWrappedCard';
import { createDotAnimation } from '../animations/dotAnimation';
import { API_BASE_URL } from '../config/config';
import albumsTemplate from '../data/albumArtist'; 

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = route.params || {};

  const [albums, setAlbums] = useState([]);
  const [wrappedAlbum, setWrappedAlbum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dailyMixData, setDailyMixData] = useState([]);
  const [topMixData, setTopMixData] = useState([]);
  const [radioPlaylist, setRadioPlaylist] = useState([]);
  const [turnOffPlaylist, setTurnOffPlaylist] = useState([]);
  const [recommendStation, setRecommendStation] = useState([]);
  const [bestOfArtists, setBestOfArtists] = useState([]);
  const [topArtistTrack2024, setTopArtistTrack2024] = useState([]);
  const [theBest2024, setTheBest2024] = useState([]);
  const [loopBack2024, setLoopBack2024] = useState([]);
  // State quản lý tab đang active
  const [activeTab, setActiveTab] = useState('Music'); 

  // Mock dữ liệu cho Wrapped
  const wrappedData = [
    { id: '1', title: 'Your Wrapped 2024' },
    { id: '2', title: 'Your Top Songs 2024' },
    { id: '3', title: 'Your Music Evolution 2024' },
    { id: '4', title: 'Top Artists of 2024' },
  ];

  // Animation References
  const dot1 = useRef(new Animated.Value(1)).current;
  const dot2 = useRef(new Animated.Value(1)).current;
  const dot3 = useRef(new Animated.Value(1)).current;

  // Khởi tạo hiệu ứng chấm tròn
  useEffect(() => {
    createDotAnimation(dot1, dot2, dot3);
  }, [dot1, dot2, dot3]);

  // Fetch Dữ Liệu Albums
  useEffect(() => {
    if (!albumsTemplate || albumsTemplate.length === 0) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const fetchPromises = albumsTemplate.map(({ artist_id, album_id }) =>
          fetch(`${API_BASE_URL}/search/album/${artist_id}/${album_id}`)
            .then(async (response) => {
              if (!response.ok) {
                throw new Error(
                  `Error fetching album ${album_id} for artist ${artist_id}: ${response.statusText}`
                );
              }
              const data = await response.json();
              return { ...data, artist_id, album_id };
            })
        );

        const fetchedAlbums = await Promise.all(fetchPromises);
        setAlbums(fetchedAlbums);
      } catch (err) {
        console.error('Error fetching albums:', err);
        setError('Failed to load albums. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handler khi nhấn vào album
  const handleAlbumPress = useCallback(
    async (artist_id, album_id) => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/search/album/${artist_id}/${album_id}`);
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const albumData = await response.json();
        navigation.navigate('AlbumTrackDetailScreen', {
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
        });
      } catch (err) {
        console.error('Error fetching album details:', err);
        Alert.alert('Error', 'Unable to fetch album details. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [navigation]
  );

  const handleDailyMixPress = useCallback(async (item) => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/dailyMixDetail/${item.id}`);
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        // console.log("Daily Mix: ")
        navigation.navigate('PlaylistDetailScreen', data);
      } catch (err) {
        console.error('Error fetching album details:', err);
        Alert.alert('Error', 'Unable to fetch album details. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [navigation]
  );
  const handleRadioPlaylistPress = useCallback(async (item) => {
    setLoading(true);
    try {
        const response = await fetch(`${API_BASE_URL}/radioPlaylistDetail/${item.id}`);
        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        navigation.navigate('PlaylistDetailScreen',  data );
    } catch (err) {
        console.error('Error fetching radio playlist details:', err);
        Alert.alert('Error', 'Unable to fetch radio playlist details. Please try again.');
    } finally {
        setLoading(false);
    }
  }, [navigation]);
  const handleTurnOffPlaylistPress = useCallback(async (item) => {
    setLoading(true);
    try {
        const response = await fetch(`${API_BASE_URL}/turnOffPlaylistDetail/${item.id}`);
        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        navigation.navigate('PlaylistDetailScreen',  data );
    } catch (err) {
        console.error('Error fetching turn off playlist details:', err);
        Alert.alert('Error', 'Unable to fetch turn off playlist details. Please try again.');
    } finally {
        setLoading(false);
    }
}, [navigation]);
const handleRecommendStationPress = useCallback(async (item) => {
  setLoading(true);
  try {
      const response = await fetch(`${API_BASE_URL}/recommendStationDetail/${item.id}`);
      if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      navigation.navigate('PlaylistDetailScreen',  data );
  } catch (err) {
      console.error('Error fetching recommend station details:', err);
      Alert.alert('Error', 'Unable to fetch recommend station details. Please try again.');
  } finally {
      setLoading(false);
  }
}, [navigation]);
const handleBestOfArtistPress = useCallback(async (item) => {
  setLoading(true);
  try {
      const response = await fetch(`${API_BASE_URL}/bestOfArtistDetail/${item.id}`);
      if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      navigation.navigate('PlaylistDetailScreen',  data );
  } catch (err) {
      console.error('Error fetching best of artist details:', err);
      Alert.alert('Error', 'Unable to fetch best of artist details. Please try again.');
  } finally {
      setLoading(false);
  }
}, [navigation]);
const handleTopArtistTrackPress = useCallback(async (item) => {
  setLoading(true);
  try {
      const response = await fetch(`${API_BASE_URL}/topArtistTrackDetail/${item.id}`);
      if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      navigation.navigate('PlaylistDetailScreen',  data );
  } catch (err) {
      console.error('Error fetching top artist track details:', err);
      Alert.alert('Error', 'Unable to fetch top artist track details. Please try again.');
  } finally {
      setLoading(false);
  }
}, [navigation]);
const handleTheBest2024Press = useCallback(async (item) => {
  setLoading(true);
  try {
      const response = await fetch(`${API_BASE_URL}/theBest2024Detail/${item.id}`);
      if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      navigation.navigate('PlaylistDetailScreen',  data );
  } catch (err) {
      console.error('Error fetching theBest2024 details:', err);
      Alert.alert('Error', 'Unable to fetch theBest2024 details. Please try again.');
  } finally {
      setLoading(false);
  }
}, [navigation]);
const handleLoopBack2024Press = useCallback(async (item) => {
  setLoading(true);
  try {
      const response = await fetch(`${API_BASE_URL}/loopBack2024Detail/${item.id}`);
      if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      navigation.navigate('PlaylistDetailScreen',  data );
  } catch (err) {
      console.error('Error fetching loopBack2024 details:', err);
      Alert.alert('Error', 'Unable to fetch loopBack2024 details. Please try again.');
  } finally {
      setLoading(false);
  }
}, [navigation]);

  const handleAlbumWrappedPress = useCallback(async (item) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/wrappedAlbumDetail/${item.id}`);
      // console.log(response.data)
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      // console.log("Home Screen", data);
      navigation.navigate('PlaylistDetailScreen', data);
    } catch (err) {
      console.error('Error fetching album details:', err);
      Alert.alert('Error', 'Unable to fetch album details. Please try again.');
    } finally {
      setLoading(false);
    }
  },
  [navigation]
  );
  const handleTopMixPress = useCallback(async (item) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/topMixDetail/${item.id}`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      // console.log("Home Screen", data);
      navigation.navigate('PlaylistDetailScreen', data);
    } catch (err) {
      console.error('Error fetching album details:', err);
      Alert.alert('Error', 'Unable to fetch album details. Please try again.');
    } finally {
      setLoading(false);
    }
  },
  [navigation]
);
  function removeHtmlTags(input) {
    if (!input) return '';
    return input.replace(/<[^>]*>/g, '').trim();
  }

  useEffect(() => {
    const fetchDailyMix = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/dailyMix`);
        if (!response.ok) {
          throw new Error(`Error fetching daily mix: ${response.statusText}`);
        }
        const data = await response.json();
        setDailyMixData(data);
      } catch (err) {
        console.error('Error fetching daily mix:', err);
        setError('Failed to load daily mix data. Please try again.');
      }
    };
  
    fetchDailyMix();
  }, []);

  useEffect(() => {
    const fetchRadioPlaylist = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/radioPlaylist`);
        if (!response.ok) {
          throw new Error(`Error fetching daily mix: ${response.statusText}`);
        }
        const data = await response.json();
        setRadioPlaylist(data);
      } catch (err) {
        console.error('Error fetching daily mix:', err);
        setError('Failed to load daily mix data. Please try again.');
      }
    };
  
    fetchRadioPlaylist();
  }, []);

  useEffect(() => {
    const fetchTopMix = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/topMix`);
        if (!response.ok) {
          throw new Error(`Error fetching daily mix: ${response.statusText}`);
        }
        const data = await response.json();
        setTopMixData(data);
      } catch (err) {
        console.error('Error fetching daily mix:', err);
        setError('Failed to load daily mix data. Please try again.');
      }
    };
  
    fetchTopMix();
  }, []);

  useEffect(() => {
    const fetchTurnOffPlaylist = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/turnOffPlaylist`);
        if (!response.ok) {
          throw new Error(`Error fetching daily mix: ${response.statusText}`);
        }
        const data = await response.json();
        // console.log("Turn off data",data)
        setTurnOffPlaylist(data);
      } catch (err) {
        console.error('Error fetching daily mix:', err);
        setError('Failed to load daily mix data. Please try again.');
      }
    };
  
    fetchTurnOffPlaylist();
  }, []);

  useEffect(() => {
    const fetchRecommendStation = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/recommendStation`);
        if (!response.ok) {
          throw new Error(`Error fetching daily mix: ${response.statusText}`);
        }
        const data = await response.json();
        // console.log("Recommend data",data)
        setRecommendStation(data);
      } catch (err) {
        console.error('Error fetching daily mix:', err);
        setError('Failed to load daily mix data. Please try again.');
      }
    };
  
    fetchRecommendStation();
  }, []);

  useEffect(() => {
    const fetchBestOfArtists = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/bestOfArtist`);
        if (!response.ok) {
          throw new Error(`Error fetching daily mix: ${response.statusText}`);
        }
        const data = await response.json();
        setBestOfArtists(data);
      } catch (err) {
        console.error('Error fetching daily mix:', err);
        setError('Failed to load daily mix data. Please try again.');
      }
    };
  
    fetchBestOfArtists();
  }, []);
  useEffect(() => {
    const fetchWrappedAlbum = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/wrappedAlbum`);
        if (!response.ok) {
          throw new Error(`Error fetching daily mix: ${response.statusText}`);
        }
        const data = await response.json();
        // console.log("Home Screen", data);
        setWrappedAlbum(data);
      } catch (err) {
        console.error('Error fetching daily mix:', err);
        setError('Failed to load daily mix data. Please try again.');
      }
    };
  
    fetchWrappedAlbum();
  }, []);
  useEffect(() => {
    const fetchTopArtistTrack2024 = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/topArtistTrack2024`);
        if (!response.ok) {
          throw new Error(`Error fetching daily mix: ${response.statusText}`);
        }
        const data = await response.json();
        // console.log("Home Screen", data);
        setTopArtistTrack2024(data);
      } catch (err) {
        console.error('Error fetching daily mix:', err);
        setError('Failed to load daily mix data. Please try again.');
      }
    };
  
    fetchTopArtistTrack2024();
  }, []);
  useEffect(() => {
    const fetchTheBest2024 = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/theBest2024`);
        if (!response.ok) {
          throw new Error(`Error fetching daily mix: ${response.statusText}`);
        }
        const data = await response.json();
        // console.log("Home Screen", data);
        setTheBest2024(data);
      } catch (err) {
        console.error('Error fetching daily mix:', err);
        setError('Failed to load daily mix data. Please try again.');
      }
    };
  
    fetchTheBest2024();
  }, []);
  useEffect(() => {
    const fetchLoopBack2024 = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/loopBack2024`);
        if (!response.ok) {
          throw new Error(`Error fetching daily mix: ${response.statusText}`);
        }
        const data = await response.json();
        // console.log("Home Screen", data);
        setLoopBack2024(data);
      } catch (err) {
        console.error('Error fetching daily mix:', err);
        setError('Failed to load daily mix data. Please try again.');
      }
    };
  
    fetchLoopBack2024();
  }, []);
  // Hàm render nội dung tùy theo tab đang chọn
  const renderContent = () => {
    if (activeTab === 'Music') {
      // Nội dung tab Music: Hiển thị albums, daily mix, top mix...
      return (
        <View>
          {/* Albums List */}
          <View style={{ marginTop: 20 }}>
            <FlatList
              data={albums}
              renderItem={({ item }) => (
                <AlbumCard
                  album={item}
                  onPress={() => handleAlbumPress(item.artist_id, item.album_id)}
                />
              )}
              keyExtractor={(item) => `${item.artist_id}-${item.album_id}`}
              numColumns={2}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.listContent}
              initialNumToRender={10}
              windowSize={21}
              removeClippedSubviews={true}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No albums found.</Text>
                </View>
              }
              scrollEnabled={false}
            />
          </View>

          {/* Your top mixes */}
          <View style={{ paddingHorizontal: 8, marginTop: 20 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Your top mixes</Text>
            <FlatList
              data={topMixData}
              horizontal
              renderItem={renderHorizontalItemTopMix}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Made For ... */}
          <View style={{ paddingHorizontal: 8, marginTop: 20 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Made For {user?.name || 'You'}</Text>
            <FlatList
              data={dailyMixData}
              horizontal
              renderItem={renderHorizontalItemDailyMix}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={{ paddingHorizontal: 8, marginTop: 20 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Popular radio</Text>
            <FlatList
              data={radioPlaylist}
              horizontal
              renderItem={renderHorizontalItemRadioPlaylist}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={{ paddingHorizontal: 8, marginTop: 20 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Tắt đèn</Text>
            <FlatList
              data={turnOffPlaylist}
              horizontal
              renderItem={renderHorizontalItemTurnOffPlaylist}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={{ paddingHorizontal: 8, marginTop: 20 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Recommended Stations</Text>
            <FlatList
              data={recommendStation}
              horizontal
              renderItem={renderHorizontalItemRecommendStation}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={{ paddingHorizontal: 8, marginTop: 20 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Best of artists</Text>
            <FlatList
              data={bestOfArtists}
              horizontal
              renderItem={renderHorizontalItemBestOfArtist}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      );
    } else if (activeTab === 'Wrapped') {
      // Nội dung tab Wrapped: Sử dụng dữ liệu wrappedData
      return (
        <View style={{ marginTop: 20 }}>
        <FlatList
          data={wrappedAlbum}
          renderItem={({ item }) => (
            <AlbumWrappedCard
              album={item}
              onPress={() => handleAlbumWrappedPress(item)}
            />
          )}
          keyExtractor={(item) => `${item.id}`}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          initialNumToRender={10}
          windowSize={21}
          removeClippedSubviews={true}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No albums found.</Text>
            </View>
          }
          scrollEnabled={false}
          />
                    {/* Your top mixes */}
        <View style={{ paddingHorizontal: 8, marginTop: 20 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>The top artist & track 2024</Text>
          <FlatList
            data={topArtistTrack2024}
            horizontal
            renderItem={renderHorizontalItemTopArtistTrack}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
          </View>
          
        <View style={{ paddingHorizontal: 8, marginTop: 20 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>The best of 2024</Text>
          <FlatList
            data={theBest2024}
            horizontal
            renderItem={renderHorizontalItemTheBest2024}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
          </View>
          <View style={{ paddingHorizontal: 8, marginTop: 20 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>A loop back at 2024</Text>
          <FlatList
            data={loopBack2024}
            horizontal
            renderItem={renderHorizontalItemLoopBack2024}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        </View>
        
        
      );
    }
  };

  const renderHorizontalItem = ({ item }) => (
    <TouchableOpacity 
      style={{ marginRight: 12, width: 150 }} 
      // onPress={() => handleDailyMixPress(item)}
    >
      <Image 
        source={{ uri: item.playlist_url }} 
        style={{ width: 150, height: 150, borderRadius: 8, marginBottom: 8 }} 
      />
      <Text 
        style={{ color: '#ccc', fontSize: 12 }} 
        numberOfLines={2}
      >
        {removeHtmlTags(item.description)}
      </Text>
    </TouchableOpacity>
  );
  const renderHorizontalItemDailyMix = ({ item }) => (
    <TouchableOpacity 
      style={{ marginRight: 12, width: 150 }} 
      onPress={() => handleDailyMixPress(item)}
    >
      <Image 
        source={{ uri: item.playlist_url }} 
        style={{ width: 150, height: 150, borderRadius: 8, marginBottom: 8 }} 
      />
      <Text 
        style={{ color: '#ccc', fontSize: 12 }} 
        numberOfLines={2}
      >
        {removeHtmlTags(item.description)}
      </Text>
    </TouchableOpacity>
  );
  const renderHorizontalItemTopMix = ({ item }) => (
    <TouchableOpacity 
      style={{ marginRight: 12, width: 150 }} 
      onPress={() => handleTopMixPress(item)}
    >
      <Image 
        source={{ uri: item.playlist_url }} 
        style={{ width: 150, height: 150, borderRadius: 8, marginBottom: 8 }} 
      />
      <Text 
        style={{ color: '#ccc', fontSize: 12 }} 
        numberOfLines={2}
      >
        {removeHtmlTags(item.description)}
      </Text>
    </TouchableOpacity>
  );
  const renderHorizontalItemRadioPlaylist = ({ item }) => (
    <TouchableOpacity 
      style={{ marginRight: 12, width: 150 }} 
      onPress={() => handleRadioPlaylistPress(item)}
    >
      <Image 
        source={{ uri: item.playlist_url }} 
        style={{ width: 150, height: 150, borderRadius: 8, marginBottom: 8 }} 
      />
      <Text 
        style={{ color: '#ccc', fontSize: 12 }} 
        numberOfLines={2}
      >
        {removeHtmlTags(item.description)}
      </Text>
    </TouchableOpacity>
  );
  const renderHorizontalItemTurnOffPlaylist = ({ item }) => (
    <TouchableOpacity 
      style={{ marginRight: 12, width: 150 }} 
      onPress={() => handleTurnOffPlaylistPress(item)}
    >
      <Image 
        source={{ uri: item.playlist_url }} 
        style={{ width: 150, height: 150, borderRadius: 8, marginBottom: 8 }} 
      />
      <Text 
        style={{ color: '#ccc', fontSize: 12 }} 
        numberOfLines={2}
      >
        {removeHtmlTags(item.description)}
      </Text>
    </TouchableOpacity>
);
const renderHorizontalItemRecommendStation = ({ item }) => (
  <TouchableOpacity 
    style={{ marginRight: 12, width: 150 }} 
    onPress={() => handleRecommendStationPress(item)}
  >
    <Image 
      source={{ uri: item.playlist_url }} 
      style={{ width: 150, height: 150, borderRadius: 8, marginBottom: 8 }} 
    />
    <Text 
      style={{ color: '#ccc', fontSize: 12 }} 
      numberOfLines={2}
    >
      {removeHtmlTags(item.description)}
    </Text>
  </TouchableOpacity>
);
const renderHorizontalItemBestOfArtist = ({ item }) => (
  <TouchableOpacity 
    style={{ marginRight: 12, width: 150 }} 
    onPress={() => handleBestOfArtistPress(item)}
  >
    <Image 
      source={{ uri: item.playlist_url }} 
      style={{ width: 150, height: 150, borderRadius: 8, marginBottom: 8 }} 
    />
    <Text 
      style={{ color: '#ccc', fontSize: 12 }} 
      numberOfLines={2}
    >
      {removeHtmlTags(item.artist_name)}
    </Text>
  </TouchableOpacity>
);
const renderHorizontalItemTopArtistTrack = ({ item }) => (
  <TouchableOpacity 
    style={{ marginRight: 12, width: 150 }} 
    onPress={() => handleTopArtistTrackPress(item)}
  >
    <Image 
      source={{ uri: item.playlist_url }} 
      style={{ width: 150, height: 150, borderRadius: 8, marginBottom: 8 }} 
    />
    <Text 
      style={{ color: '#ccc', fontSize: 12 }} 
      numberOfLines={2}
    >
      {removeHtmlTags(item.track_title)}
    </Text>
  </TouchableOpacity>
);
const renderHorizontalItemTheBest2024 = ({ item }) => (
  <TouchableOpacity 
    style={{ marginRight: 12, width: 150 }} 
    onPress={() => handleTheBest2024Press(item)}
  >
    <Image 
      source={{ uri: item.playlist_url }} 
      style={{ width: 150, height: 150, borderRadius: 8, marginBottom: 8 }} 
    />
    <Text 
      style={{ color: '#ccc', fontSize: 12 }} 
      numberOfLines={2}
    >
      {removeHtmlTags(item.item_title)}
    </Text>
  </TouchableOpacity>
);
const renderHorizontalItemLoopBack2024 = ({ item }) => (
  <TouchableOpacity 
    style={{ marginRight: 12, width: 150 }} 
    onPress={() => handleLoopBack2024Press(item)}
  >
    <Image 
      source={{ uri: item.playlist_url }} 
      style={{ width: 150, height: 150, borderRadius: 8, marginBottom: 8 }} 
    />
    <Text 
      style={{ color: '#ccc', fontSize: 12 }} 
      numberOfLines={2}
    >
      {removeHtmlTags(item.item_title)}
    </Text>
  </TouchableOpacity>
);




  // Render Loading Indicator
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Animated.View style={[styles.dot, { transform: [{ scale: dot1 }] }]} />
        <Animated.View style={[styles.dot, { transform: [{ scale: dot2 }] }]} />
        <Animated.View style={[styles.dot, { transform: [{ scale: dot3 }] }]} />
        <ActivityIndicator size="small" color="#1DB954" style={{ marginTop: 20 }} />
      </View>
    );
  }

  // Render Error Message
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setLoading(true);
            setError(null);
            setAlbums([]);
          }}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Start */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.drawerButton}
        >
          <Image
            source={{
              uri: user?.photoURL || 'https://via.placeholder.com/40',
            }}
            style={styles.drawerImage}
          />
        </TouchableOpacity>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
        >
          {/* Music Tab */}
          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === 'Music' ? styles.activeTab : null,
            ]}
            onPress={() => setActiveTab('Music')}
          >
            <Text style={styles.tabText}>Music</Text>
          </TouchableOpacity>

          {/* Wrapped Tab */}
          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === 'Wrapped' ? styles.activeTab : null,
            ]}
            onPress={() => setActiveTab('Wrapped')}
          >
            <Text style={styles.tabText}>Wrapped</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/* Header End */}

      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 30,
    paddingBottom: 80,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#121212',
  },
  drawerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 16,
  },
  drawerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  tabContainer: {
    alignItems: 'center',
  },
  tabItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#2a2a2a',
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#1DB954',
  },
  tabText: {
    color: '#fff',
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 7.5,
    backgroundColor: '#1DB954',
    marginHorizontal: 5,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: '#fff',
    marginBottom: 20
  },
  retryButton: {
    backgroundColor: '#1DB954',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  retryButtonText: {
    color: '#fff'
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardText: {
    color: '#fff',
  },
});

export default HomeScreen;
