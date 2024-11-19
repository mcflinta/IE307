import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@react-navigation/elements';

const NotificationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('NotificationDetailScreen')}>
        Go to Details
        </Button>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
