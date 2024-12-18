// // import React from 'react';
// // import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

// // const genres = [
// //   { id: '1', name: '#chinese r&b', image: { uri: 'https://i.imgur.com/5bPZ29b.jpg' } },
// //   { id: '2', name: '#chill beats', image: { uri: 'https://i.imgur.com/1ORc6Sx.jpg' } },
// //   { id: '3', name: '#indie viet', image: { uri: 'https://i.imgur.com/sYJoTw6.jpg' } },
// // ];

// // const browseItems = [
// //   { id: '1', name: 'Music', color: '#E13300', image: { uri: 'https://seed-mix-image.spotifycdn.com/v6/img/artist/0bAsR2unSRpn6BQPEnNlZm/en/default' } },
// //   { id: '2', name: 'Podcasts', color: '#1ED760', image: { uri: 'https://i.imgur.com/B6zxr6X.png' } },
// //   { id: '3', name: 'Live Events', color: '#8D67AB', image: { uri: 'https://i.imgur.com/P6k6KJh.png' } },
// //   { id: '4', name: '2024 in Music', color: '#B02797', image: { uri: 'https://i.imgur.com/8u9V5Xx.png' } },
// // ];

// // export default function App() {
// //   return (
// //     <View style={styles.container}>
// //       {/* Header */}
// //       <View style={styles.header}>
// //         <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.avatar} />
// //         <Text style={styles.headerText}>Search</Text>
// //         <TouchableOpacity style={styles.cameraIcon}>
// //           <Text style={styles.cameraText}>📷</Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* Search Bar */}
// //       <View style={styles.searchBar}>
// //         <Text style={styles.searchIcon}>🔍</Text>
// //         <TextInput
// //           style={styles.input}
// //           placeholder="What do you want to listen to?"
// //           placeholderTextColor="#777"
// //         />
// //       </View>

// //       {/* Explore your genres */}
// //       <Text style={styles.sectionTitle}>Explore your genres</Text>
// //       <FlatList
// //         data={genres}
// //         keyExtractor={(item) => item.id}
// //         horizontal
// //         renderItem={({ item }) => (
// //           <View style={styles.genreCard}>
// //             <Image source={item.image} style={styles.genreImage} />
// //             <Text style={styles.genreText}>{item.name}</Text>
// //           </View>
// //         )}
// //         showsHorizontalScrollIndicator={false}
// //       />

// //       {/* Browse all */}
// //       <Text style={styles.sectionTitle}>Browse all</Text>
// //       <FlatList
// //         data={browseItems}
// //         keyExtractor={(item) => item.id}
// //         numColumns={2}
// //         renderItem={({ item }) => (
// //           <View style={[styles.browseCard, { backgroundColor: item.color }]}>
// //             <Text style={styles.browseText}>{item.name}</Text>
// //             <Image source={item.image} style={styles.browseImage} />
// //           </View>
// //         )}
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#000',
// //     paddingTop: 50,
// //     paddingHorizontal: 15,
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     marginBottom: 20,
// //   },
// //   headerText: {
// //     color: '#fff',
// //     fontSize: 26,
// //     fontWeight: 'bold',
// //   },
// //   avatar: {
// //     width: 40,
// //     height: 40,
// //     borderRadius: 20,
// //   },
// //   cameraIcon: {
// //     padding: 10,
// //   },
// //   cameraText: {
// //     fontSize: 20,
// //     color: '#fff',
// //   },
// //   searchBar: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: '#333',
// //     borderRadius: 10,
// //     paddingHorizontal: 10,
// //     paddingVertical: 8,
// //     marginBottom: 20,
// //   },
// //   searchIcon: {
// //     fontSize: 18,
// //     color: '#777',
// //     marginRight: 10,
// //   },
// //   input: {
// //     flex: 1,
// //     color: '#fff',
// //     fontSize: 16,
// //   },
// //   sectionTitle: {
// //     color: '#fff',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //   },
// //   genreCard: {
// //     width: 120,
// //     height: 160,
// //     borderRadius: 8,
// //     marginRight: 10,
// //     overflow: 'hidden',
// //   },
// //   genreImage: {
// //     width: '100%',
// //     height: '100%',
// //   },
// //   genreText: {
// //     position: 'absolute',
// //     bottom: 10,
// //     left: 10,
// //     color: '#fff',
// //     fontSize: 14,
// //     fontWeight: 'bold',
// //   },
// //   browseCard: {
// //     flex: 1,
// //     height: 100,
// //     borderRadius: 8,
// //     margin: 5,
// //     padding: 10,
// //     justifyContent: 'space-between',
// //     overflow: 'hidden',
// //   },
// //   browseText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   browseImage: {
// //     position: 'absolute',
// //     bottom: -10,
// //     right: -10,
// //     width: 70,
// //     height: 70,
// //     resizeMode: 'contain',
// //   },
// // });

// import React from 'react';
// import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

// const genres = [
//   { id: '1', name: '#chinese r&b', image: { uri: 'https://i.imgur.com/5bPZ29b.jpg' } },
//   { id: '2', name: '#chill beats', image: { uri: 'https://i.imgur.com/1ORc6Sx.jpg' } },
//   { id: '3', name: '#indie viet', image: { uri: 'https://i.imgur.com/sYJoTw6.jpg' } },
// ];

// const browseItems = [
//   { id: '1', name: 'Music', color: '#E13300', image: { uri: 'https://seed-mix-image.spotifycdn.com/v6/img/artist/0bAsR2unSRpn6BQPEnNlZm/en/default' } },
//   { id: '2', name: 'Podcasts', color: '#1ED760', image: { uri: 'https://i.imgur.com/B6zxr6X.png' } },
//   { id: '3', name: 'Live Events', color: '#8D67AB', image: { uri: 'https://i.imgur.com/P6k6KJh.png' } },
//   { id: '4', name: '2024 in Music', color: '#B02797', image: { uri: 'https://i.imgur.com/8u9V5Xx.png' } },
// ];

// export default function App() {
//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.avatar} />
//         <Text style={styles.headerText}>Search</Text>
//         <TouchableOpacity style={styles.cameraIcon}>
//           <Text style={styles.cameraText}>📷</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchBar}>
//         <Text style={styles.searchIcon}>🔍</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="What do you want to listen to?"
//           placeholderTextColor="#777"
//         />
//       </View>

//       {/* Explore your genres */}
//       <Text style={styles.sectionTitle}>Explore your genres</Text>
//       <FlatList
//         data={genres}
//         keyExtractor={(item) => item.id}
//         horizontal
//         renderItem={({ item }) => (
//           <View style={styles.genreCard}>
//             <Image source={item.image} style={styles.genreImage} />
//             <Text style={styles.genreText}>{item.name}</Text>
//           </View>
//         )}
//         showsHorizontalScrollIndicator={false}
//       />

//       {/* Browse all */}
//       <Text style={styles.sectionTitle}>Browse all</Text>
//       <FlatList
//         data={browseItems}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         renderItem={({ item }) => (
//           <View style={[styles.browseCard, { backgroundColor: item.color }]}>
//             <Text style={styles.browseText}>{item.name}</Text>
//             <Image source={item.image} style={styles.browseImage} />
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     paddingTop: 50,
//     paddingHorizontal: 15,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   headerText: {
//     color: '#fff',
//     fontSize: 26,
//     fontWeight: 'bold',
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   cameraIcon: {
//     padding: 10,
//   },
//   cameraText: {
//     fontSize: 20,
//     color: '#fff',
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#333',
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     marginBottom: 20,
//   },
//   searchIcon: {
//     fontSize: 18,
//     color: '#777',
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     color: '#fff',
//     fontSize: 16,
//   },
//   sectionTitle: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   genreCard: {
//     width: 120,
//     height: 160,
//     borderRadius: 8,
//     marginRight: 10,
//     overflow: 'hidden',
//   },
//   genreImage: {
//     width: '100%',
//     height: '100%',
//   },
//   genreText: {
//     position: 'absolute',
//     bottom: 10,
//     left: 10,
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   browseCard: {
//     flex: 1,
//     height: 100,
//     borderRadius: 8,
//     margin: 5,
//     paddingLeft: 10,
//     justifyContent: 'center',
//     overflow: 'hidden',
//   },
//   browseText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     zIndex: 2,
//   },
//   browseImage: {
//     position: 'absolute',
//     bottom: -20,
//     right: -20,
//     width: 100,
//     height: 100,
//     transform: [{ rotate: '20deg' }],
//     resizeMode: 'contain',
//     opacity: 0.8,
//   },
// });

import React, { useRef, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Animated, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const SearchScreen = ({ route }) => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { user } = route.params || {};

  // Dữ liệu browseItems được memo hóa để tránh tạo lại mỗi khi component render
  const browseItems = useMemo(() => [
    { id: '1', name: 'Music', color: '#E13300', image: { uri: 'https://seed-mix-image.spotifycdn.com/v6/img/artist/0bAsR2unSRpn6BQPEnNlZm/en/default' } },
    { id: '2', name: 'Podcasts', color: '#1ED760', image: { uri: 'https://i.imgur.com/B6zxr6X.png' } },
    { id: '3', name: 'Live Events', color: '#8D67AB', image: { uri: 'https://i.imgur.com/P6k6KJh.png' } },
    { id: '4', name: '2024 in Music', color: '#B02797', image: { uri: 'https://i.imgur.com/8u9V5Xx.png' } },
  ], []);

  // Hàm mở Drawer được memo hóa
  const handleDrawerOpen = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  // Hàm điều hướng đến SearchDetailScreen
  const handleSearchPress = useCallback(() => {
    navigation.navigate('SearchDetailScreen');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar />

      {/* Header với Avatar và tiêu đề Search */}
      <Animated.View
        style={[
          styles.header,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -100],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={handleDrawerOpen} style={styles.drawerButton}>
          <Image
            source={{
              uri: user?.photoURL || 'https://via.placeholder.com/40',
            }}
            style={styles.drawerImage}
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>Search</Text>
      </Animated.View>

      {/* Search Bar (Cố định sát StatusBar) */}
      <Animated.View
        style={[
          styles.searchBar,
          {
            top: scrollY.interpolate({
              inputRange: [0, 100],
              outputRange: [120, StatusBar.currentHeight + 10], // Điều chỉnh phù hợp với thiết bị
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <TouchableOpacity onPress={handleSearchPress} style={styles.searchTouchable}>
          <Text style={styles.searchPlaceholderText}>What do you want to listen to?</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Nội dung ScrollView */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.browseSection}>
          <Text style={styles.sectionTitle}>Browse all</Text>
          <View style={styles.browseContainer}>
            {browseItems.map((item) => (
              <TouchableOpacity key={item.id} style={[styles.browseCard, { backgroundColor: item.color }]}>
                <Text style={styles.browseText}>{item.name}</Text>
                <Image source={item.image} style={styles.browseImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 15,
    right: 15,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  headerText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  searchBar: {
    position: 'absolute',
    left: 13,
    right: 13,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    zIndex: 9,
  },
  searchTouchable: {
    flex: 1,
    justifyContent: 'center',
  },
  searchPlaceholderText: {
    color: '#777',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    marginTop: 160, // Điều chỉnh để không che khuất nội dung
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  browseSection: {
    paddingHorizontal: 15,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  browseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  browseCard: {
    width: '48%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  browseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: 2,
  },
  browseImage: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    width: 100,
    height: 100,
    transform: [{ rotate: '20deg' }],
    resizeMode: 'contain',
    opacity: 0.8,
  },
  drawerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 16,
  },
  drawerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});

export default React.memo(SearchScreen);
