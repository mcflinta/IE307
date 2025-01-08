// 21521901 - Mai Quốc Cường
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { fetchPlaceById } from '../storage';

export default function PlaceDetailScreen({ route, navigation }) {
  const [place, setPlace] = useState(null);
  const { placeId } = route.params;

  useEffect(() => {
    fetchPlaceById(placeId)
      .then(data => setPlace(data))
      .catch(err => console.log(err));
  }, [placeId]);

  const viewOnMapHandler = () => {
    if (!place) return;
    navigation.navigate('MapDetail', {
      latitude: place.latitude,
      longitude: place.longitude,
      address: place.address,
    });
  };

  if (!place) {
    return (
      <View style={styles.container}>
        <Text>Loading place details...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <Text style={styles.title}>{place.title}</Text>
      <Text style={styles.coords}>
        {place.address}
      </Text>
      <View style={{ marginTop: 20 }}>
        <Button title="View on Map" onPress={viewOnMapHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    padding: 20 
  },
  image: {
    width: 200, 
    height: 200,
    borderRadius: 6
  },
  title: {
    fontSize: 18, 
    fontWeight: '700',
    marginVertical: 10
  },
  coords: {
    fontSize: 14, 
    color: '#666',
    fontWeight: 'bold'
  }
});
