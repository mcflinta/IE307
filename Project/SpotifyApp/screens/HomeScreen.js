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
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ route, navigation }) => {
  const { user } = route.params;

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo');
    navigation.replace('InitScreen');
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
