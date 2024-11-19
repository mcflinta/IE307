// screens/PlaylistDetailScreen.js

import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import axios from '../services/api';
import { AuthContext } from '../context/AuthContext';

const PlaylistDetailScreen = ({ route, navigation }) => {
  const { playlist } = route.params;
  const [songs, setSongs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setSongs(playlist.songs);
  }, [playlist]);

  const addSongToPlaylist = () => {
    navigation.navigate('AddSong', { playlistId: playlist._id });
  };

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => navigation.navigate('Player', { song: item })}
    >
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.artist}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <Button title="Thêm Bài Hát" onPress={addSongToPlaylist} />
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default PlaylistDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
