import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// 21521901 - Mai Quốc Cường
import { fetchPlaces } from '../storage';

export default function PlaceListScreen({ navigation }) {
  const [places, setPlaces] = useState([]);
  const [locationAddress, setLocationAddress] = useState(''); // State for storing address

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPlaces().then(data => setPlaces(data)).catch(err => console.log(err));
    });
    return unsubscribe;
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('AddPlace')}>
          <Ionicons name="add-circle-outline" size={28} color="blue" />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('PlaceDetail', { placeId: item.id })}
    >
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>
          {/* Lat: {item.latitude?.toFixed(5)}, Lng: {item.longitude?.toFixed(5)} */}
          {item.address}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {places.length === 0 ? (
        <Text style={styles.noData}>Chưa có địa điểm nào, hãy thêm mới!</Text>
      ) : (
        <FlatList 
          data={places}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  noData: { textAlign: 'center', marginTop: 20 },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    padding: 10,
    marginVertical: 6
  },
  image: { width: 60, height: 60, borderRadius: 6 },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 }
});
