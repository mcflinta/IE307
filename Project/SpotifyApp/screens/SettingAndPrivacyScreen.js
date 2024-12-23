import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Sử dụng thư viện icon
import AsyncStorage from '@react-native-async-storage/async-storage';
import MusicPlayerService from '../services/MusicPlayerService';
import tokenManager from '../services/TokenManager';
const SettingsAndPrivacyScreen = ({navigation}) => {

  const handleLogout = async () => {
    try {
      // Xóa token và thông tin người dùng
      await tokenManager.clearToken();
      await AsyncStorage.removeItem('userInfo');

      // Dừng phát nhạc
      const MusicPlayer = MusicPlayerService;
      await MusicPlayer.stopPlaybackWhenLogout();

      // Điều hướng người dùng về màn hình khởi tạo
      navigation.replace('InitScreen');
      console.log('Logged out successfully!');
    } catch (error) {
      console.error('Error during logout:', error.message);
      // Có thể thêm thông báo lỗi cho người dùng ở đây
    }
  };
  return (
    <View style={styles.container}>
      {/* Dùng ScrollView để màn hình có thể cuộn */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionItem 
          icon="musical-note-outline" 
          title="Content and display" 
          subtitle="Canvas • App language" 
        />
        <SectionItem 
          icon="volume-medium-outline" 
          title="Playback" 
          subtitle="Gapless playback • Autoplay" 
        />
        <SectionItem 
          icon="lock-closed-outline" 
          title="Privacy and social" 
          subtitle="Recently played artists • Followers and following" 
        />
        <SectionItem 
          icon="notifications-outline" 
          title="Notifications" 
          subtitle="Push • Email" 
        />
        <SectionItem 
          icon="phone-portrait-outline" 
          title="Apps and devices" 
          subtitle="Google Maps • Spotify Connect control" 
        />
        <SectionItem 
          icon="cloud-download-outline" 
          title="Data-saving and offline" 
          subtitle="Data Saver • Downloads over cellular" 
        />
        <SectionItem 
          icon="wifi-outline" 
          title="Media quality" 
          subtitle="Wi-Fi streaming quality • Cellular streaming quality" 
        />
        <SectionItem 
          icon="megaphone-outline" 
          title="Advertisements" 
          subtitle="Tailored ads" 
        />
        <SectionItem 
          icon="information-circle-outline" 
          title="About" 
          subtitle="Version • Privacy Policy" 
        />

        {/* Nút Log out */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}
                onPress={handleLogout}
          >Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Component cho từng mục trong danh sách
const SectionItem = ({ icon, title, subtitle }) => {
  return (
    <View style={styles.itemContainer}>
      <Icon name={icon} size={24} color="#fff" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#121212',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,

    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 16, // Khoảng cách giữa icon và text
  },
  textContainer: {
    flex: 1, // Cho phép text căn giữa và chiếm không gian còn lại
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 2,
  },
  logoutButton: {
    marginVertical: 30,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  logoutText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsAndPrivacyScreen;
