
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Quyền thông báo chưa được cấp!');
  }
}

export async function showNotification(title, body) {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT
    });
  }
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null
  });
}
