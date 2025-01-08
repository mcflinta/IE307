import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
//21521901 - Mai Quốc Cường
const MapScreen = ({ navigation, route }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationAddress, setLocationAddress] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initMap = async () => {
      try {
        setIsReady(true);
      } catch (error) {
        console.log('Initialization error:', error);
        setIsReady(true);
      }
    };

    initMap();
  }, []);

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });

    try {
      const apiKey = '3Hcjrm7Pb6EWWWZXvVxp39vbNGzPiSbTmoKpp1EMdag'; 
      const response = await fetch(
        `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=en-US&apiKey=${apiKey}`
      );
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const address = data.items[0].address.label;
        setLocationAddress(address);
      } else {
        setLocationAddress('Address not found.');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setLocationAddress('Error fetching address.');
    }
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      const onGoBack = route.params?.onGoBack;
      if (onGoBack) {
        onGoBack({
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          address: locationAddress,
        });
      }
      navigation.goBack();
    } else {
      Alert.alert('Location not selected', 'Please tap on the map to select a location!');
    }
  };

  if (!isReady) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Loading map data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.8231,
          longitude: 106.6297,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title={locationAddress} />
        )}
      </MapView>
      <View style={styles.footer}>
        {selectedLocation ? null : (
          <Text style={styles.locationText}>Tap on the map to select a location.</Text>
        )}
        <Button title="Confirm Location" onPress={handleConfirmLocation} />
      </View>
    </View>
  );
};
// 21521901 - Mai Quốc Cường
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  footer: {
    padding: 10,
    backgroundColor: 'white',
  },
  locationText: {
    marginBottom: 5,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MapScreen;
