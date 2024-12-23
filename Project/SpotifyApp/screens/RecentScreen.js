import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

// Dữ liệu demo
const recentSongs = [
  {
    id: '1',
    title: '先说谎的人',
    subtitle: '1 song played • Album • h3R3, 张鑫',
    imageUrl: 'https://via.placeholder.com/70', // URL ảnh demo
  },
  {
    id: '2',
    title: '',
    subtitle: '1 song played',
    imageUrl: 'https://via.placeholder.com/70',
  },
];

const RecentScreen = ({ navigation }) => {
  // Render từng item trong danh sách
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title || 'Unknown title'}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
      <Text style={styles.arrow}>⌄</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={recentSongs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Nền đen
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#121212',
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
  },
  arrow: {
    fontSize: 18,
    color: '#fff',
    paddingHorizontal: 10,
  },
});

export default RecentScreen;
