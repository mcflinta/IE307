// src/components/AlbumCard.js
import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const AlbumCard = ({ album }) => (
  <TouchableOpacity style={styles.card}>
    <Image source={{ uri: album.image }} style={styles.image} />
    <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
      {album.title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1C1C1C',
    borderRadius: 4,
    marginHorizontal: 4,
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: 58,
    height: 58,
  },
  text: {
    flex: 1,
    paddingHorizontal: 8,
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
});

export default AlbumCard;
