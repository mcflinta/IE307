// import React, { useEffect, useState, useContext } from 'react';
// import { View, FlatList, StyleSheet } from 'react-native';
// import { ListItem, Avatar, Button } from 'react-native-elements';
// import axios from '../services/api';
// import { AuthContext } from '../context/AuthContext';

// const HomeScreen = ({ navigation }) => {
//   const [songs, setSongs] = useState([]);
//   const { logout } = useContext(AuthContext);

//   useEffect(() => {
//     fetchSongs();
//   }, []);

//   const fetchSongs = async () => {
//     try {
//       const res = await axios.get('/songs');
//       setSongs(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <ListItem
//       bottomDivider
//       onPress={() => navigation.navigate('Player', { song: item })}
//     >
//       <Avatar source={{ uri: item.artwork }} />
//       <ListItem.Content>
//         <ListItem.Title>{item.title}</ListItem.Title>
//         <ListItem.Subtitle>{item.artist}</ListItem.Subtitle>
//       </ListItem.Content>
//     </ListItem>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={songs}
//         renderItem={renderItem}
//         keyExtractor={(item) => item._id}
//       />
//       <Button title="Đăng Xuất" onPress={logout} />
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// src/screens/HomeScreen.js


import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, Animated, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { getAccessToken, fetchAlbumsByArtistName, fetchAlbumTracks } from '../services/spotifyService';
import AlbumCard from '../components/AlbumCard';
import { createDotAnimation } from '../animations/dotAnimation';

const HomeScreen = ({ route }) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Get navigation object from hook
  const { user } = route.params || {};
  console.log('User HomeScreen:', user);

  // Animation values for dots
  const dot1 = useRef(new Animated.Value(1)).current;
  const dot2 = useRef(new Animated.Value(1)).current;
  const dot3 = useRef(new Animated.Value(1)).current;
  useEffect(() => {
   
      StatusBar.setBackgroundColor('#121212');
      StatusBar.setBarStyle('light-content');
    }) // Lắng nghe thay đổi của 
  // Fetch albums by artist name
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessToken();
        const fetchedAlbums = await fetchAlbumsByArtistName(token, 'Aimer');
        setAlbums(fetchedAlbums);
      } catch (error) {
        console.error('Error fetching albums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Animation
  useEffect(() => {
    createDotAnimation(dot1, dot2, dot3);
  }, [dot1, dot2, dot3]);

  const handleAlbumPress = async (album) => {
    setLoading(true);
    try {
      const token = await getAccessToken();
      const { tracks: fetchedTracks, images } = await fetchAlbumTracks(token, album.id);
  
      const artistNames = fetchedTracks
        .flatMap(track => track.artists)
        .filter((artist, index, self) => self.indexOf(artist) === index)
        .join(', ');
  
      const albumImage = images?.[0]?.url || ''; // Lấy URL hình ảnh đầu tiên
      console.log('Album image:', fetchedTracks);
      navigation.navigate('AlbumTrackDetailScreen', {
        albumName: album.title,
        artistName: artistNames,
        tracks: fetchedTracks,
        albumImage, // Truyền hình ảnh album
      });
    } catch (error) {
      console.error('Error fetching tracks:', error);
      Alert.alert('Error', 'Unable to fetch tracks for the selected album.');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Animated.View style={[styles.dot, { transform: [{ scale: dot1 }] }]} />
        <Animated.View style={[styles.dot, { transform: [{ scale: dot2 }] }]} />
        <Animated.View style={[styles.dot, { transform: [{ scale: dot3 }] }]} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={albums}
        renderItem={({ item }) => (
          <AlbumCard album={item} onPress={() => handleAlbumPress(item)} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
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