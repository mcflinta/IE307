// import React from 'react';
// import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

// const AlbumDetailsScreen = ({ route }) => {
//   const { albumName, artistName, tracks, albumImage } = route.params;

//   return (
//     <View style={styles.container}>
//       {/* Hình ảnh album */}
//       <Image source={{ uri: albumImage }} style={styles.albumImage} />

//       {/* Tên album */}
//       <Text style={styles.header}>{albumName}</Text>

//       {/* Tên nghệ sĩ */}
//       <Text style={styles.subHeader}>Artist: {artistName}</Text>

//       {/* Danh sách bài hát */}
//       <FlatList
//         data={tracks}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.trackItem}>
//             <Text style={styles.trackName}>{item.title}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#858583',
//   },
//   albumImage: {
//     width: 200, // Chiều rộng hình ảnh
//     height: 200, // Chiều cao hình ảnh
//     alignSelf: 'center', // Căn giữa hình ảnh
//     marginBottom: 16, // Khoảng cách dưới hình ảnh
//     borderRadius: 8, // Bo góc hình ảnh
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   subHeader: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 16,
//     color: '#555',
//   },
//   trackItem: {
//     padding: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   trackName: {
//     fontSize: 16,
//   },
// });

// export default AlbumDetailsScreen;


// import React from 'react';
// import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// const AlbumDetailsScreen = ({ route }) => {
//   const { albumName, artistName, tracks, albumImage } = route.params;

//   return (
//     <LinearGradient
//       colors={['#858583', '#1c1c1c']} // Gradient từ màu tối hơn đến nhạt hơn
//       style={styles.container}
//     >
//       {/* Hình ảnh album */}
//       <Image source={{ uri: albumImage }} style={styles.albumImage} />

//       {/* Tên album */}
//       <Text style={styles.header}>{albumName}</Text>

//       {/* Tên nghệ sĩ */}
//       <Text style={styles.subHeader}>Artist: {artistName}</Text>

//       {/* Danh sách bài hát */}
//       <FlatList
//         data={tracks}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.trackItem}>
//             <Text style={styles.trackName}>{item.title}</Text>
//           </View>
//         )}
//       />
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   albumImage: {
//     width: 300, // Chiều rộng hình ảnh
//     height: 300, // Chiều cao hình ảnh
//     alignSelf: 'center',
//     marginBottom: 16, // Khoảng cách dưới hình ảnh
//     borderRadius: 8, // Bo góc hình ảnh
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 8,
//     color: '#ffffff', // Màu chữ trắng
//   },
//   subHeader: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 16,
//     color: '#aaaaaa', // Màu chữ xám nhạt
//   },
//   trackItem: {
//     padding: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#333333', // Màu gạch ngang
//   },
//   trackName: {
//     fontSize: 16,
//     color: '#ffffff', // Màu chữ danh sách bài hát
//   },
// });

// export default AlbumDetailsScreen;

// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, StatusBar } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// const AlbumDetailsScreen = ({ route }) => {
//   const { albumName, artistName, tracks, albumImage } = route.params;
//   const [dominantColors, setDominantColors] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   console.log(albumImage)
//   // Hàm lấy màu từ API
//   const fetchDominantColors = async () => {
//     try {
//       const response = await fetch(
//         'https://api.ximilar.com/dom_colors/generic/v2/dominantcolor',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token db000e2e329c4bbc1c23d1318f02af693c0d9e3f',
//           },
//           body: JSON.stringify({
//             color_names: true,
//             records: [{ _url: albumImage }],
//           }),
//         }
//       );

//       const data = await response.json();
//       if (
//         data.records &&
//         data.records[0] &&
//         data.records[0]._dominant_colors &&
//         data.records[0]._dominant_colors.rgb_hex_colors
//       ) {
//         const colors = data.records[0]._dominant_colors.rgb_hex_colors;
//         setDominantColors(colors); // Lưu màu trả về từ API
//       }
//     } catch (error) {
//       console.error('Error fetching dominant colors:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDominantColors();
//   }, [albumImage]);
// // Hàm làm nhạt màu mạnh hơn
//   const lightenColor = (hex, percent) => {
//     const num = parseInt(hex.replace("#", ""), 16);
//     const r = Math.min(255, Math.floor((num >> 16) * (1 + percent)));
//     const g = Math.min(255, Math.floor(((num >> 8) & 0xff) * (1 + percent)));
//     const b = Math.min(255, Math.floor((num & 0xff) * (1 + percent)));
//     return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
//   };

//   // Hàm pha trộn với màu đen (nhẹ nhàng hơn)
//   const blendWithBlack = (hex, percent) => {
//     const num = parseInt(hex.replace("#", ""), 16);
//     const r = Math.floor((num >> 16) * (1 - percent));
//     const g = Math.floor(((num >> 8) & 0xff) * (1 - percent));
//     const b = Math.floor((num & 0xff) * (1 - percent));
//     return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
//   };

//   // Tạo màu pha trộn
//   const dominantColor = dominantColors && dominantColors[dominantColors.length - 1]?.startsWith("#")
//   ? blendWithBlack(lightenColor(dominantColors[dominantColors.length - 1], 0.99), 0.0001) // Làm nhạt mạnh hơn, pha ít đen hơn
//   : "#e6e6e6"; // Màu mặc định sáng hơn nếu không có API



  
  
//   // useEffect(() => {
//   //   // Cập nhật StatusBar khi dominantColors thay đổi
//   //   if (dominantColors && dominantColors.length > 1) {
//   //     StatusBar.setBackgroundColor(blendWithBlack(lightenColor(dominantColors[dominantColors.length - 1], 0.99), 0.0001));
//   //     StatusBar.setBarStyle('light-content');
//   //   }
//   // }, [dominantColors]); // Lắng nghe thay đổi của dominantColors

//   if (isLoading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#1c1c1c" />
//       </View>
//     );
//   }

//   // Màu gradient tùy thuộc vào API hoặc dùng giá trị mặc định
//   // const gradientColors = dominantColors
//   //   ? [dominantColors[1], '#000'] // Sử dụng màu tối từ API
//   //   : ['#1c1c1c', '#ffffff']; // Mặc định nếu không có API
// // Hàm làm nhạt màu
// // Hàm tính độ sáng của màu


//   // Gradient sử dụng chỉ một màu
//   const gradientColors = [dominantColor, "#000"]; // Chuyển từ dominantColor sang trắng

//   console.log('GradientColor:', gradientColors)
//     return (
//       <LinearGradient
//         colors={gradientColors}
//         locations={[0, 0.5, 1]} // Đảm bảo gradient chuyển tại 70% chiều cao
//         style={styles.container}
//       >
//         {/* Hình ảnh album */}
//         <View style={styles.imageContainer}>
//           <Image source={{ uri: albumImage }} style={styles.albumImage} />
//         </View>

//         {/* Phần thông tin */}
//         <View style={styles.detailsContainer}>
//           <Text style={styles.albumName}>{albumName}</Text>
//           <Text style={styles.artistName}>{artistName}</Text>
//           <FlatList
//             data={tracks}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <View style={styles.trackItem}>
//                 <Text style={styles.trackName}>{item.title}</Text>
//               </View>
//             )}
//           />
//         </View>
//       </LinearGradient>
//     );
//   };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1c1c1c',
//   },
//   imageContainer: {
//     height: 300,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   albumImage: {
//     width: 300,
//     height: 300,
//     borderRadius: 8,
//   },
//   detailsContainer: {
//     flex: 1,
//     paddingTop: 16,
//     paddingHorizontal: 16,
//   },
//   albumName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000000',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   artistName: {
//     fontSize: 16,
//     color: '#555555',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   trackItem: {
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#dddddd',
//   },
//   trackName: {
//     fontSize: 16,
//     color: '#000000',
//   },
// });

// export default AlbumDetailsScreen;








// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, StatusBar, TouchableOpacity } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons'; // Sử dụng icon từ thư viện

// const AlbumDetailsScreen = ({ route, navigation }) => {
//   const { albumName, artistName, tracks, albumImage } = route.params;
//   const [dominantColors, setDominantColors] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Hàm lấy màu từ API
//   const fetchDominantColors = async () => {
//     try {
//       const response = await fetch(
//         'https://api.ximilar.com/dom_colors/generic/v2/dominantcolor',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token db000e2e329c4bbc1c23d1318f02af693c0d9e3f',
//           },
//           body: JSON.stringify({
//             color_names: true,
//             records: [{ _url: albumImage }],
//           }),
//         }
//       );

//       const data = await response.json();
//       if (
//         data.records &&
//         data.records[0] &&
//         data.records[0]._dominant_colors &&
//         data.records[0]._dominant_colors.rgb_hex_colors
//       ) {
//         const colors = data.records[0]._dominant_colors.rgb_hex_colors;
//         setDominantColors(colors); // Lưu màu trả về từ API
//       }
//     } catch (error) {
//       console.error('Error fetching dominant colors:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDominantColors();
//   }, [albumImage]);

//   const lightenColor = (hex, percent) => {
//     const num = parseInt(hex.replace("#", ""), 16);
//     const r = Math.min(255, Math.floor((num >> 16) * (1 + percent)));
//     const g = Math.min(255, Math.floor(((num >> 8) & 0xff) * (1 + percent)));
//     const b = Math.min(255, Math.floor((num & 0xff) * (1 + percent)));
//     return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
//   };

//   const blendWithBlack = (hex, percent) => {
//     const num = parseInt(hex.replace("#", ""), 16);
//     const r = Math.floor((num >> 16) * (1 - percent));
//     const g = Math.floor(((num >> 8) & 0xff) * (1 - percent));
//     const b = Math.floor((num & 0xff) * (1 - percent));
//     return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
//   };

//   const dominantColor = dominantColors && dominantColors[dominantColors.length - 1]?.startsWith("#")
//     ? blendWithBlack(lightenColor(dominantColors[dominantColors.length - 1], 0.99), 0.0001)
//     : "#e6e6e6";

//   if (isLoading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#1c1c1c" />
//       </View>
//     );
//   }

//   const gradientColors = [dominantColor, "#000"];

//   return (
//     <LinearGradient
//       colors={gradientColors}
//       locations={[0, 0.5, 1]}
//       style={styles.container}
//     >
//       {/* Nút mũi tên quay lại */}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Icon name="arrow-back" size={24} color="#ffffff" />
//       </TouchableOpacity>

//       {/* Hình ảnh album */}
//       <View style={styles.imageContainer}>
//         <Image source={{ uri: albumImage }} style={styles.albumImage} />
//       </View>

//       {/* Phần thông tin */}
//       <View style={styles.detailsContainer}>
//         <Text style={styles.albumName}>{albumName}</Text>
//         <Text style={styles.artistName}>{artistName}</Text>
//         <FlatList
//           data={tracks}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.trackItem}>
//               <Text style={styles.trackName}>{item.title}</Text>
//             </View>
//           )}
//         />
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // marginTop: StatusBar.currentHeight || 0,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 50, // Canh chỉnh vị trí nút
//     left: 20,
//     zIndex: 10,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)', // Nền trong suốt
//     padding: 8,
//     borderRadius: 20,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1c1c1c',
//     // marginTop: 100
//   },
//   imageContainer: {
//     height: 300,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   albumImage: {
//     width: 300,
//     height: 300,
//     borderRadius: 8,
//   },
//   detailsContainer: {
//     flex: 1,
//     paddingTop: 16,
//     paddingHorizontal: 16,
//   },
//   albumName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000000',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   artistName: {
//     fontSize: 16,
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   trackItem: {
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#dddddd',
//   },
//   trackName: {
//     fontSize: 16,
//     color: '#fff',
//   },
// // });

// // export default AlbumDetailsScreen;




// import React, { useEffect, useState } from 'react';
// import { Animated, View, Text, FlatList, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons';

// const AlbumDetailsScreen = ({ route, navigation }) => {
//   const { albumName, artistName, tracks, albumImage } = route.params;
//   const [dominantColors, setDominantColors] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const scrollY = new Animated.Value(0); // Tạo giá trị animation cho cuộn
//   // console.log("AlbumName:", albumName);
//   const fetchDominantColors = async () => {
//     try {
//       const response = await fetch(
//         'https://api.ximilar.com/dom_colors/generic/v2/dominantcolor',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token db000e2e329c4bbc1c23d1318f02af693c0d9e3f',
//           },
//           body: JSON.stringify({
//             color_names: true,
//             records: [{ _url: albumImage }],
//           }),
//         }
//       );

//       const data = await response.json();
//       if (
//         data.records &&
//         data.records[0] &&
//         data.records[0]._dominant_colors &&
//         data.records[0]._dominant_colors.rgb_hex_colors
//       ) {
//         const colors = data.records[0]._dominant_colors.rgb_hex_colors;
//         setDominantColors(colors);
//       }
//     } catch (error) {
//       console.error('Error fetching dominant colors:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDominantColors();
//   }, [albumImage]);

//   const lightenColor = (hex, percent) => {
//     const num = parseInt(hex.replace("#", ""), 16);
//     const r = Math.min(255, Math.floor((num >> 16) * (1 + percent)));
//     const g = Math.min(255, Math.floor(((num >> 8) & 0xff) * (1 + percent)));
//     const b = Math.min(255, Math.floor((num & 0xff) * (1 + percent)));
//     return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
//   };

//   const blendWithBlack = (hex, percent) => {
//     const num = parseInt(hex.replace("#", ""), 16);
//     const r = Math.floor((num >> 16) * (1 - percent));
//     const g = Math.floor(((num >> 8) & 0xff) * (1 - percent));
//     const b = Math.floor((num & 0xff) * (1 - percent));
//     return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
//   };

//   const dominantColor = dominantColors && dominantColors[dominantColors.length - 1]?.startsWith("#")
//     ? blendWithBlack(lightenColor(dominantColors[dominantColors.length - 1], 0.99), 0.0001)
//     : "#e6e6e6";

//   if (isLoading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#1c1c1c" />
//       </View>
//     );
//   }

//   const gradientColors = [dominantColor, "#000"];

//   // Điều chỉnh kích thước hình ảnh theo vị trí cuộn
//   const imageSize = scrollY.interpolate({
//     inputRange: [0, 200], // Từ 0 đến 200px cuộn
//     outputRange: [300, 100], // Kích thước ảnh thay đổi từ 300 xuống 100
//     extrapolate: "clamp", // Ngăn giá trị vượt quá giới hạn
//   });

//   return (
//     <LinearGradient
//       colors={gradientColors}
//       locations={[0, 0.5, 1]}
//       style={styles.container}
//     >
//       <FlatList
//         data={tracks}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.trackItem}>
//             <Text style={styles.trackName}>{item.title}</Text>
//           </View>
//         )}
//         ListHeaderComponent={() => (
//           <View>
//             {/* Nút mũi tên quay lại */}
//             <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//               <Icon name="arrow-back" size={24} color="#ffffff" />
//             </TouchableOpacity>

//             {/* Hình ảnh và thông tin album */}
//             <View style={styles.imageContainer}>
//               <Animated.Image
//                 source={{ uri: albumImage }}
//                 style={[styles.albumImage, { width: imageSize, height: imageSize }]}
//               />
//             </View>
//             <View style={styles.detailsContainer}>
//               <Text style={styles.albumName}>{albumName}</Text>
//               <Text style={styles.artistName}>{artistName}</Text>
//             </View>
//           </View>
//         )}
//         contentContainerStyle={styles.listContent}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: false }
//         )}
//       />
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   listContent: {
//     paddingBottom: 20,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     zIndex: 10,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     padding: 8,
//     borderRadius: 20,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1c1c1c',
//   },
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   albumImage: {
//     borderRadius: 8,
//   },
//   detailsContainer: {
//     paddingTop: 16,
//     paddingHorizontal: 16,
//   },
//   albumName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   artistName: {
//     fontSize: 16,
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   trackItem: {
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#dddddd',
//   },
//   trackName: {
//     fontSize: 16,
//     color: '#fff',
//   },
// });

// export default AlbumDetailsScreen;








// import React, { useEffect, useState } from 'react';
// import { Animated, View, Text, FlatList, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons';

// const AlbumDetailsScreen = ({ route, navigation }) => {
//   const { albumName, artistName, tracks, albumImage } = route.params;
//   const [dominantColors, setDominantColors] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const scrollY = new Animated.Value(0); // Tạo giá trị animation cho cuộn

//   const fetchDominantColors = async () => {
//     try {
//       const response = await fetch(
//         'https://api.ximilar.com/dom_colors/generic/v2/dominantcolor',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token db000e2e329c4bbc1c23d1318f02af693c0d9e3f',
//           },
//           body: JSON.stringify({
//             color_names: true,
//             records: [{ _url: albumImage }],
//           }),
//         }
//       );

//       const data = await response.json();
//       if (
//         data.records &&
//         data.records[0] &&
//         data.records[0]._dominant_colors &&
//         data.records[0]._dominant_colors.rgb_hex_colors
//       ) {
//         const colors = data.records[0]._dominant_colors.rgb_hex_colors;
//         setDominantColors(colors);
//       }
//     } catch (error) {
//       console.error('Error fetching dominant colors:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDominantColors();
//   }, [albumImage]);

//   const lightenColor = (hex, percent) => {
//     const num = parseInt(hex.replace("#", ""), 16);
//     const r = Math.min(255, Math.floor((num >> 16) * (1 + percent)));
//     const g = Math.min(255, Math.floor(((num >> 8) & 0xff) * (1 + percent)));
//     const b = Math.min(255, Math.floor((num & 0xff) * (1 + percent)));
//     return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
//   };

//   const blendWithBlack = (hex, percent) => {
//     const num = parseInt(hex.replace("#", ""), 16);
//     const r = Math.floor((num >> 16) * (1 - percent));
//     const g = Math.floor(((num >> 8) & 0xff) * (1 - percent));
//     const b = Math.floor((num & 0xff) * (1 - percent));
//     return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
//   };

//   const dominantColor = dominantColors && dominantColors[dominantColors.length - 1]?.startsWith("#")
//     ? blendWithBlack(lightenColor(dominantColors[dominantColors.length - 1], 0.99), 0.0001)
//     : "#e6e6e6";

//   if (isLoading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#1c1c1c" />
//       </View>
//     );
//   }

//   const gradientColors = [dominantColor, "#000"];

//   // Điều chỉnh kích thước hình ảnh và tiêu đề lớn theo vị trí cuộn
//   const imageSize = scrollY.interpolate({
//     inputRange: [0, 200],
//     outputRange: [300, 100],
//     extrapolate: "clamp",
//   });

//   const largeTitleOpacity = scrollY.interpolate({
//     inputRange: [0, 150],
//     outputRange: [1, 0],
//     extrapolate: "clamp",
//   });

//   const smallTitleOpacity = scrollY.interpolate({
//     inputRange: [120, 180],
//     outputRange: [0, 1],
//     extrapolate: "clamp",
//   });

//   return (
//     <LinearGradient
//       colors={gradientColors}
//       locations={[0, 0.5, 1]}
//       style={styles.container}
//     >
//       {/* Nút quay lại cố định */}
//       <View style={styles.headerContainer}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color="#ffffff" />
//         </TouchableOpacity>

//         {/* Tiêu đề nhỏ */}
//         <Animated.Text style={[styles.smallTitle, { opacity: smallTitleOpacity }]}>
//           {albumName}
//         </Animated.Text>
//       </View>

//       {/* Danh sách hiển thị */}
//       <FlatList
//         data={tracks}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.trackItem}>
//             <Text style={styles.trackName}>{item.title}</Text>
//           </View>
//         )}
//         ListHeaderComponent={() => (
//           <View>
//             {/* Hình ảnh và thông tin album */}
//             <View style={styles.imageContainer}>
//               <Animated.Image
//                 source={{ uri: albumImage }}
//                 style={[styles.albumImage, { width: imageSize, height: imageSize }]}
//               />
//             </View>
//             <View style={styles.detailsContainer}>
//               <Animated.Text style={[styles.albumName, { opacity: largeTitleOpacity }]}>
//                 {albumName}
//               </Animated.Text>
//               <Text style={styles.artistName}>{artistName}</Text>
//             </View>
//           </View>
//         )}
//         contentContainerStyle={styles.listContent}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: false }
//         )}
//       />
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   listContent: {
//     paddingBottom: 20,
//   },
//   headerContainer: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     right: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     zIndex: 10,
//   },
//   backButton: {
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     padding: 8,
//     borderRadius: 20,
//   },
//   smallTitle: {
//     marginLeft: 10,
//     fontSize: 18,
//     color: '#ffffff',
//     fontWeight: 'bold',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1c1c1c',
//   },
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   albumImage: {
//     borderRadius: 8,
//   },
//   detailsContainer: {
//     paddingTop: 16,
//     paddingHorizontal: 16,
//   },
//   albumName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000000',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   artistName: {
//     fontSize: 16,
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   trackItem: {
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#dddddd',
//   },
//   trackName: {
//     fontSize: 16,
//     color: '#fff',
//   },
// });

// export default AlbumDetailsScreen;




// import React, { useEffect, useState } from 'react';
// import {
//   Animated,
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
//   TouchableOpacity,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons';

// const AlbumDetailsScreen = ({ route, navigation }) => {
//   const { albumName, artistName, tracks, albumImage } = route.params;
//   const [dominantColors, setDominantColors] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const scrollY = new Animated.Value(0); // Tạo giá trị animation cho cuộn

//   const fetchDominantColors = async () => {
//     try {
//       const response = await fetch(
//         'https://api.ximilar.com/dom_colors/generic/v2/dominantcolor',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token db000e2e329c4bbc1c23d1318f02af693c0d9e3f',
//           },
//           body: JSON.stringify({
//             color_names: true,
//             records: [{ _url: albumImage }],
//           }),
//         }
//       );

//       const data = await response.json();
//       if (
//         data.records &&
//         data.records[0] &&
//         data.records[0]._dominant_colors &&
//         data.records[0]._dominant_colors.rgb_hex_colors
//       ) {
//         const colors = data.records[0]._dominant_colors.rgb_hex_colors;
//         setDominantColors(colors);
//       }
//     } catch (error) {
//       console.error('Error fetching dominant colors:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDominantColors();
//   }, [albumImage]);

//   const lightenColor = (hex, percent) => {
//     const num = parseInt(hex.replace('#', ''), 16);
//     const r = Math.min(255, Math.floor((num >> 16) * (1 + percent)));
//     const g = Math.min(255, Math.floor(((num >> 8) & 0xff) * (1 + percent)));
//     const b = Math.min(255, Math.floor((num & 0xff) * (1 + percent)));
//     return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
//   };

//   const blendWithBlack = (hex, percent) => {
//     const num = parseInt(hex.replace('#', ''), 16);
//     const r = Math.floor((num >> 16) * (1 - percent));
//     const g = Math.floor(((num >> 8) & 0xff) * (1 - percent));
//     const b = Math.floor((num & 0xff) * (1 - percent));
//     return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
//   };

//   const dominantColor =
//     dominantColors && dominantColors[dominantColors.length - 1]?.startsWith('#')
//       ? blendWithBlack(lightenColor(dominantColors[dominantColors.length - 1], 0.99), 0.0001)
//       : '#e6e6e6';

//   if (isLoading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#1c1c1c" />
//       </View>
//     );
//   }

//   const gradientColors = [dominantColor, '#000'];

//   const imageSize = scrollY.interpolate({
//     inputRange: [0, 200],
//     outputRange: [300, 100],
//     extrapolate: 'clamp',
//   });

//   const largeTitleOpacity = scrollY.interpolate({
//     inputRange: [0, 150],
//     outputRange: [1, 0],
//     extrapolate: 'clamp',
//   });

//   const smallTitleOpacity = scrollY.interpolate({
//     inputRange: [120, 180],
//     outputRange: [0, 1],
//     extrapolate: 'clamp',
//   });

//   return (
//     <LinearGradient colors={gradientColors} locations={[0, 0.5, 1]} style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color="#ffffff" />
//         </TouchableOpacity>

//         {/* Tiêu đề nhỏ */}
//         <Animated.Text
//           style={[styles.smallTitle, { opacity: smallTitleOpacity }]}
//           numberOfLines={1}
//           ellipsizeMode="tail"
//         >
//           {albumName}
//         </Animated.Text>
//       </View>

//       <FlatList
//         data={tracks}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.trackItem}>
//             <Text style={styles.trackName}>{item.title}</Text>
//           </View>
//         )}
//         ListHeaderComponent={() => (
//           <View>
//             <View style={styles.imageContainer}>
//               <Animated.Image
//                 source={{ uri: albumImage }}
//                 style={[styles.albumImage, { width: imageSize, height: imageSize }]}
//               />
//             </View>
//             <View style={styles.detailsContainer}>
//               <Animated.Text style={[styles.albumName, { opacity: largeTitleOpacity }]}>
//                 {albumName}
//               </Animated.Text>
//               <Text style={styles.artistName}>{artistName}</Text>
//             </View>
//           </View>
//         )}
//         contentContainerStyle={styles.listContent}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: false }
//         )}
//       />
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   listContent: {
//     paddingBottom: 20,
//   },
//   headerContainer: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     right: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     zIndex: 10,
//   },
//   backButton: {
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     padding: 8,
//     borderRadius: 20,
//   },
//   smallTitle: {
//     marginLeft: 10,
//     fontSize: 18,
//     color: '#ffffff',
//     fontWeight: 'bold',
//     overflow: 'hidden',
//     maxWidth: '70%', // Hạn chế độ rộng để đảm bảo giao diện gọn gàng
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1c1c1c',
//   },
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   albumImage: {
//     borderRadius: 8,
//   },
//   detailsContainer: {
//     paddingTop: 16,
//     paddingHorizontal: 16,
//   },
//   albumName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000000',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   artistName: {
//     fontSize: 16,
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   trackItem: {
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#dddddd',
//   },
//   trackName: {
//     fontSize: 16,
//     color: '#fff',
//   },
// });

// export default AlbumDetailsScreen;



// import React, { useEffect, useState } from 'react';
// import {
//   Animated,
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
//   TouchableOpacity,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons';

// const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

// const AlbumDetailsScreen = ({ route, navigation }) => {
//   const { albumName, artistName, tracks, albumImage } = route.params;
//   const [dominantColors, setDominantColors] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const scrollY = new Animated.Value(0);

//   const fetchDominantColors = async () => {
//     try {
//       const response = await fetch(
//         'https://api.ximilar.com/dom_colors/generic/v2/dominantcolor',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token db000e2e329c4bbc1c23d1318f02af693c0d9e3f',
//           },
//           body: JSON.stringify({
//             color_names: true,
//             records: [{ _url: albumImage }],
//           }),
//         }
//       );

//       const data = await response.json();
//       if (
//         data.records &&
//         data.records[0] &&
//         data.records[0]._dominant_colors &&
//         data.records[0]._dominant_colors.rgb_hex_colors
//       ) {
//         const colors = data.records[0]._dominant_colors.rgb_hex_colors;
//         setDominantColors(colors);
//       }
//     } catch (error) {
//       console.error('Error fetching dominant colors:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDominantColors();
//   }, [albumImage]);

//   const dominantColor =
//     dominantColors && dominantColors[dominantColors.length - 1]?.startsWith('#')
//       ? dominantColors[dominantColors.length - 1]
//       : '#e6e6e6';

//   if (isLoading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#1c1c1c" />
//       </View>
//     );
//   }

//   // Tạo màu gradient động
//   const gradientOpacity = scrollY.interpolate({
//     inputRange: [0, 200],
//     outputRange: [1, 0],
//     extrapolate: 'clamp',
//   });

//   const headerBackgroundColor = scrollY.interpolate({
//     inputRange: [100, 200],
//     outputRange: ['transparent', dominantColor],
//     extrapolate: 'clamp',
//   });

//   const listBackgroundColor = scrollY.interpolate({
//     inputRange: [150, 300],
//     outputRange: ['transparent', '#000'],
//     extrapolate: 'clamp',
//   });

//   const imageSize = scrollY.interpolate({
//     inputRange: [0, 200],
//     outputRange: [300, 100],
//     extrapolate: 'clamp',
//   });

//   const largeTitleOpacity = scrollY.interpolate({
//     inputRange: [0, 150],
//     outputRange: [1, 0],
//     extrapolate: 'clamp',
//   });

//   const smallTitleOpacity = scrollY.interpolate({
//     inputRange: [120, 180],
//     outputRange: [0, 1],
//     extrapolate: 'clamp',
//   });

//   return (
//     <View style={[styles.container, { backgroundColor: listBackgroundColor }]}>
//       {/* Header Gradient chuyển động */}
//       <Animated.View
//         style={[
//           styles.headerContainer,
//           { backgroundColor: headerBackgroundColor },
//         ]}
//       >
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={28} color="#ffffff" />
//         </TouchableOpacity>
//         <Animated.Text
//           style={[styles.smallTitle, { opacity: smallTitleOpacity }]}
//           numberOfLines={1}
//           ellipsizeMode="tail"
//         >
//           {albumName}
//         </Animated.Text>
//       </Animated.View>

//       {/* Gradient động dưới hình ảnh */}
//       <AnimatedLinearGradient
//         colors={[dominantColor, 'transparent']}
//         style={[styles.gradientOverlay, { opacity: gradientOpacity }]}
//       />

//       {/* Danh sách */}
//       <FlatList
//         data={tracks}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.trackItem}>
//             <Text style={styles.trackName}>{item.title}</Text>
//           </View>
//         )}
//         ListHeaderComponent={() => (
//           <View>
//             <View style={styles.imageContainer}>
//               <Animated.Image
//                 source={{ uri: albumImage }}
//                 style={[styles.albumImage, { width: imageSize, height: imageSize }]}
//               />
//             </View>
//             <View style={styles.detailsContainer}>
//               <Animated.Text style={[styles.albumName, { opacity: largeTitleOpacity }]}>
//                 {albumName}
//               </Animated.Text>
//               <Text style={styles.artistName}>{artistName}</Text>
//             </View>
//           </View>
//         )}
//         contentContainerStyle={styles.listContent}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: false }
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   listContent: {
//     paddingBottom: 20,
//   },
//   headerContainer: {
//     position: 'absolute',
//     // marginTop:30,
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 80,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     zIndex: 10,
//   },
//   backButton: {
//     // backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     padding: 8,
//     // borderRadius: 20,
//     marginTop:30,
//   },
//   smallTitle: {
//     marginTop:30,
//     marginLeft: 10,
//     fontSize: 18,
//     color: '#ffffff',
//     fontWeight: 'bold',
//     overflow: 'hidden',
//     maxWidth: '70%',
//   },
//   gradientOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 200,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1c1c1c',
//   },
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   albumImage: {
//     borderRadius: 8,
//   },
//   detailsContainer: {
//     paddingTop: 16,
//     paddingHorizontal: 16,
//   },
//   albumName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000000',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   artistName: {
//     fontSize: 16,
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   trackItem: {
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#dddddd',
//   },
//   trackName: {
//     fontSize: 16,
//     color: '#fff',
//   },
// });

// export default AlbumDetailsScreen;


import React, { useEffect, useState } from 'react';
import {
  Animated,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const AlbumDetailsScreen = ({ route, navigation }) => {
  const { albumName, artistName, tracks, albumImage } = route.params;
  const [dominantColors, setDominantColors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const scrollY = new Animated.Value(0);

  const fetchDominantColors = async () => {
    try {
      const response = await fetch(
        'https://api.ximilar.com/dom_colors/generic/v2/dominantcolor',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token db000e2e329c4bbc1c23d1318f02af693c0d9e3f',
          },
          body: JSON.stringify({
            color_names: true,
            records: [{ _url: albumImage }],
          }),
        }
      );

      const data = await response.json();
      if (
        data.records &&
        data.records[0] &&
        data.records[0]._dominant_colors &&
        data.records[0]._dominant_colors.rgb_hex_colors
      ) {
        const colors = data.records[0]._dominant_colors.rgb_hex_colors;
        setDominantColors(colors);
      }
    } catch (error) {
      console.error('Error fetching dominant colors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDominantColors();
  }, [albumImage]);

  const dominantColor =
    dominantColors && dominantColors[dominantColors.length - 1]?.startsWith('#')
      ? dominantColors[dominantColors.length - 1]
      : '#e6e6e6';

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1c1c1c" />
      </View>
    );
  }

  const gradientOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [100, 200],
    outputRange: ['transparent', dominantColor],
    extrapolate: 'clamp',
  });

  const listBackgroundColor = scrollY.interpolate({
    inputRange: [150, 300],
    outputRange: ['transparent', '#000'],
    extrapolate: 'clamp',
  });

  const imageSize = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [200, 100],
    extrapolate: 'clamp',
  });

  const largeTitleOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const smallTitleOpacity = scrollY.interpolate({
    inputRange: [120, 180],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, { backgroundColor: listBackgroundColor }]}>
      {/* Header */}
      <Animated.View
        style={[
          styles.headerContainer,
          { backgroundColor: headerBackgroundColor },
        ]}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Animated.Text
          style={[styles.smallTitle, { opacity: smallTitleOpacity }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {albumName}
        </Animated.Text>
      </Animated.View>

      {/* Gradient động dưới hình ảnh */}
      <AnimatedLinearGradient
        colors={[dominantColor, 'transparent']}
        style={[styles.gradientOverlay, { opacity: gradientOpacity }]}
      />

      {/* FlatList */}
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.trackItem}>
            {/* Thông tin bài hát */}
            <View style={styles.trackInfo}>
              <Text style={styles.trackTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.trackArtist} numberOfLines={1}>
                {artistName}
              </Text>
            </View>
            {/* Biểu tượng dấu ba chấm */}
            <TouchableOpacity style={styles.moreIcon}>
              <Icon name="ellipsis-vertical" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        )}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.imageContainer}>
              <Animated.Image
                source={{ uri: albumImage }}
                style={[styles.albumImage, { width: imageSize, height: imageSize }]}
              />
            </View>
            <View style={styles.detailsContainer}>
              <Animated.Text style={[styles.albumName, { opacity: largeTitleOpacity }]}>
                {albumName}
              </Animated.Text>
              <Text style={styles.artistName}>{artistName}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
    marginTop: 30,
  },
  smallTitle: {
    marginTop: 30,
    marginLeft: 10,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    overflow: 'hidden',
    maxWidth: '70%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  albumImage: {
    marginTop: 30,
    borderRadius: 8,
    // width: 300,
    // height: 300,
  },
  detailsContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  albumName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    // textAlign: 'center',
    marginBottom: 8,
  },
  artistName: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#333',
  },
  trackInfo: {
    flex: 1,
    marginRight: 10,
  },
  trackTitle: {
    fontSize: 16,
    color: '#ffffff',
    // fontWeight: 'bold',
  },
  trackArtist: {
    fontSize: 14,
    color: '#888888',
  },
  moreIcon: {
    padding: 5,
  },
});

export default AlbumDetailsScreen;
