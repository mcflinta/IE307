import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const AccountScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <Button title="LOG OUT" onPress={logout} />
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

export default AccountScreen;