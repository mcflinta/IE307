import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LibraryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Library Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LibraryScreen;
