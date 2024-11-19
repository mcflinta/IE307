// screens/PlaylistScreen.js

import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import axios from '../services/api';
import { AuthContext } from '../context/AuthContext';

const PlaylistScreen = ({ navigation }) => {
  const [playlists, setPlaylists] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const res = await axios.get('/playlists');
      setPlaylists(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPlaylist = () => {
    Alert.prompt(
      'Tạo Playlist',
      'Nhập tên playlist:',
      async (playlistName) => {
        try {
          const res = await axios.post('/playlists', { name: playlistName });
          setPlaylists([...playlists, res.data]);
        } catch (error) {
          console.error(error);
        }
      }
    );
  };

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => navigation.navigate('PlaylistDetail', { playlist: item })}
    >
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <Button title="Tạo Playlist Mới" onPress={createPlaylist} />
      <FlatList
        data={playlists}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
