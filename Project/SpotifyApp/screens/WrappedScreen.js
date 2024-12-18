import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const data = [
  { id: '1', title: 'Your Wrapped', image: 'https://via.placeholder.com/150', description: 'See your music journey' },
  { id: '2', title: 'Your Top Songs 2024', image: 'https://via.placeholder.com/150', description: 'Your most played songs' },
  { id: '3', title: 'Your Music Evolution 2024', image: 'https://via.placeholder.com/150', description: 'How your taste changed' },
  { id: '4', title: 'Your Artist Clips', image: 'https://via.placeholder.com/150', description: 'Messages from your artists' },
  { id: '5', title: '2024 in Music', image: 'https://via.placeholder.com/150', description: 'Highlights of 2024' },
  { id: '6', title: '2024 in Podcasts', image: 'https://via.placeholder.com/150', description: 'Best of podcasts' },
  { id: '7', title: 'Top Artists of 2024 Global', image: 'https://via.placeholder.com/150', description: 'Trending artists' },
  { id: '8', title: 'Top Tracks of 2024 Global', image: 'https://via.placeholder.com/150', description: 'Most loved tracks globally' },
];

const WrappedScreen = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cardContainer}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>2024 Wrapped</Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          scrollEnabled={false} // Gắn trong ScrollView
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    width: '48%',
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardDescription: {
    color: '#bbb',
    fontSize: 12,
    marginTop: 4,
  },
});

export default WrappedScreen;
