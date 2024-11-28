import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchTracksByAlbumId } from '../services/spotifyService'; // Import hàm lấy danh sách bài hát

const AlbumTracksScreen = ({ route }) => {
  const { albumId } = route.params; // Lấy ID album từ params
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const token = 'your_spotify_api_token'; // Thay bằng token hợp lệ
        const tracksData = await fetchTracksByAlbumId(token, albumId);
        setTracks(tracksData);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [albumId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.track}>
            <Text style={styles.trackText}>
              {item.trackNumber}. {item.title}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  track: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  trackText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default AlbumTracksScreen;
