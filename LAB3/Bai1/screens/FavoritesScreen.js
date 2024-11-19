import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavoritesScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Favorites Screen</Text>
    {/* Thêm các thành phần khác như danh sách yêu thích */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default FavoritesScreen;
