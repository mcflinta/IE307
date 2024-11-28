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
import { View, FlatList, Animated, StyleSheet } from 'react-native';
import { getAccessToken, fetchNewReleases, fetchAlbumsByIds, fetchAlbumsByArtistName } from '../services/spotifyService';
import AlbumCard from '../components/AlbumCard';
import { createDotAnimation } from '../animations/dotAnimation'; // Import hàm từ file dotAnimations.js

const HomeScreen = ({route}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = route.params || {};
  console.log('User HomeScreen:', user);
  // Animation values for dots
  const dot1 = useRef(new Animated.Value(1)).current;
  const dot2 = useRef(new Animated.Value(1)).current;
  const dot3 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessToken();
        const albums = await fetchAlbumsByArtistName(token, 'Aimer');
        setData(albums);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    createDotAnimation(dot1, dot2, dot3); // Sử dụng animation từ file dotAnimations.js
  }, [dot1, dot2, dot3]);

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
        data={data}
        renderItem={({ item }) => <AlbumCard album={item} />}
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