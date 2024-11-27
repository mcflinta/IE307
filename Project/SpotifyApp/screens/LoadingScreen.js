
// import React, { useRef, useEffect, useState } from 'react';
// import { View, Animated, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const LoadingScreen = ({ navigation, route }) => {
//   const dot1 = useRef(new Animated.Value(1)).current;
//   const dot2 = useRef(new Animated.Value(1)).current;
//   const dot3 = useRef(new Animated.Value(1)).current;

//   const { fromScreen } = route.params || {};
//   const [loading, setLoading] = useState(true); // Manage loading state

//   useEffect(() => {
//     if (fromScreen === 'LoginScreen') {
//       const { email, password } = route.params || {};

//       const loginUser = async () => {
//         try {
//           const response = await axios.post('http://192.168.105.35:3000/api/login', { email, password });
//           if (response.status === 200) {
//             Alert.alert('Success', 'Login successful');
//             navigation.replace('InitScreen', { user: response.data.user });
//           }
//         } catch (error) {
//           console.error('Login failed:', error.response?.data || error.message);
//           Alert.alert('Error', error.response?.data?.message || 'Login failed');
//           navigation.goBack();
//         } finally {
//           setLoading(false);
//         }
//       };

//       loginUser();
//     } else if (fromScreen === 'SignUpPolicyScreen') {
//       const { email, password, gender, name } = route.params || {};

//       const registerUser = async () => {
//         const userData = { email, password, gender, name };
//         try {
//           const response = await fetch('http://192.168.105.35:3000/api/register', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(userData),
//           });

//           const data = await response.json();

//           if (response.ok) {
//             console.log('Account created successfully:', data);
//             navigation.navigate('InitScreen');
//           } else {
//             console.error('Failed to create account:', data);
//             Alert.alert(data.message || 'Failed to create account. Please try again.');
//           }
//         } catch (error) {
//           console.error('Error creating account:', error);
//           Alert.alert('An error occurred. Please try again later.');
//         } finally {
//           setLoading(false);
//         }
//       };

//       registerUser();
//     }
//   }, [fromScreen, navigation, route.params]);

//   useEffect(() => {
//     const animateDots = () => {
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(dot1, {
//             toValue: 1.5,
//             duration: 100,
//             useNativeDriver: true,
//           }),
//           Animated.timing(dot1, {
//             toValue: 1,
//             duration: 100,
//             useNativeDriver: true,
//           }),
//           Animated.timing(dot2, {
//             toValue: 1.5,
//             duration: 100,
//             useNativeDriver: true,
//           }),
//           Animated.timing(dot2, {
//             toValue: 1,
//             duration: 100,
//             useNativeDriver: true,
//           }),
//           Animated.timing(dot3, {
//             toValue: 1.5,
//             duration: 100,
//             useNativeDriver: true,
//           }),
//           Animated.timing(dot3, {
//             toValue: 1,
//             duration: 100,
//             useNativeDriver: true,
//           }),
//         ])
//       ).start();
//     };

//     animateDots();
//   }, [dot1, dot2, dot3]);

//   return (
//     <View style={styles.container}>
//       <Animated.View style={[styles.dot, { transform: [{ scale: dot1 }] }]} />
//       <Animated.View style={[styles.dot, { transform: [{ scale: dot2 }] }]} />
//       <Animated.View style={[styles.dot, { transform: [{ scale: dot3 }] }]} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: '#FFF',
//     marginHorizontal: 5,
//   },
// });

// export default LoadingScreen;

import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Alert } from 'react-native';
import axios from '../config/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoadingScreen = ({ navigation, route }) => {
  const dot1 = useRef(new Animated.Value(1)).current;
  const dot2 = useRef(new Animated.Value(1)).current;
  const dot3 = useRef(new Animated.Value(1)).current;

  const { fromScreen } = route.params || {};
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading

  useEffect(() => {
    if (fromScreen === 'LoginScreen') {
      const { email, password } = route.params || {};

      const loginUser = async () => {
        try {
          const response = await axios.post('/login', { email, password });
          if (response.status === 200) {
            Alert.alert('Success', 'Login successful');
            const { user, token } = response.data;

            if (token) {
              // Lưu token vào AsyncStorage
              await AsyncStorage.setItem('userToken', token);
            } else {
              console.error('Token is undefined in the response.');
              Alert.alert('Error', 'Token not received from server.');
              navigation.goBack();
              return;
            }

            if (user) {
              // Lưu thông tin người dùng nếu cần
              await AsyncStorage.setItem('userInfo', JSON.stringify(user));
            }

            navigation.replace('HomeTabs', { 
              screen: 'HomeScreen', 
              params: { user }
             });
          } else {
            console.error('Login failed with status:', response.status);
            Alert.alert('Error', 'Login failed. Please try again.');
          }
        } catch (error) {
          console.error('Login failed:', error.response?.data || error.message);
          Alert.alert('Error', error.response?.data?.message || 'Login failed');
          navigation.goBack();
        } finally {
          setLoading(false);
        }
      };

      loginUser();
    } else if (fromScreen === 'SignUpPolicyScreen') {
      const { email, password, gender, name } = route.params || {};

      const registerUser = async () => {
        const userData = { email, password, gender, name };
        try {
          const response = await axios.post('/register', userData);
          if (response.status === 201) {
            Alert.alert('Success', 'Account created successfully');
            const { user, token } = response.data;

            if (token) {
              // Lưu token vào AsyncStorage
              await AsyncStorage.setItem('userToken', token);
            } else {
              console.error('Token is undefined in the response.');
              Alert.alert('Error', 'Token not received from server.');
              navigation.goBack();
              return;
            }

            if (user) {
              // Lưu thông tin người dùng nếu cần
              await AsyncStorage.setItem('userInfo', JSON.stringify(user));
            }

            navigation.replace('HomeTabs', { 
              screen: 'HomeScreen',
              params: { user }
             });
          } else {
            console.error('Failed to create account with status:', response.status);
            Alert.alert(response.data.message || 'Failed to create account. Please try again.');
          }
        } catch (error) {
          console.error('Error creating account:', error.response?.data || error.message);
          Alert.alert('Error', error.response?.data?.message || 'An error occurred. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      registerUser();
    }
  }, [fromScreen, navigation, route.params]);

  useEffect(() => {
    const animateDots = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot1, {
            toValue: 1.5,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot1, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            toValue: 1.5,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot3, {
            toValue: 1.5,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot3, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDots();
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, { transform: [{ scale: dot1 }] }]} />
      <Animated.View style={[styles.dot, { transform: [{ scale: dot2 }] }]} />
      <Animated.View style={[styles.dot, { transform: [{ scale: dot3 }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
  },
});

export default LoadingScreen;