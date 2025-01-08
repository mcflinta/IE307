import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert, ScrollView, TouchableOpacity, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { insertPlace } from '../storage';
// 21521901 - Mai Quốc Cường
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function AddPlaceScreen({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [pickedLocation, setPickedLocation] = useState(null);
  const HERE_API_KEY = '3Hcjrm7Pb6EWWWZXvVxp39vbNGzPiSbTmoKpp1EMdag';

  useEffect(() => {
    if (route.params?.chosenLocation) {
      setPickedLocation(route.params.chosenLocation);
    }
  }, [route.params?.chosenLocation]);

  const getMapPreview = (lat, lng) => {
    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            label: "$alpha",
            color: "#F00",
            size: "large",
          },
          geometry: {
            type: "MultiPoint",
            coordinates: [[lng, lat]],
          },
        },
      ],
    };
    return `https://image.maps.hereapi.com/mia/v3/base/mc/center:${lat},${lng};zoom=12/512x512/png?apiKey=${HERE_API_KEY}&geojson=${encodeURIComponent(
      JSON.stringify(geojson)
    )}`;
  };

  const pickImageHandler = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant library access to select an image!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 0.5 });
    if (!result.canceled && result.assets?.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takeImageHandler = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant camera permission to take a photo!');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.5 });
    if (!result.canceled && result.assets?.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const locateUserHandler = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant location permission to locate!');
      return;
    }
    try {
      const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      let address = '';
      if (reverseGeocode && reverseGeocode.length > 0) {
        const place = reverseGeocode[0];
        address = `${place.name || ''}, ${place.street || ''}, ${place.city || ''}, ${
          place.region || ''
        }, ${place.postalCode || ''}, ${place.country || ''}`;
      }

      setPickedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to get current location. Please try again!');
      console.error(error);
    }
  };

  const pickOnMapHandler = () => {
    navigation.navigate('Map', {
      onGoBack: (location) => {
        setPickedLocation(location);
      },
    });
  };

  const addPlaceHandler = async () => {
    if (!title.trim() || !imageUri || !pickedLocation) {
      Alert.alert('Missing Information!', 'You must enter a name, select an image, and choose a location!');
      return;
    }
    try {
      await insertPlace({
        title,
        imageUri,
        latitude: pickedLocation.latitude,
        longitude: pickedLocation.longitude,
        address: pickedLocation.address || '',
      });

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Place Added Successfully 🎉',
          body: `Added place: ${title}`,
          sound: true,
        },
        trigger: null,
      });

      navigation.goBack();
    } catch (err) {
      console.log('addPlaceHandler error:', err);
    }
  };

  const CustomButton = ({ onPress, text }) => (
    <TouchableOpacity style={styles.customButton} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>Place Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter place name..."
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Image</Text>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.text}>No image selected</Text>
          </View>
        )}
        <View style={styles.btnRow}>
          <CustomButton text="Pick Image" onPress={pickImageHandler} />
          <CustomButton text="Take Image" onPress={takeImageHandler} />
        </View>

        <Text style={styles.label}>Location</Text>
        {pickedLocation ? (
          <Image
            source={{
              uri: getMapPreview(pickedLocation.latitude, pickedLocation.longitude),
            }}
            style={styles.mapImage}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.text}>No location picked yet.</Text>
          </View>
        )}
        <View style={styles.btnRow}>
          <CustomButton text="Locate User" onPress={locateUserHandler} />
          <CustomButton text="Pick on Map" onPress={pickOnMapHandler} />
        </View>

        <View style={{ marginTop: 20 }}>
          <Button title="Add New Place" onPress={addPlaceHandler} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: { flex: 1, padding: 20 },
  label: { fontWeight: '600', marginVertical: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  imagePreview: {
    width: 120,
    height: 120,
    marginVertical: 10,
    borderRadius: 6,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  mapImage: {
    width: '100%',
    height: 256,
    marginVertical: 10,
    borderRadius: 6,
  },
  placeholder: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  text: {
    color: '#888',
    fontSize: 16,
  },
  customButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
