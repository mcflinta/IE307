
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapDetail = ({ route }) => {
  const { latitude, longitude, address } = route.params || {};
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Giả lập tải dữ liệu nếu cần
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
        setIsReady(true);
      } catch (error) {
        console.error('Lỗi khởi tạo bản đồ:', error);
        setIsReady(true); // Đảm bảo tránh kẹt trạng thái
      }
    };

    initMap();
  }, []);

  if (!latitude || !longitude) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'red', fontSize: 16 }}>
          Lỗi: Thông tin vị trí không hợp lệ.
        </Text>
      </View>
    );
  }

  if (!isReady) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Đang tải dữ liệu bản đồ...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={address || 'Vị trí đã lưu'}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default MapDetail;
