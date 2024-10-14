import React, { useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { workouts } from '../data/data';

const WorkoutsList = ({ selectedItems, setSelectedItems }) => {
  const toggleSelection = (item) => {
    if (selectedItems.includes(item.type)) {
      setSelectedItems(selectedItems.filter(i => i !== item.type));
    } else {
      setSelectedItems([...selectedItems, item.type]);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/workout.jpg')} // Đường dẫn tới hình ảnh nền
      style={styles.backgroundFlatList}
    >
      <FlatList
        data={workouts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const isSelected = selectedItems.includes(item.type); 
          const title = isSelected ? 'DESELECT' : 'SELECT';
          return (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.type}</Text>
              <TouchableOpacity
                style={[styles.button, isSelected ? styles.selectedButton : styles.deselectedButton]}
                onPress={() => toggleSelection(item)} 
              >
                <Text style={styles.buttonText}>{title}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Màu nền trắng với độ trong suốt 60%
    alignItems: 'center',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 15,
  },
  button: {
    padding: 10,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.6)', // Nút DESELECT màu đỏ với độ trong suốt 60%
  },
  deselectedButton: {
    backgroundColor: 'rgba(0, 128, 0, 0.6)', // Nút SELECT màu xanh với độ trong suốt 60%
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backgroundFlatList: {
    flex: 1,
    resizeMode: 'cover',
    paddingHorizontal: 20,
  },
});

export default WorkoutsList;
