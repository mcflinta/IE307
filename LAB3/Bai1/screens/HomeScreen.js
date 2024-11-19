import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Button } from '@react-navigation/elements';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('HomeDetailsScreen')}
      >Go to Details</Button>
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

export default HomeScreen;
