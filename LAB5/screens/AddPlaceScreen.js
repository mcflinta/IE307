// 21521901 - Mai Quốc Cường
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import { insertPlace } from '../storage';
import { showNotification } from '../services/notification';

export default function AddPlaceScreen({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [pickedLocation, setPickedLocation] = useState(null);

  useEffect(() => {
    if (route.params?.chosenLocation) {
      setPickedLocation(route.params.chosenLocation);
    }
  }, [route.params?.chosenLocation]);

  const pickImageHandler = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Quyền bị từ chối', 'Bạn phải cấp quyền truy cập thư viện để chọn ảnh!');
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
      Alert.alert('Quyền bị từ chối', 'Bạn phải cấp quyền camera để chụp ảnh!');
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
      Alert.alert('Quyền bị từ chối', 'Bạn phải cấp quyền vị trí để định vị!');
      return;
    }
    const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
    setPickedLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  const addPlaceHandler = async () => {
    if (!title.trim() || !imageUri || !pickedLocation) {
      Alert.alert('Thiếu thông tin!', 'Bạn phải nhập tên, chọn ảnh và vị trí!');
      return;
    }
    try {
      await insertPlace({
        title,
        imageUri,
        latitude: pickedLocation.latitude,
        longitude: pickedLocation.longitude
      });
      showNotification('Thêm địa điểm thành công', `Đã thêm địa điểm: ${title}`);
      navigation.goBack();
    } catch (err) {
      console.log('addPlaceHandler error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên địa điểm</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên địa điểm..."
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Hình ảnh</Text>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      ) : <Text>Chưa chọn ảnh</Text>}
      <View style={styles.btnRow}>
        <Button title="Chọn ảnh" onPress={pickImageHandler} />
        <Button title="Chụp ảnh" onPress={takeImageHandler} />
      </View>

      <Text style={styles.label}>Vị trí</Text>
      {pickedLocation ? (
        <Text>
          Lat: {pickedLocation.latitude}, Lng: {pickedLocation.longitude}
        </Text>
      ) : <Text>Chưa có vị trí</Text>}
      <View style={styles.btnRow}>
        <Button title="Định vị" onPress={locateUserHandler} />
        <Button title="Chọn trên bản đồ" onPress={pickOnMapHandler} />
      </View>

      <View style={{ marginTop: 20 }}>
        <Button title="Thêm mới địa điểm" onPress={addPlaceHandler} />
      </View>
    </View>
  );
}
// 21521901 - Mai Quốc Cường
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: '600', marginVertical: 8 },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    padding: 8, borderRadius: 4
  },
  imagePreview: {
    width: 120, height: 120,
    marginVertical: 10, borderRadius: 6
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8
  }
});

