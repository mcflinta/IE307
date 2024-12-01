// // import React from 'react';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import HomeStack from './HomeStack';

// // import MiniPlayer from '../components/MiniPlayer'; // Đường dẫn đến MiniPlayer.js
// // import SearchScreen from '../screens/SearchScreen';
// // import LibraryScreen from '../screens/LibraryScreen';
// // import PremiumScreen from '../screens/PremiumScreen';
// // import HomeIcon from '../assets/svg/HomeIcon';
// // import HomeFocusIcon from '../assets/svg/HomeFocusIcon';
// // import SearchIcon from '../assets/svg/SearchIcon';
// // import LibraryIcon from '../assets/svg/LibraryIcon';
// // import LibraryFocusIcon from '../assets/svg/LibraryFocusIcon';
// // import PremiumIcon from '../assets/svg/PremiumIcon';

// // const HomeBottomTab = createBottomTabNavigator();

// // const HomeTabs = ({ route }) => {
// //   const { user } = route.params || {};
// //   console.log('HomeTabs user:', user);

// //   return (
// //     <HomeBottomTab.Navigator
// //       initialRouteName="HomeStack"
// //       screenOptions={{
// //         header: () => null,
// //         headerShown: false,
// //         tabBarStyle: {
// //           backgroundColor: '#121212',
// //           borderTopWidth: 0,
// //         },
// //         tabBarActiveTintColor: '#fff',
// //         tabBarInactiveTintColor: '#888',
// //       }}
// //     >
// //       <HomeBottomTab.Screen
// //         name="HomeStack"
// //         component={HomeStack}
// //         options={{
// //           headerShown: false,
// //           tabBarLabel: 'Home',
// //           tabBarIcon: ({ color, size, focused }) =>
// //             focused ? (
// //               <HomeFocusIcon width={size} height={size} fill={color} />
// //             ) : (
// //               <HomeIcon width={size} height={size} fill={color} />
// //             ),
// //         }}
// //         initialParams={{ user }}
// //       />

// //       <HomeBottomTab.Screen
// //         name="SearchScreen"
// //         component={SearchScreen}
// //         options={{
// //           tabBarLabel: 'Search',
// //           tabBarIcon: ({ color, size }) => (
// //             <SearchIcon width={size} height={size} fill={color} />
// //           ),
// //         }}
// //         initialParams={{ user }}
// //       />

// //       <HomeBottomTab.Screen
// //         name="LibraryScreen"
// //         component={LibraryScreen}
// //         options={{
// //           tabBarLabel: 'Library',
// //           tabBarIcon: ({ color, size, focused }) =>
// //             focused ? (
// //               <LibraryFocusIcon width={size} height={size} fill={color} />
// //             ) : (
// //               <LibraryIcon width={size} height={size} fill={color} />
// //             ),
// //         }}
// //         initialParams={{ user }}
// //       />

// //       <HomeBottomTab.Screen
// //         name="PremiumScreen"
// //         component={PremiumScreen}
// //         options={{
// //           headerShown: false,
// //           tabBarLabel: 'Premium',
// //           tabBarIcon: ({ color, size }) => (
// //             <PremiumIcon width={size} height={size} fill={color} />
// //           ),
// //         }}
// //         initialParams={{ user }}
// //       />
// //     </HomeBottomTab.Navigator>
// //   );
// // };

// // export default HomeTabs;
// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MiniPlayer from '../components/MiniPlayer'; // Đường dẫn đến MiniPlayer.js
// import HomeStack from './HomeStack';
// import SearchScreen from '../screens/SearchScreen';
// import LibraryScreen from '../screens/LibraryScreen';
// import PremiumScreen from '../screens/PremiumScreen';
// import HomeIcon from '../assets/svg/HomeIcon';
// import HomeFocusIcon from '../assets/svg/HomeFocusIcon';
// import SearchIcon from '../assets/svg/SearchIcon';
// import LibraryIcon from '../assets/svg/LibraryIcon';
// import LibraryFocusIcon from '../assets/svg/LibraryFocusIcon';
// import PremiumIcon from '../assets/svg/PremiumIcon';
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation nếu cần
// const HomeBottomTab = createBottomTabNavigator();

// const HomeTabs = ({ route }) => {
//   const { user } = route.params || {};
//   const navigation = useNavigation(); // Lấy đối tượng navigation
//   const [currentSong, setCurrentSong] = useState({
//     title: 'Smile',
//     artist: 'Lady Gaga',
//   });
//   const [isPlaying, setIsPlaying] = useState(false);

//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };
//   // console.log("Hello")
//   return (
//     <View style={styles.container}>
//       {/* Bottom Tabs */}
//       <HomeBottomTab.Navigator
//         initialRouteName="HomeStack"
//         screenOptions={{
//           header: () => null,
//           headerShown: false,
//           tabBarStyle: {
//             backgroundColor: '#fff',
//             borderTopWidth: 0,
//             // height: 60, // Đặt chiều cao cho BottomTab
//             // position: 'absolute', // Đảm bảo BottomTab nằm sát đáy
//             // bottom: 0, // Định vị tại đáy màn hình
//             // left: 0,
//             // right: 0,
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
//           initialParams={{ user }}
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
//           initialParams={{ user }}
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
//           initialParams={{ user }}
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
//           initialParams={{ user }}
//         />
//       </HomeBottomTab.Navigator>

//       {/* <View style={styles.miniPlayerContainer}> */}
//         <MiniPlayer 
//           // song={currentSong} 
//           // onPlayPause={() => console.log('Play/Pause pressed')} 
//           // isPlaying={true} 
//           // navigation={navigation} // Truyền navigation vào MiniPlayer
//         />
//       {/* </View> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//   },
//   miniPlayerContainer: {
//     // padding:0,
//     // // position: 'absolute',
//     // bottom: 50, // MiniPlayer nằm ngay trên BottomTab
//     // left: 8,
//     // right: 8,
//     // height: 62, // Chiều cao MiniPlayer
//     // backgroundColor: '#ffffff', // Màu nền MiniPlayer
//     // justifyContent: 'center',
//     // zIndex: 100, // Đảm bảo MiniPlayer nằm trên BottomTab
//     // borderRadius: 5,
//     // overflow: 'hidden'
//   },
// });

// export default HomeTabs;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MiniPlayer from '../components/MiniPlayer';
import HomeStack from './HomeStack';
import SearchScreen from '../screens/SearchScreen';
import LibraryScreen from '../screens/LibraryScreen';
import PremiumScreen from '../screens/PremiumScreen';
import HomeIcon from '../assets/svg/HomeIcon';
import HomeFocusIcon from '../assets/svg/HomeFocusIcon';
import SearchIcon from '../assets/svg/SearchIcon';
import LibraryIcon from '../assets/svg/LibraryIcon';
import LibraryFocusIcon from '../assets/svg/LibraryFocusIcon';
import PremiumIcon from '../assets/svg/PremiumIcon';

const HomeBottomTab = createBottomTabNavigator();

const HomeTabs = ({ route }) => {
  const { user } = route.params || {};

  return (
    <View style={styles.container}>
      <HomeBottomTab.Navigator
        initialRouteName="HomeStack"
        screenOptions={{
          header: () => null,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#121212',
            borderTopWidth: 0,
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
          initialParams={{ user }}
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
          initialParams={{ user }}
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
          initialParams={{ user }}
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
          initialParams={{ user }}
        />
      </HomeBottomTab.Navigator>

      {/* MiniPlayer */}
      <View style={styles.miniPlayerContainer}>
        <MiniPlayer />
        </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  miniPlayerContainer: {
    position: 'absolute',
    bottom: 64, // Điều chỉnh để MiniPlayer nằm trên tabBar
    left: 0,
    right: 0,
    height: 60,
  },
});

export default HomeTabs;
