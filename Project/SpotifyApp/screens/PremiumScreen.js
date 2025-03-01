// import React from 'react';
// // import { View, Text, StyleSheet } from 'react-native';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
// const PremiumScreen = () => {
//     // Dữ liệu giả lập
//     const data = [
//       { id: '1', title: 'Liked Songs', image: 'https://via.placeholder.com/150/5C01FF', gradient: true },
//       { id: '2', title: 'On Repeat', image: 'https://via.placeholder.com/150/1DB954' },
//       { id: '3', title: 'Yuki No Furu Machi / Fuyu ...', image: 'https://via.placeholder.com/150/C4C4C4' },
//       { id: '4', title: 'Discover Weekly', image: 'https://via.placeholder.com/150/5A5A5A' },
//       { id: '5', title: 'Aimer', image: 'https://via.placeholder.com/150/3B5998' },
//       { id: '6', title: 'Re: Classroom of The Elite', image: 'https://via.placeholder.com/150/E8E8E8' },
//       { id: '7', title: 'Hip Hop Mix', image: 'https://via.placeholder.com/150/FF5733' },
//       { id: '8', title: 'MIN Radio', image: 'https://via.placeholder.com/150/1ED760' },
//     ];
  
//     const renderItem = ({ item }) => (
//       <TouchableOpacity style={styles.card}>
//         <Image source={{ uri: item.image }} style={styles.image} />
//         <Text style={styles.text}
//                 numberOfLines={2} // Giới hạn số dòng (1 dòng)
//                 ellipsizeMode="tail" // Hiển thị dấu ba chấm ở cuối
//         >{item.title}</Text>
//       </TouchableOpacity>
//     );
  
//     return (
//       <View style={styles.container}>
//         <FlatList
//           data={data}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//           numColumns={2} // Hiển thị 2 cột
//           columnWrapperStyle={styles.row} // Căn chỉnh giữa các hàng
//         />
//       </View>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#121212', // Màu nền tối
//       paddingHorizontal: 8,
//       paddingTop: 16,
//     },
//     row: {
//       justifyContent: 'space-between', // Cách đều các mục trong hàng
//       marginBottom: 16,
//     },
//     card: {
//       flex: 1,
//       flexDirection: 'row',
//       backgroundColor: '#1C1C1C', // Màu nền của từng card
//       borderRadius: 4,
//     //   padding: 8,
//       marginHorizontal: 4,
//         alignItems: 'center',
//       overflow: 'hidden', // Ẩn phần bị tràn ra ngoài
//     },
//     image: {
//       width: 58,
//       height: 58,
//     //   marginRight: 8
//     //   borderRadius: 4, // Tùy chỉnh bo góc hình ảnh
//     },
//     text: {
//       flex: 1,
//       paddingHorizontal: 8,
//       color: '#FFF', // Màu chữ trắng
//       fontSize: 12,
//     //   font
//       fontWeight: 'bold',
//       flexWrap: 'wrap'
//     //   textAlign: 'center',
//     },
//   });
  


// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
// import axios from 'axios';
// import { Buffer } from 'buffer';

// // Spotify API Service
// const CLIENT_ID = '14831e1b0384405d92ef71456e997218'; // Thay bằng Client ID của bạn
// const CLIENT_SECRET = '819383dcb62c4ae09009e2e5186fc7db'; // Thay bằng Client Secret của bạn

// const getAccessToken = async () => {
//   const tokenUrl = 'https://accounts.spotify.com/api/token';
//   const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

//   try {
//     const response = await axios.post(
//       tokenUrl,
//       'grant_type=client_credentials',
//       {
//         headers: {
//           Authorization: `Basic ${credentials}`,
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     );
//     return response.data.access_token;
//   } catch (error) {
//     console.error('Error getting access token', error);
//     throw error;
//   }
// };


// const PremiumScreen = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchSpotifyAlbums = async () => {
//     try {
//       const token = await getAccessToken();
//       if (!token) throw new Error('Access token is missing');
//       const response = await axios.get(`https://api.spotify.com/v1/browse/new-releases`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: {
//             limit: 8,
//             // market: 'V'
//         },
//       });
//       searchArtist('Aimer');
//     //   console.log('Spotify albums', response.data.albums.items.slice(0,1));
//       const transformedData = response.data.albums.items.map((album) => ({
//         id: album.id,
//         title: album.name,
//         image: album.images[0]?.url || 'https://via.placeholder.com/150',
//       }));

//       setData(transformedData);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching Spotify albums', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSpotifyAlbums();
//   }, []);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.card}>
//       <Image source={{ uri: item.image }} style={styles.image} />
//       <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
//         {item.title}
//       </Text>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#1DB954" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
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
//   card: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#1C1C1C',
//     borderRadius: 4,
//     marginHorizontal: 4,
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   image: {
//     width: 58,
//     height: 58,
//   },
//   text: {
//     flex: 1,
//     paddingHorizontal: 8,
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: 'bold',
//     flexWrap: 'wrap',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#121212',
//   },
// });

// export default PremiumScreen;


// src/screens/PremiumScreen.js
// import React, { useEffect, useState } from 'react';
// import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
// import { getAccessToken, fetchNewReleases } from '../services/spotifyService';
// import AlbumCard from '../components/AlbumCard';

// const PremiumScreen = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = await getAccessToken();
//         const albums = await fetchNewReleases(token);
//         setData(albums);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#1DB954" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={data}
//         renderItem={({ item }) => <AlbumCard album={item} />}
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
//   },
// });

// export default PremiumScreen;

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MusicPlayerService from '../services/MusicPlayerService';
import tokenManager from '../services/TokenManager';

const PremiumScreen = ({ route, navigation }) => {
  const { user } = route.params || {};
  console.log('User:', user);

  const handleLogout = async () => {
    try {
      // Xóa token và thông tin người dùng
      await tokenManager.clearToken();
      await AsyncStorage.removeItem('userInfo');

      // Dừng phát nhạc
      const MusicPlayer = MusicPlayerService;
      await MusicPlayer.stopPlaybackWhenLogout();

      // Điều hướng người dùng về màn hình khởi tạo
      navigation.replace('InitScreen');
      console.log('Logged out successfully!');
    } catch (error) {
      console.error('Error during logout:', error.message);
      // Có thể thêm thông báo lỗi cho người dùng ở đây
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user.name}!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  welcome: {
    fontSize: 24,
    marginBottom: 199,
  },
});
export default PremiumScreen;
