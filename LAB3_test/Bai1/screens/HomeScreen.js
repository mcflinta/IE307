import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RootStackHome from '../navigation/RootStackHome';
import { createStaticNavigation } from '@react-navigation/native';
// const Navigation = createStaticNavigation(RootStackHome);

const HomeScreen = () => {
  const navigation = useNavigation(Navigation);

  return (
    <View style={styles.container}>
      {/* <Navigation /> */}
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("HomeScreen",
          { screen: 'HomeDetailsScreen' })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default HomeScreen;
