// // import React from 'react';
// // import { createStackNavigator } from '@react-navigation/stack';
// // import SearchScreen from '../screens/SearchScreen'; // Màn hình chính
// // import SearchDetailScreen from '../screens/SearchDetailScreen'; // Màn hình con
// // import { View, Text, TextInput, StyleSheet, FlatList, Image, Animated, StatusBar, TouchableOpacity } from 'react-native';


// // const SearchStack = createStackNavigator();

// // const SearchStackNavigator = ({ route }) => {
// //   const { user } = route.params || {}; // Truyền dữ liệu từ ngoài vào Stack nếu cần

// //   return (
// //     <SearchStack.Navigator
// //       screenOptions={{
// //         headerStyle: { backgroundColor: '#121212' },
// //         headerTintColor: '#fff',
// //         headerShown: false, // Ẩn header mặc định
// //       }}
// //     >
// //       {/* Màn hình chính của Stack */}
// //       <SearchStack.Screen
// //         name="SearchScreen"
// //         component={SearchScreen}
// //         initialParams={{ user }}
// //         options={{
// //           headerShown: false,
// //         }}
// //       />

// //       {/* Màn hình con (hiển thị khi nhấn vào Search Bar) */}
// //       <SearchStack.Screen
// //         name="SearchDetailScreen"
// //         component={SearchDetailScreen}
// //         options={{
// //             headerShown: true,
// //             headerStyle: { backgroundColor: '#121212' },
// //             headerTintColor: '#fff',
// //             // headerTitleAlign: 'center',
// //             headerTitle: () => (
// //             <TextInput
// //                 color="#fff"
// //                 placeholder="What do you want to listen to?"
// //                 placeholderTextColor="#fff"
// //             />
// //             ),
// //         }}
// //         />
// //     </SearchStack.Navigator>
// //   );
// // };

// // export default SearchStackNavigator;

// import React, { useState, useEffect } from 'react';
// import { TextInput, StyleSheet } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import debounce from 'lodash.debounce';
// import SearchScreen from '../screens/SearchScreen';
// import SearchDetailScreen from '../screens/SearchDetailScreen';

// const SearchStack = createStackNavigator();

// const SearchStackNavigator = ({ route }) => {
//   const { user } = route.params || {}; // Truyền dữ liệu từ ngoài vào Stack nếu cần

//   // State và hàm gửi request tìm kiếm
//   const [searchText, setSearchText] = useState('');

//   // Hàm gửi request (giả lập)
//   const fetchSearchResults = async (query) => {
//     if (!query.trim()) return; // Không gửi request nếu query rỗng
//     console.log(`Fetching results for: ${query}`);
//     // Ví dụ gọi API
//     // const response = await fetch(`https://api.example.com/search?q=${query}`);
//     // const data = await response.json();
//   };

//   // Tạo hàm debounce
//   const debouncedFetchResults = debounce(fetchSearchResults, 500);

//   useEffect(() => {
//     debouncedFetchResults(searchText);
//     return () => debouncedFetchResults.cancel(); // Cleanup debounce
//   }, [searchText]);

//   return (
//     <SearchStack.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: '#121212' },
//         headerTintColor: '#fff',
//         headerShown: false,
//       }}
//     >
//       {/* Màn hình chính */}
//       <SearchStack.Screen
//         name="SearchScreen"
//         component={SearchScreen}
//         initialParams={{ user }}
//         options={{
//           headerShown: false,
//         }}
//       />

//       {/* Màn hình chi tiết */}
//       <SearchStack.Screen
//         name="SearchDetailScreen"
//         component={SearchDetailScreen}
//         options={{
//           headerShown: true,
//           headerStyle: { backgroundColor: '#121212' },
//           headerTintColor: '#fff',
//           headerTitle: () => (
//             <TextInput
//               style={styles.searchInput}
//               placeholder="What do you want to listen to?"
//               placeholderTextColor="#aaa"
//               onChangeText={setSearchText} // Cập nhật state khi nhập
//               value={searchText} // Hiển thị giá trị đã nhập
//               autoFocus={true} // Tự động focus vào TextInput
//             />
//           ),
//         }}
//       />
//     </SearchStack.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   searchInput: {
//     color: '#fff',
//     fontSize: 18,
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//     paddingVertical: 5,
//     flex: 1,
//   },
// });

// export default SearchStackNavigator;

// navigation/SearchStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import SearchDetailScreen from '../screens/SearchDetailScreen';

const SearchStack = createStackNavigator();

const SearchStackNavigator = ({ route }) => {
    const { user, token } = route?.params || {}; // Đảm bảo an toàn khi destructuring

    return (
      <SearchStack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#121212' },
          headerTintColor: '#fff',
        }}
      >
        <SearchStack.Screen
          name="SearchScreen"
          component={SearchScreen}
          initialParams={{ user, token }} // Truyền user và token vào màn hình này
          options={{ headerShown: false }}
        />
        <SearchStack.Screen
          name="SearchDetailScreen"
          component={SearchDetailScreen}
          initialParams={{ user, token }} // Truyền user và token vào màn hình này
          options={{
            // Có thể thêm các options khác ở đây nếu cần
          }}
        />
      </SearchStack.Navigator>
    );
}



export default React.memo(SearchStackNavigator);
