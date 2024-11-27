// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import SpotifyIcon from '../assets/svg/SpotifyIcon.svg';
// import ActionButtons from '../components/ActionButtons';
// import { LinearGradient } from 'expo-linear-gradient';

// const InitScreen = ({ navigation }) => {
//   return (
//     <LinearGradient style={styles.container}
//     colors={['#1c1c1c', '#000000']}>
//       <View style={styles.logoContainer}>
//         <SpotifyIcon width={60} height={60} />
//       </View>

//       <Text style={styles.title}>
//         Hang trieu bai hat.{"\n"}Mien phi tren Spotify.
//       </Text>

//       <ActionButtons navigation={navigation} />
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//   },
//   logoContainer: {
//     marginTop: 220,
//     alignItems: 'center',
//   },
//   title: {
//     textAlign: 'center',
//     color: '#fff',
//     fontSize: 30,
//     fontFamily: 'Spotify-font',
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
// });

// export default InitScreen;
// import React, {useEffect} from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import SpotifyIcon from '../assets/svg/SpotifyIcon.svg';
// import ActionButtons from '../components/ActionButtons';
// import { LinearGradient } from 'expo-linear-gradient';

// const InitScreen = ({ navigation }) => {


//   return (
//     <LinearGradient 
//       style={styles.container}
//       colors={['#1c1c1c', '#000000']}
//     >
//       <View style={styles.logoContainer}>
//         <SpotifyIcon width={60} height={60} />
//       </View>

//       <Text style={styles.title}>
//         Hàng triệu bài hát.{"\n"}Miễn phí trên Spotify.
//       </Text>

//       {/* Gọi ActionButtons và truyền navigation */}
//       <ActionButtons navigation={navigation} />
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   logoContainer: {
//     marginTop: 220,
//     alignItems: 'center',
//   },
//   title: {
//     textAlign: 'center',
//     color: '#fff',
//     fontSize: 30,
//     fontFamily: 'Spotify-font',
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
// });

// export default InitScreen;

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import SpotifyIcon from '../assets/svg/SpotifyIcon.svg';
import ActionButtons from '../components/ActionButtons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const InitScreen = ({ navigation }) => {
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          setIsCheckingToken(false);
          return;
        }

        // Gửi token trong headers để xác thực
        const response = await axios.get('http://192.168.105.35:3000/api/verify-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const user = response.data.user;
          navigation.replace('HomeTabs', {
            screen: 'HomeScreen',
            params: { user },
          });
        } else {
          throw new Error('Invalid token');
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        Alert.alert('Phiên đăng nhập đã hết hạn', 'Vui lòng đăng nhập lại.');
        // Xóa token không hợp lệ nếu cần
        await AsyncStorage.removeItem('userToken');
        setIsCheckingToken(false);
      }
    };

    verifyToken();
  }, [navigation]);

  if (isCheckingToken) {
    // Hiển thị loading indicator trong khi kiểm tra token
    return (
      <LinearGradient style={styles.container} colors={['#1c1c1c', '#000000']}>
        <View style={styles.logoContainer}>
          <SpotifyIcon width={60} height={60} />
        </View>
        <ActivityIndicator size="large" color="#1DB954" style={{ marginTop: 50 }} />
      </LinearGradient>
    );
  }

  // Hiển thị giao diện InitScreen nếu không có token hợp lệ
  return (
    <LinearGradient style={styles.container} colors={['#1c1c1c', '#000000']}>
      <View style={styles.logoContainer}>
        <SpotifyIcon width={60} height={60} />
      </View>

      <Text style={styles.title}>
        Hàng triệu bài hát.{"\n"}Miễn phí trên Spotify.
      </Text>

      {/* Gọi ActionButtons và truyền navigation */}
      <ActionButtons navigation={navigation} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    marginTop: 220,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Spotify-font',
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default InitScreen;
