import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SimpleScreen = ({ route }) => {
  const { title } = route.params; // Lấy tham số 'title' từ route.params
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

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

export default SimpleScreen;
