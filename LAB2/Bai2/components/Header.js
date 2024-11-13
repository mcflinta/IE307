import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = ({ darkMode }) => {
  const textColor = darkMode ? styles.darkText : styles.lightText;

  return (
    <View style={styles.headerContainer}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={[styles.appName, textColor]}>React Native App</Text>
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
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
});

export default Header;