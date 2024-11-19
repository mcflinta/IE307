import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements';
import axios from '../services/api';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const [songs, setSongs] = useState([]);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const res = await axios.get('/songs');
      setSongs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => navigation.navigate('Player', { song: item })}
    >
      <Avatar source={{ uri: item.artwork }} />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.artist}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      <Button title="Đăng Xuất" onPress={logout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
