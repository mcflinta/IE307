import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import WorkoutsList from './components/WorkoutList';
import FruitsVegetablesList from './components/FruitsVegetablesList';

const App = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.title}>FlatList - Workouts</Text>
        <WorkoutsList selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.title}>SectionList - Fruits and Vegetables</Text>
        <FruitsVegetablesList selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
      </View>

      <View style={styles.selectedContainer}>
        <Text style={styles.selectedTitle}>SELECTED ITEMS:</Text>
        <Text>{selectedItems.join(', ') || 'No items selected'}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    flex: 1,
    marginVertical: 10,
  },
  title: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  selectedContainer: {
    padding: 10,
  },
  selectedTitle: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default App;
