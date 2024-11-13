import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      <Text style={styles.appName}>React Native App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default Header;
