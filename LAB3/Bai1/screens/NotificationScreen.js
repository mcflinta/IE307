import React from 'react';
import SimpleScreen from './SimpleScreen';
import { View, Text, StyleSheet, Button } from 'react-native';


const NotificationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('NotificationDetailScreen')}
      />
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
