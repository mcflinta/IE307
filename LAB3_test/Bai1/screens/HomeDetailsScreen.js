import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Details Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeDetailsScreen;
