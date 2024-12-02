
// import React, { useState, useEffect, useCallback } from 'react';
// import { View, StyleSheet, Dimensions, BackHandler, Platform } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MiniPlayer from '../components/MiniPlayer';
// import HomeStack from './HomeStack';
// import SearchScreen from '../screens/SearchScreen';
// import LibraryScreen from '../screens/LibraryScreen';
// import PremiumScreen from '../screens/PremiumScreen';
// import FullPlayerScreen from '../screens/FullPlayerScreen';
// import HomeIcon from '../assets/svg/HomeIcon';
// import HomeFocusIcon from '../assets/svg/HomeFocusIcon';
// import SearchIcon from '../assets/svg/SearchIcon';
// import LibraryIcon from '../assets/svg/LibraryIcon';
// import LibraryFocusIcon from '../assets/svg/LibraryFocusIcon';
// import PremiumIcon from '../assets/svg/PremiumIcon';


// const HomeBottomTab = createBottomTabNavigator();
// const screenHeight = Dimensions.get('window').height;

// const HomeTabs = () => {
//   const [isFullPlayerVisible, setIsFullPlayerVisible] = useState(false);

//   const showFullPlayer = () => setIsFullPlayerVisible(true);
//   const hideFullPlayer = () => setIsFullPlayerVisible(false);

//   // Hàm xử lý nút Back
//   const handleBackPress = useCallback(() => {
//     if (isFullPlayerVisible) {
//       hideFullPlayer();
//       return true; // Chặn hành động mặc định
//     }
//     return false; // Cho phép hành động mặc định
//   }, [isFullPlayerVisible]);

//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       // Thêm listener khi FullPlayerScreen hiển thị
//       if (isFullPlayerVisible) {
//         BackHandler.addEventListener('hardwareBackPress', handleBackPress);
//       } else {
//         BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
//       }

//       // Dọn dẹp listener khi component unmount
//       return () => {
//         BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
//       };
//     }
//   }, [isFullPlayerVisible, handleBackPress]);

//   return (
//     <View style={styles.container}>
//       {/* Bottom Tabs */}
//       <HomeBottomTab.Navigator
//         initialRouteName="HomeStack"
//         screenOptions={{
//           headerShown: false,
//           tabBarStyle: {
//             backgroundColor: '#121212',
//             borderTopWidth: 0,
//           },
//           tabBarActiveTintColor: '#fff',
//           tabBarInactiveTintColor: '#888',
//         }}
//       >
//         <HomeBottomTab.Screen
//           name="HomeStack"
//           component={HomeStack}
//           options={{
//             tabBarLabel: 'Home',
//             tabBarIcon: ({ color, size, focused }) =>
//               focused ? (
//                 <HomeFocusIcon width={size} height={size} fill={color} />
//               ) : (
//                 <HomeIcon width={size} height={size} fill={color} />
//               ),
//           }}
//         />

//         <HomeBottomTab.Screen
//           name="SearchScreen"
//           component={SearchScreen}
//           options={{
//             tabBarLabel: 'Search',
//             tabBarIcon: ({ color, size }) => (
//               <SearchIcon width={size} height={size} fill={color} />
//             ),
//           }}
//         />

//         <HomeBottomTab.Screen
//           name="LibraryScreen"
//           component={LibraryScreen}
//           options={{
//             tabBarLabel: 'Library',
//             tabBarIcon: ({ color, size, focused }) =>
//               focused ? (
//                 <LibraryFocusIcon width={size} height={size} fill={color} />
//               ) : (
//                 <LibraryIcon width={size} height={size} fill={color} />
//               ),
//           }}
//         />

//         <HomeBottomTab.Screen
//           name="PremiumScreen"
//           component={PremiumScreen}
//           options={{
//             tabBarLabel: 'Premium',
//             tabBarIcon: ({ color, size }) => (
//               <PremiumIcon width={size} height={size} fill={color} />
//             ),
//           }}
//         />
//       </HomeBottomTab.Navigator>

//       {/* MiniPlayer */}
//       <View style={styles.miniPlayerContainer}>
//         <MiniPlayer onPress={showFullPlayer} />
//       </View>

//       {/* FullPlayerScreen Overlay */}
//       {isFullPlayerVisible && (
//         <FullPlayerScreen onClose={hideFullPlayer} />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   miniPlayerContainer: {
//     position: 'absolute',
//     bottom: 64, // Điều chỉnh MiniPlayer nằm ngay trên tabBar
//     left: 0,
//     right: 0,
//     height: 60,
//     backgroundColor: '#121212',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default HomeTabs;

// HomeTabs.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, BackHandler, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MiniPlayer from '../components/MiniPlayer';
import HomeStack from './HomeStack';
import SearchScreen from '../screens/SearchScreen';
import LibraryScreen from '../screens/LibraryScreen';
import PremiumScreen from '../screens/PremiumScreen';
import FullPlayerScreen from '../screens/FullPlayerScreen';
import HomeIcon from '../assets/svg/HomeIcon';
import HomeFocusIcon from '../assets/svg/HomeFocusIcon';
import SearchIcon from '../assets/svg/SearchIcon';
import LibraryIcon from '../assets/svg/LibraryIcon';
import LibraryFocusIcon from '../assets/svg/LibraryFocusIcon';
import PremiumIcon from '../assets/svg/PremiumIcon';
import MusicPlayerService from '../services/MusicPlayerService'; // Đảm bảo import dịch vụ phát nhạc

const HomeBottomTab = createBottomTabNavigator();
// const screenHeight = Dimensions.get('window').height;

const HomeTabs = ({route}) => {
  const { user, token } = route.params || {};
  const [isFullPlayerVisible, setIsFullPlayerVisible] = useState(false);
  const [currentSong, setCurrentSong] = useState(MusicPlayerService.currentSong);
  const [isPlaying, setIsPlaying] = useState(MusicPlayerService.isPlaying);

  const showFullPlayer = () => setIsFullPlayerVisible(true);
  const hideFullPlayer = () => setIsFullPlayerVisible(false);

  // Hàm xử lý nút Back
  const handleBackPress = useCallback(() => {
    if (isFullPlayerVisible) {
      hideFullPlayer();
      return true; // Chặn hành động mặc định
    }
    return false; // Cho phép hành động mặc định
  }, [isFullPlayerVisible]);

  useEffect(() => {
    // Lắng nghe sự kiện từ MusicPlayerService để cập nhật trạng thái phát nhạc
    const songChangedListener = MusicPlayerService.emitter.addListener(
      'songChanged',
      ({ currentSong, isPlaying }) => {
        setCurrentSong(currentSong);
        setIsPlaying(isPlaying);
      }
    );

    const playbackStatusChangedListener = MusicPlayerService.emitter.addListener(
      'playbackStatusChanged',
      ({ isPlaying }) => {
        setIsPlaying(isPlaying);
      }
    );

    // Thêm listener cho nút Back khi FullPlayerScreen hiển thị
    if (Platform.OS === 'android') {
      if (isFullPlayerVisible) {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      } else {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      }
    }

    // Dọn dẹp listener khi component unmount
    return () => {
      songChangedListener.remove();
      playbackStatusChangedListener.remove();
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [isFullPlayerVisible, handleBackPress]);

  return (
    <View style={styles.container}>
      {/* Bottom Tabs */}
      <HomeBottomTab.Navigator
        initialRouteName="HomeStack"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            // backgroundColor: 'transparent',
            backgroundColor: 'rgba(0, 0, 0, 0.75)', // Trong suốt 50%
            position: 'absolute', // Đặt tab ở trên nội dung
            elevation: 0, // Xóa bóng trên Android
            borderTopWidth: 0, // Xóa đường viền trên
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#888',
        }}
      >
        <HomeBottomTab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <HomeFocusIcon width={size} height={size} fill={color} />
              ) : (
                <HomeIcon width={size} height={size} fill={color} />
              ),
          }}
          initialParams={{ user, token }}
        />

        <HomeBottomTab.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <SearchIcon width={size} height={size} fill={color} />
            ),
          }}
          initialParams={{ user, token }}
        />

        <HomeBottomTab.Screen
          name="LibraryScreen"
          component={LibraryScreen}
          options={{
            tabBarLabel: 'Library',
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <LibraryFocusIcon width={size} height={size} fill={color} />
              ) : (
                <LibraryIcon width={size} height={size} fill={color} />
              ),
          }}
          initialParams={{ user, token }}
        />

        <HomeBottomTab.Screen
          name="PremiumScreen"
          component={PremiumScreen}
          options={{
            tabBarLabel: 'Premium',
            tabBarIcon: ({ color, size }) => (
              <PremiumIcon width={size} height={size} fill={color} />
            ),
          }}
          initialParams={{ user, token }}
        />
      </HomeBottomTab.Navigator>

      {/* MiniPlayer - chỉ hiển thị khi có bài hát và đang phát */}
      {(currentSong || isPlaying) && (
        <View style={styles.miniPlayerContainer}>
          <MiniPlayer onPress={showFullPlayer} user={user} token={token} />
        </View>
      )}

      {/* FullPlayerScreen Overlay */}
      {isFullPlayerVisible && (
        <FullPlayerScreen onClose={hideFullPlayer} user={user} token={token} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  miniPlayerContainer: {
    position: 'absolute',
    bottom: 64, // Điều chỉnh MiniPlayer nằm ngay trên tabBar
    left: 10,
    right: 10,
    height: 24,
    // borderBottomWidth:0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeTabs;
