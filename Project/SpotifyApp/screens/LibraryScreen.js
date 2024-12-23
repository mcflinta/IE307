// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const LibraryScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>This is the Library Screen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#121212',
//   },
//   text: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });

// export default LibraryScreen;

// import React, {useCallback} from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
// import { useNavigation, DrawerActions } from '@react-navigation/native';
// const LibraryScreen = ({route}) => {
//   const navigation = useNavigation();
//   const { user } = route.params || {};

//   // Dữ liệu mẫu cho các mục trong thư viện
//   const handleDrawerOpen = useCallback(() => {
//     navigation.dispatch(DrawerActions.openDrawer());
//   }, [navigation]);
//   const libraryData = [
//     {
//       id: '1',
//       title: 'Liked Songs',
//       subtitle: 'Playlist • 176 songs',
//       image: 'https://via.placeholder.com/50/4e54c8/FFFFFF?text=%E2%9D%A4',
//     },
//   ];

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.card}>
//       <Image source={{ uri: item.image }} style={styles.image} />
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.subtitle}>{item.subtitle}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Header có hình ảnh bo tròn */}
//       <View style={styles.headerContainer}>
//       <TouchableOpacity onPress={handleDrawerOpen} style={styles.drawerButton}>
//           <Image
//             source={{
//               uri: user?.photoURL || 'https://via.placeholder.com/40',
//             }}
//             style={styles.drawerImage}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Your Library</Text>
//       </View>

//       <FlatList
//         data={libraryData}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     paddingTop: 50,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 20,
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20, // Bo tròn hình ảnh
//     marginRight: 10,
//   },
//   headerText: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   listContainer: {
//     paddingHorizontal: 10,
//   },
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#181818',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 10,
//   },
//   image: {
//     width: 50,
//     height: 50,
//     borderRadius: 8,
//   },
//   textContainer: {
//     marginLeft: 15,
//     justifyContent: 'center',
//   },
//   title: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   subtitle: {
//     color: '#b3b3b3',
//     fontSize: 12,
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
// });

// export default LibraryScreen;

import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import axios from 'axios';
import tokenManager from '../services/TokenManager';

import { API_BASE_URL } from '../config/config';
const LibraryScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = route.params || {};
  const [favorite, setFavorite] = useState([]);
  const [libraryData, setLibraryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mở Drawer
  const handleDrawerOpen = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  // Gọi API playlists-with-tracks
  useEffect(() => {
    const fetchLibraryData = async () => {
      try {
        const token = await tokenManager.getToken();
        if (!token) {
          throw new Error('Token is missing.');
        }

        const response = await axios.get(`${API_BASE_URL}/playlists-with-tracks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(response.data[0].playlist_info);
        const playlists = response.data.map((playlist) => ({
          id: playlist.playlist_info.id,
          title: playlist.playlist_info.name,
          subtitle: `Playlist • ${playlist.tracks.length} songs`,
          image: playlist.playlist_info.image,
          tracks: playlist.tracks,
        }));
        setLibraryData(playlists);
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setError('Failed to fetch playlists.');
      } finally {
        setLoading(false);
      }
    };

    fetchLibraryData();
  }, []);

  // Hiển thị chi tiết playlist khi người dùng bấm vào
  const handlePlaylistPress = async () => {
    try {
      const token = await tokenManager.getToken();
      if (!token) {
        throw new Error('Token is missing.');
      }
  
      const response = await axios.get(`${API_BASE_URL}/playlists-with-tracks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const selectedPlaylist = response.data[0];
      setFavorite(selectedPlaylist);
  
      navigation.navigate('HomeStack', {
        screen: 'PlaylistDetailScreen',
        params: selectedPlaylist, // Sử dụng trực tiếp dữ liệu từ API
      });
    } catch (error) {
      console.error('Error fetching playlist:', error);
      // Hiển thị thông báo lỗi cho người dùng (nếu cần)
    }
  };

  // Màn hình loading hoặc lỗi
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading playlists...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePlaylistPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header có hình ảnh bo tròn */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleDrawerOpen} style={styles.drawerButton}>
          <Image
            source={{
              uri: user?.photoURL || 'https://via.placeholder.com/40',
            }}
            style={styles.drawerImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Your Library</Text>
      </View>

      <FlatList
        data={libraryData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181818',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#b3b3b3',
    fontSize: 12,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default LibraryScreen;
