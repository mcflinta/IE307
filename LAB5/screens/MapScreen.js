// 21521901 - Mai Quốc Cường
import React, { useState, useLayoutEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

export default function MapScreen({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const mapRegion = {
    latitude: 10.8231,  
    longitude: 106.6297,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const saveHandler = () => {
    if (!selectedLocation) {
      Alert.alert('Thông báo', 'Bạn chưa chọn vị trí nào trên bản đồ!');
      return;
    }
    navigation.navigate('AddPlace', { 
      chosenLocation: {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude
      }
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 15 }} onPress={saveHandler}>
          <Ionicons name="save-outline" size={24} color="blue" />
        </TouchableOpacity>
      )
    });
  }, [navigation, selectedLocation]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={mapRegion}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Vị trí đã chọn"
            description={`Lat: ${selectedLocation.latitude}, Lng: ${selectedLocation.longitude}`}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 }
});
