import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelpScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Help Screen</Text>
    {/* Thêm nội dung hoặc chức năng trợ giúp ở đây */}
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

export default HelpScreen;
