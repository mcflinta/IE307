// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import { View, FlatList, Animated, StyleSheet, Alert, StatusBar, TouchableOpacity, Image, ScrollView, Text, ActivityIndicator } from 'react-native';
// import { useNavigation, DrawerActions } from '@react-navigation/native';
// import { getAccessToken, fetchAlbumsByArtistName, fetchAlbumTracks } from '../services/spotifyService';
// import AlbumCard from '../components/AlbumCard';
// import { createDotAnimation } from '../animations/dotAnimation';
// import { API_BASE_URL } from '../config/config';
// import albumsTemplate from '../data/albumArtist'; 

// const HomeScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const { user } = route.params || {};
//   // console.log('user', user.name);
//   const [albums, setAlbums] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Animation References
//   const dot1 = useRef(new Animated.Value(1)).current;
//   const dot2 = useRef(new Animated.Value(1)).current;
//   const dot3 = useRef(new Animated.Value(1)).current;

//   // Khởi tạo hiệu ứng chấm tròn
//   useEffect(() => {
//     createDotAnimation(dot1, dot2, dot3);
//   }, [dot1, dot2, dot3]);

//   // Fetch Dữ Liệu Albums
//   useEffect(() => {
//     if (!albumsTemplate || albumsTemplate.length === 0) {
//       setLoading(false);
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         // Tạo tất cả các promise fetch
//         const fetchPromises = albumsTemplate.map(({ artist_id, album_id }) =>
//           fetch(`${API_BASE_URL}/search/album/${artist_id}/${album_id}`)
//             .then(async (response) => {
//               if (!response.ok) {
//                 throw new Error(
//                   `Error fetching album ${album_id} for artist ${artist_id}: ${response.statusText}`
//                 );
//               }
//               const data = await response.json();
//               // Giữ lại artist_id và album_id trong dữ liệu trả về
//               return { ...data, artist_id, album_id };
//             })
//         );

//         // Thực thi tất cả các fetch cùng lúc
//         const fetchedAlbums = await Promise.all(fetchPromises);
//         setAlbums(fetchedAlbums);
//       } catch (err) {
//         console.error('Error fetching albums:', err);
//         setError('Failed to load albums. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handler khi nhấn vào album
//   const handleAlbumPress = useCallback(
//     async (artist_id, album_id) => {
//       setLoading(true);
//       try {
//         const response = await fetch(`${API_BASE_URL}/search/album/${artist_id}/${album_id}`);
//         if (!response.ok) {
//           throw new Error(`Server error: ${response.statusText}`);
//         }

//         const albumData = await response.json();
//         navigation.navigate('AlbumTrackDetailScreen', {
//           albumName: albumData.albumName,
//           artistName: albumData.artistName,
//           tracks: albumData.tracks,
//           albumImage: albumData.albumImage,
//           artistImageUrl: albumData.artistImageUrl || null,
//           releaseYear: albumData.releaseYear,
//           fullReleaseDate: albumData.fullReleaseDate,
//           totalTracks: albumData.totalTracks,
//           totalDuration: albumData.totalDuration,
//           colorDark: albumData.colorDark,
//           albumType: albumData.albumType,
//           moreAlbumsByArtist: albumData.moreAlbumsByArtist,
//           copyright: albumData.copyright,
//         });
//       } catch (err) {
//         console.error('Error fetching album details:', err);
//         Alert.alert('Error', 'Unable to fetch album details. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     },
//     [navigation]
//   );

//   // Render Loading Indicator
//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Animated.View style={[styles.dot, { transform: [{ scale: dot1 }] }]} />
//         <Animated.View style={[styles.dot, { transform: [{ scale: dot2 }] }]} />
//         <Animated.View style={[styles.dot, { transform: [{ scale: dot3 }] }]} />
//         <ActivityIndicator size="small" color="#1DB954" style={{ marginTop: 20 }} />
//       </View>
//     );
//   }

//   // Render Error Message
//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//         <TouchableOpacity
//           style={styles.retryButton}
//           onPress={() => {
//             // Kích hoạt lại việc fetch dữ liệu bằng cách reload component
//             // Sử dụng setLoading để trigger lại useEffect
//             setLoading(true);
//             setError(null);
//             // Gọi lại useEffect bằng cách đặt lại albums
//             setAlbums([]);
//             // Gọi lại fetchData bằng cách tái sử dụng logic
//             // Một cách đơn giản là sử dụng useEffect phụ thuộc vào albums.length
//           }}
//         >
//           <Text style={styles.retryButtonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Header Start */}
//       <View style={styles.headerContainer}>
//         <TouchableOpacity
//           onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//           style={styles.drawerButton}
//         >
//           <Image
//             source={{
//               uri: user?.photoURL || 'https://via.placeholder.com/40',
//             }}
//             style={styles.drawerImage}
//           />
//         </TouchableOpacity>

//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.tabContainer}
//         >
//           <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
//             <Text style={styles.tabText}>All</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.tabItem}>
//             <Text style={styles.tabText}>Music</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.tabItem}>
//             <Text style={styles.tabText}>Podcasts</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.tabItem}
//             onPress={() => navigation.navigate('WrappedScreen')}
//           >
//             <Text style={styles.tabText}>Wrapped</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//       {/* Header End */}

//       {/* Albums List */}
//       <FlatList
//         data={albums}
//         renderItem={({ item }) => (
//           <AlbumCard
//             album={item}
//             onPress={() => handleAlbumPress(item.artist_id, item.album_id)}
//           />
//         )}
//         keyExtractor={(item) => `${item.artist_id}-${item.album_id}`}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//         contentContainerStyle={styles.listContent}
//         initialNumToRender={10}
//         windowSize={21}
//         removeClippedSubviews={true}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>No albums found.</Text>
//           </View>
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     paddingTop:30,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//     paddingTop: 16,
//     paddingBottom: 8,
//     backgroundColor: '#121212',
//   },
//   drawerButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     overflow: 'hidden',
//     marginRight: 16,
//   },
//   drawerImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 20,
//   },
//   tabContainer: {
//     alignItems: 'center',
//   },
//   tabItem: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 16,
//     backgroundColor: '#2a2a2a',
//     marginRight: 8,
//   },
//   tabText: {
//     color: '#fff',
//     fontSize: 14,
//   },
//   listContent: {
//     paddingHorizontal: 8,
//     paddingTop: 8,
//   },
//   row: {
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#121212',
//     flexDirection: 'row',
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 7.5,
//     backgroundColor: '#1DB954',
//     marginHorizontal: 5,
//   },
// });

// export default HomeScreen;

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, FlatList, Animated, StyleSheet, Alert, StatusBar, TouchableOpacity, Image, ScrollView, Text, ActivityIndicator } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { getAccessToken, fetchAlbumsByArtistName, fetchAlbumTracks } from '../services/spotifyService';
import AlbumCard from '../components/AlbumCard';
import { createDotAnimation } from '../animations/dotAnimation';
import { API_BASE_URL } from '../config/config';
import albumsTemplate from '../data/albumArtist'; 

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = route.params || {};

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dailyMixData, setDailyMixData] = useState([]);
  const [topMixData, setTopMixData] = useState([]);
  const [radioPlaylist, setRadioPlaylist] = useState([]);
  const [turnOffPlaylist, setTurnOffPlaylist] = useState([]);
  const [recommendStation, setRecommendStation] = useState([]);
  const [bestOfArtists, setBestOfArtists] = useState([]);
  // Mock data cho "Your top mixes"

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
  const handleDailyMixPress = useCallback( async (item) => {
    // console.log("Pressed item:", item.id);
    // navigation.navigate('PlaylistDetailScreen', );
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/dailyMixDetail/${item.id}`);
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        // console.log('data', data.playlist_info.name);
        navigation.navigate('PlaylistDetailScreen', data);
        // navigation.navigate('AlbumTrackDetailScreen', {
        //   albumName: albumData.albumName,
        //   artistName: albumData.artistName,
        //   tracks: albumData.tracks,
        //   albumImage: albumData.albumImage,
        //   artistImageUrl: albumData.artistImageUrl || null,
        //   releaseYear: albumData.releaseYear,
        //   fullReleaseDate: albumData.fullReleaseDate,
        //   totalTracks: albumData.totalTracks,
        //   totalDuration: albumData.totalDuration,
        //   colorDark: albumData.colorDark,
        //   albumType: albumData.albumType,
        //   moreAlbumsByArtist: albumData.moreAlbumsByArtist,
        //   copyright: albumData.copyright,
        // });
        // console.log('data', data);
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
        const response = await fetch(`${API_BASE_URL}/dailyMix`); // Địa chỉ server của bạn
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
        const response = await fetch(`${API_BASE_URL}/radioPlaylist`); // Địa chỉ server của bạn
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
        const response = await fetch(`${API_BASE_URL}/topMix`); // Địa chỉ server của bạn
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
        const response = await fetch(`${API_BASE_URL}/turnOffPlaylist`); // Địa chỉ server của bạn
        if (!response.ok) {
          throw new Error(`Error fetching daily mix: ${response.statusText}`);
        }
        const data = await response.json();
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
        const response = await fetch(`${API_BASE_URL}/recommendStation`); // Địa chỉ server của bạn
        if (!response.ok) {
          throw new Error(`Error fetching daily mix: ${response.statusText}`);
        }
        const data = await response.json();
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
        const response = await fetch(`${API_BASE_URL}/bestOfArtist`); // Địa chỉ server của bạn
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

  
  const renderHorizontalItem = ({ item }) => (
    <TouchableOpacity 
      style={{ marginRight: 12, width: 150 }} 
      onPress={() => handleDailyMixPress(item)} // Truyền tham số `item`
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
          <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
            <Text style={styles.tabText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabText}>Music</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabText}>Podcasts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate('WrappedScreen')}
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
        {/* Albums List (hiển thị theo dạng lưới dọc) */}
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
            scrollEnabled={false} // Quan trọng để tránh xung đột scroll với ScrollView cha
          />
        </View>
                {/* Your top mixes */}
        <View style={{ paddingHorizontal: 8, marginTop: 20 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Your top mixes</Text>
          <FlatList
            data={topMixData}
            horizontal
            renderItem={renderHorizontalItem}
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
            renderItem={renderHorizontalItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={{ paddingHorizontal: 8, marginTop: 20 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Popular radio</Text>
          <FlatList
            data={radioPlaylist}
            horizontal
            renderItem={renderHorizontalItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={{ paddingHorizontal: 8, marginTop: 20 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Tắt đèn</Text>
          <FlatList
            data={turnOffPlaylist}
            horizontal
            renderItem={renderHorizontalItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={{ paddingHorizontal: 8, marginTop: 20 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Recommended Stations</Text>
          <FlatList
            data={recommendStation}
            horizontal
            renderItem={renderHorizontalItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={{ paddingHorizontal: 8, marginTop: 20 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Best of artists</Text>
          <FlatList
            data={bestOfArtists}
            horizontal
            renderItem={renderHorizontalItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop:30,
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
});

export default HomeScreen;
