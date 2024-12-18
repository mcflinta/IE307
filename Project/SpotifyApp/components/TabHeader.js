import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TabHeader = ({ activeTab, setActiveTab }) => {
  const navigation = useNavigation();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabContainer}
    >
      {/* Tab Music */}
      <TouchableOpacity
        style={[styles.tabItem, activeTab === 'Music' && styles.activeTab]}
        onPress={() => {
          setActiveTab('Music');
          navigation.navigate('HomeScreen'); // Điều hướng đến HomeScreen
        }}
      >
        <Text style={styles.tabText}>Music</Text>
      </TouchableOpacity>

      {/* Tab Wrapped */}
      <TouchableOpacity
        style={[styles.tabItem, activeTab === 'Wrapped' && styles.activeTab]}
        onPress={() => {
          setActiveTab('Wrapped');
          navigation.navigate('WrappedScreen'); // Điều hướng đến WrappedScreen
        }}
      >
        <Text style={styles.tabText}>Wrapped</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    backgroundColor: '#121212',
    paddingVertical: 10,
  },
  tabItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#2a2a2a',
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#1DB954',
  },
  tabText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default TabHeader;
