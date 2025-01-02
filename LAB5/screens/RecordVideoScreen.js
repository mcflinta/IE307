
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
// 21521901 - Mai Quốc Cường
import { showNotification } from '../services/notification';

export default function RecordVideoScreen({ navigation }) {
  const cameraRef = useRef(null);
  const [hasCameraPerm, setHasCameraPerm] = useState(null);
  const [hasMicPerm, setHasMicPerm] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUri, setRecordedUri] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const micPermission = await Camera.requestMicrophonePermissionsAsync();
      setHasCameraPerm(cameraPermission.status === 'granted');
      setHasMicPerm(micPermission.status === 'granted');
    })();
  }, []);

  const startRecording = async () => {
    if (!cameraRef.current) return;
    setIsRecording(true);
    const video = await cameraRef.current.recordAsync();
    setRecordedUri(video.uri);
    setIsRecording(false);
  };

  const stopRecording = () => {
    if (!cameraRef.current) return;
    cameraRef.current.stopRecording();
  };

  const saveVideo = async () => {
    if (!recordedUri) return;
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Quyền bị từ chối', 'Bạn phải cấp quyền lưu video vào thư viện!');
      return;
    }
    await MediaLibrary.saveToLibraryAsync(recordedUri);
    showNotification('Đã lưu video', 'Video được thêm vào thư viện thành công!');
    navigation.goBack();  
  };

  const reRecord = () => {
    setRecordedUri(null);
  };

  if (hasCameraPerm === null || hasMicPerm === null) {
    return (
      <View style={styles.container}>
        <Text>Đang yêu cầu quyền camera/micro...</Text>
      </View>
    );
  }
  if (!hasCameraPerm || !hasMicPerm) {
    return (
      <View style={styles.container}>
        <Text>Không có quyền truy cập camera hoặc micro!</Text>
      </View>
    );
  }

  if (recordedUri) {
    return (
      <View style={styles.containerPreview}>
        <Text style={styles.previewText}>Đã quay xong, bạn muốn lưu hay quay lại?</Text>
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.btn} onPress={saveVideo}>
            <Ionicons name="save" size={24} color="#fff" />
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={reRecord}>
            <Ionicons name="videocam" size={24} color="#fff" />
            <Text style={styles.btnText}>Re-Record</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={CameraType.back}
      />
      <View style={styles.controls}>
        {!isRecording ? (
          <TouchableOpacity onPress={startRecording} style={styles.recordBtn}>
            <Ionicons name="radio-button-on" size={70} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={stopRecording} style={styles.recordBtn}>
            <Ionicons name="square" size={70} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
// 21521901 - Mai Quốc Cường
const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  controls: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center'
  },
  recordBtn: {
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 50,
    padding: 5
  },
  containerPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  previewText: { fontSize: 18, marginBottom: 20 },
  btnRow: { flexDirection: 'row' },
  btn: {
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    padding: 10,
    borderRadius: 6
  },
  btnText: { color: '#fff', marginLeft: 6 }
});
