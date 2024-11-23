// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image } from 'react-native';
import { searchArtist } from './spotify';

export default function App() {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (query.trim() === '') return;
    setLoading(true);
    try {
      const results = await searchArtist(query);
      setArtists(results);
    } catch (error) {
      alert('Có lỗi xảy ra khi tìm kiếm nghệ sĩ.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.artistContainer}>
      {item.images.length > 0 && (
        <Image source={{ uri: item.images[0].url }} style={styles.artistImage} />
      )}
      <Text style={styles.artistName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm kiếm Nghệ sĩ Spotify</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên nghệ sĩ..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Tìm kiếm" onPress={handleSearch} disabled={loading} />
      {loading && <Text>Đang tải...</Text>}
      <FlatList
        data={artists}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  list: {
    marginTop: 20,
  },
  artistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  artistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  artistName: {
    fontSize: 18,
  },
});
