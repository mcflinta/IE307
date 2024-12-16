

// import React, { useEffect, useState, useRef } from 'react';
// import { View, FlatList, Animated, StyleSheet, Alert, StatusBar, TouchableOpacity,Image, ScrollView, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; // Import navigation hook
// import { getAccessToken, fetchAlbumsByArtistName, fetchAlbumTracks, fetchArtistOverview } from '../services/spotifyService';
// import AlbumCard from '../components/AlbumCard';
// import { createDotAnimation } from '../animations/dotAnimation';
// import CustomDrawerButton from '../components/CustomDrawerContent';
// const HomeScreen = ({ route }) => {
//   const [albums, setAlbums] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation(); // Get navigation object from hook
//   const { user, artists = ['Aimer'] } = route.params || {}; // Nhận danh sách ca sĩ từ route params
//   // console.log('User HomeScreen:', route.params);
  
//   const dot1 = useRef(new Animated.Value(1)).current;
//   const dot2 = useRef(new Animated.Value(1)).current;
//   const dot3 = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = await getAccessToken();
//         const fetchedAlbums = [];

//         for (const artist of artists) {
//           // Fetch albums cho từng ca sĩ
//           const albumsByArtist = await fetchAlbumsByArtistName(token, artist);
//           fetchedAlbums.push(...albumsByArtist);
//         }

//         setAlbums(fetchedAlbums);
//       } catch (error) {
//         console.error('Error fetching albums:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [artists]); // Thêm danh sách ca sĩ vào dependencies

//   // Animation
//   useEffect(() => {
//     createDotAnimation(dot1, dot2, dot3);
//   }, [dot1, dot2, dot3]);

//   const handleAlbumPress = async (album) => {
//     setLoading(true);
//     try {
//       const token = await getAccessToken();
//       const { tracks: fetchedTracks, albumImages, artists, releaseYear, fullReleaseDate, totalTracks, totalDuration } = await fetchAlbumTracks(token, album.id);

//       const artistNames = artists
//         .map(artist => artist.name)
//         .filter((name, index, self) => self.indexOf(name) === index)
//         .join(', ');

//       const albumImage = albumImages?.[0]?.url || ''; // Lấy URL hình ảnh đầu tiên của album nếu có
//       const artistImageUrls = artists.map(artist => artist.imageUrl).filter(url => url); // Lọc bỏ các giá trị null

//       navigation.navigate('AlbumTrackDetailScreen', {
//         albumName: album.title,
//         artistName: artistNames,
//         tracks: fetchedTracks,
//         albumImage, // Hình ảnh album
//         artistImageUrl: artistImageUrls?.[0] || null, // Lấy URL hình ảnh đầu tiên của nghệ sĩ,
//         releaseYear,
//         fullReleaseDate,
//         totalTracks,
//         totalDuration,
//       });
//     } catch (error) {
//       console.error('Error fetching tracks:', error);
//       Alert.alert('Error', 'Unable to fetch tracks for the selected album.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Animated.View style={[styles.dot, { transform: [{ scale: dot1 }] }]} />
//         <Animated.View style={[styles.dot, { transform: [{ scale: dot2 }] }]} />
//         <Animated.View style={[styles.dot, { transform: [{ scale: dot3 }] }]} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={albums}
//         renderItem={({ item }) => (
//           <AlbumCard album={item} onPress={() => handleAlbumPress(item)} />
//         )}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     paddingHorizontal: 8,
//     paddingTop: 16,
//   },

//   row: {
//     justifyContent: 'space-between',
//     marginBottom: 16,
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
// import React, { useEffect, useState, useRef } from 'react';
// import { View, FlatList, Animated, StyleSheet, Alert, StatusBar, TouchableOpacity, Image, ScrollView, Text } from 'react-native';
// import { useNavigation, DrawerActions } from '@react-navigation/native';
// import { getAccessToken, fetchAlbumsByArtistName, fetchAlbumTracks } from '../services/spotifyService';
// import AlbumCard from '../components/AlbumCard';
// import { createDotAnimation } from '../animations/dotAnimation';
// import { API_BASE_URL } from '../config/config';
// const HomeScreen = ({ route }) => {
//   const [albums, setAlbums] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();
//   const { user, artists = ["Hikaru UTada"] } = route.params || {};

//   const dot1 = useRef(new Animated.Value(1)).current;
//   const dot2 = useRef(new Animated.Value(1)).current;
//   const dot3 = useRef(new Animated.Value(1)).current;

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const token = await getAccessToken();
//   //       const fetchedAlbums = [];

//   //       for (const artist of artists) {
//   //         const albumsByArtist = await fetchAlbumsByArtistName(token, artist);
//   //         fetchedAlbums.push(...albumsByArtist);
//   //       }

//   //       setAlbums(fetchedAlbums);
//   //     } catch (error) {
//   //       console.error('Error fetching albums:', error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [artists]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Làm trống danh sách album trước khi fetch
//         const fetchedAlbums = [];
  
//         for (const artist of artists) {
//           // Lặp qua danh sách album của từng nghệ sĩ
//           for (const album of artist.albums) {
//             // Gửi request đến API server với artistId và albumId
//             const response = await fetch(`${API_BASE_URL}/search/album/${artist.id}/${album.id}`);
            
//             if (!response.ok) {
//               console.error(`Error fetching album ${album.id} for artist ${artist.id}: ${response.statusText}`);
//               continue; // Bỏ qua album này nếu gặp lỗi
//             }
  
//             const albumData = await response.json();
//             fetchedAlbums.push(albumData); // Thêm dữ liệu album vào danh sách
//           }
//         }
  
//         // Cập nhật state với danh sách album
//         setAlbums(fetchedAlbums);
//       } catch (error) {
//         console.error('Error fetching albums:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchData();
//   }, [artists]);
//   useEffect(() => {
//     createDotAnimation(dot1, dot2, dot3);
//   }, [dot1, dot2, dot3]);

//   // const handleAlbumPress = async (album) => {
//   //   setLoading(true);
//   //   try {
//   //     const token = await getAccessToken();
//   //     const { tracks: fetchedTracks, albumImages, artists, releaseYear, fullReleaseDate, totalTracks, totalDuration } = await fetchAlbumTracks(token, album.id);

//   //     const artistNames = artists
//   //       .map(artist => artist.name)
//   //       .filter((name, index, self) => self.indexOf(name) === index)
//   //       .join(', ');

//   //     const albumImage = albumImages?.[0]?.url || '';
//   //     const artistImageUrls = artists.map(artist => artist.imageUrl).filter(url => url);

//   //     navigation.navigate('AlbumTrackDetailScreen', {
//   //       albumName: album.title,
//   //       artistName: artistNames,
//   //       tracks: fetchedTracks,
//   //       albumImage,
//   //       artistImageUrl: artistImageUrls?.[0] || null,
//   //       releaseYear,
//   //       fullReleaseDate,
//   //       totalTracks,
//   //       totalDuration,
//   //     });
//   //   } catch (error) {
//   //     console.error('Error fetching tracks:', error);
//   //     Alert.alert('Error', 'Unable to fetch tracks for the selected album.');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const handleAlbumPress = async (album) => {
//     setLoading(true);
//     try {
//       // Lấy ID của nghệ sĩ và album
//       const artistId = album.artistId;
//       const albumId = album.id;
  
//       // Gửi yêu cầu đến API server
//       const response = await fetch(`http://localhost:3000/search/album/${artistId}/${albumId}`);
      
//       if (!response.ok) {
//         throw new Error(`Server error: ${response.statusText}`);
//       }
  
//       const albumData = await response.json();
  
//       // Chuẩn bị dữ liệu để truyền vào navigation
//       const artistNames = albumData.artistName;
//       const albumImage = albumData.albumImage;
//       const artistImageUrl = albumData.artistImageUrl || null;
  
//       navigation.navigate('AlbumTrackDetailScreen', {
//         albumName: albumData.albumName,
//         artistName: artistNames,
//         tracks: albumData.tracks,
//         albumImage,
//         artistImageUrl,
//         releaseYear: albumData.releaseYear,
//         fullReleaseDate: albumData.fullReleaseDate,
//         totalTracks: albumData.totalTracks,
//         totalDuration: albumData.totalDuration,
//       });
//     } catch (error) {
//       console.error('Error fetching album details:', error);
//       Alert.alert('Error', 'Unable to fetch album details. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Animated.View style={[styles.dot, { transform: [{ scale: dot1 }] }]} />
//         <Animated.View style={[styles.dot, { transform: [{ scale: dot2 }] }]} />
//         <Animated.View style={[styles.dot, { transform: [{ scale: dot3 }] }]} />
//       </View>
//     );
//   }

// import React, { useEffect, useState, useRef } from 'react';
// import { View, FlatList, Animated, StyleSheet, Alert, StatusBar, TouchableOpacity, Image, ScrollView, Text } from 'react-native';
// import { useNavigation, DrawerActions } from '@react-navigation/native';
// import { getAccessToken, fetchAlbumsByArtistName, fetchAlbumTracks } from '../services/spotifyService';
// import AlbumCard from '../components/AlbumCard';
// import { createDotAnimation } from '../animations/dotAnimation';
// import { API_BASE_URL } from '../config/config';

// const HomeScreen = ({ route }) => {
//   const [albums, setAlbums] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();
//   const { user, artists = [
//     {
//       id: '7lbSsjYACZHn1MSDXPxNF2', // artistId
//       name: 'Hikaru Utada',
//       albums: [
//         { id: '7IW2fn8BbxdqXBdjZ9C3GM', title: 'Hikaru Utada Live Sessions' },
//       ]
//     },
//   ] } = route.params || {};

//   const dot1 = useRef(new Animated.Value(1)).current;
//   const dot2 = useRef(new Animated.Value(1)).current;
//   const dot3 = useRef(new Animated.Value(1)).current;

//   // Fetch danh sách album
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedAlbums = [];

//         for (const artist of artists) {
//           for (const album of artist.albums || []) {
//             const response = await fetch(`${API_BASE_URL}/search/album/7lbSsjYACZHn1MSDXPxNF2/7IW2fn8BbxdqXBdjZ9C3GM`);
//             // console.log(response.text)
//             if (!response.ok) {
//               console.error(`Error fetching album ${album.id} for artist ${artist.id}: ${response.statusText}`);
//               continue;
//             }

//             const albumData = await response.json();
//             fetchedAlbums.push(albumData);
//             // console.log(albumData);
//           }
//         }

//         setAlbums(fetchedAlbums);
//       } catch (error) {
//         console.error('Error fetching albums:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [artists]);

//   // Tạo hiệu ứng chấm tròn khi tải
//   useEffect(() => {
//     createDotAnimation(dot1, dot2, dot3);
//   }, [dot1, dot2, dot3]);

//   // Xử lý khi nhấn vào album
//   const handleAlbumPress = async (album) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/search/album/7lbSsjYACZHn1MSDXPxNF2/7IW2fn8BbxdqXBdjZ9C3GM`);
      
//       if (!response.ok) {
//         throw new Error(`Server error: ${response.statusText}`);
//       }

//       const albumData = await response.json();
//       console.log("HomeScreen: ",albumData.totalTracks);
//       navigation.navigate('AlbumTrackDetailScreen', {
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
//         // colorLight: albumData.colorLight,
//       });
//     } catch (error) {
//       console.error('Error fetching album details:', error);
//       Alert.alert('Error', 'Unable to fetch album details. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Hiển thị loading spinner
//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Animated.View style={[styles.dot, { transform: [{ scale: dot1 }] }]} />
//         <Animated.View style={[styles.dot, { transform: [{ scale: dot2 }] }]} />
//         <Animated.View style={[styles.dot, { transform: [{ scale: dot3 }] }]} />
//       </View>
//     );
//   }
//   return (
//     <View style={styles.container}>
//       {/* Header Start */}
//       <View style={styles.headerContainer}>
//       <TouchableOpacity 
//         onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//         style={styles.drawerButton}
//       >
//         <Image 
//           source={{ uri: user?.photoURL || 'https://via.placeholder.com/40' }} 
//           style={styles.drawerImage} 
//         />
//       </TouchableOpacity>


//         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer}>
//           <TouchableOpacity style={[styles.tabItem, { backgroundColor: '#1DB954' }]}>
//             <Text style={styles.tabText}>All</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.tabItem}>
//             <Text style={styles.tabText}>Music</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.tabItem}>
//             <Text style={styles.tabText}>Podcasts</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('WrappedScreen')}>
//             <Text style={styles.tabText}>Wrapped</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//       {/* Header End */}

//       <FlatList
//         data={albums}
//         renderItem={({ item }) => (
//           <AlbumCard album={item} onPress={() => handleAlbumPress(item)} />
//         )}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//         contentContainerStyle={styles.listContent}
//       />
//     </View>
//   );
// };
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, FlatList, Animated, StyleSheet, Alert, StatusBar, TouchableOpacity, Image, ScrollView, Text, ActivityIndicator } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { getAccessToken, fetchAlbumsByArtistName, fetchAlbumTracks } from '../services/spotifyService';
import AlbumCard from '../components/AlbumCard';
import { createDotAnimation } from '../animations/dotAnimation';
import { API_BASE_URL } from '../config/config';
import albumsTemplate from '../data/albumArtist'; // Đường dẫn tới file template

// Template Dữ Liệu (Có thể import từ file JSON nếu muốn)
// const albumsTemplate = [
//   {
//     artist_id: "0bAsR2unSRpn6BQPEnNlZm",
//     album_id: "4BJ7PY6YSfHY9pu2nDFBiy",
//   },
//   {
//     artist_id: "7lbSsjYACZHn1MSDXPxNF2",
//     album_id: "7IW2fn8BbxdqXBdjZ9C3GM",
//   },
//   // Thêm các đối tượng tương tự ở đây
// ];

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = route.params || {};

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        // Tạo tất cả các promise fetch
        const fetchPromises = albumsTemplate.map(({ artist_id, album_id }) =>
          fetch(`${API_BASE_URL}/search/album/${artist_id}/${album_id}`)
            .then(async (response) => {
              if (!response.ok) {
                throw new Error(
                  `Error fetching album ${album_id} for artist ${artist_id}: ${response.statusText}`
                );
              }
              const data = await response.json();
              // Giữ lại artist_id và album_id trong dữ liệu trả về
              return { ...data, artist_id, album_id };
            })
        );

        // Thực thi tất cả các fetch cùng lúc
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
            // Kích hoạt lại việc fetch dữ liệu bằng cách reload component
            // Sử dụng setLoading để trigger lại useEffect
            setLoading(true);
            setError(null);
            // Gọi lại useEffect bằng cách đặt lại albums
            setAlbums([]);
            // Gọi lại fetchData bằng cách tái sử dụng logic
            // Một cách đơn giản là sử dụng useEffect phụ thuộc vào albums.length
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

      {/* Albums List */}
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
      />
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
});

export default HomeScreen;
