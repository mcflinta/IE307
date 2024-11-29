import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TrackList = ({ tracks, artistName }) => {
  // Hàm render từng mục trong danh sách
  const renderItem = ({ item }) => (
    <View style={styles.trackItem}>
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.trackArtist} numberOfLines={1}>
          {artistName}
        </Text>
      </View>
      <TouchableOpacity style={styles.moreIcon}>
        <Icon name="ellipsis-vertical" size={20} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={tracks}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  trackInfo: {
    flex: 1,
    marginRight: 10,
  },
  trackTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  trackArtist: {
    fontSize: 14,
    color: '#888888',
  },
  moreIcon: {
    padding: 5,
  },
});

export default TrackList;
