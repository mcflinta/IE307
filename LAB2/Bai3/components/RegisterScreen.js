// RegisterScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>
      <Button title="Login now!" onPress={() => navigation.navigate('Login')} />
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
    marginBottom: 20,
  },
});

export default RegisterScreen;
