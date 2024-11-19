// screens/AddSongScreen.js

import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import axios from '../services/api';

const AddSongScreen = ({ route, navigation }) => {
  const { playlistId } = route.params;
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState('');

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

  const addSongToPlaylist = async (songId) => {
    try {
      await axios.post('/playlists/add-song', {
        playlistId,
        songId,
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <ListItem bottomDivider onPress={() => addSongToPlaylist(item._id)}>
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.artist}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Tìm kiếm..."
        onChangeText={setSearch}
        value={search}
        lightTheme
        round
      />
      <FlatList
        data={filteredSongs}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default AddSongScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
