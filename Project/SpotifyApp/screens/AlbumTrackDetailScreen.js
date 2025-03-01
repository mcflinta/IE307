
// import React, { useEffect, useState, useCallback } from 'react';
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
// import axios from 'axios';
// import { LinearGradient } from 'expo-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons';
// import AddIcon from '../assets/svg/AddIcon';
// import PlayIcon from '../assets/svg/PlayIcon';
// import LikedIcon from '../assets/svg/LikedIcon';
// import MusicPlayerService from '../services/MusicPlayerService';
// import { useNavigation } from '@react-navigation/native';
// import tokenManager from '../services/TokenManager';
// import { API_BASE_URL } from '../config/config';
// const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

// const AlbumDetailsScreen = ({ route}) => {
//   const navigation = useNavigation();
//   const {
//     albumName,
//     artistName,
//     tracks,
//     albumImage,
//     artistImageUrl,
//     releaseYear,
//     fullReleaseDate,
//     totalTracks,
//     totalDuration,
//     colorDark,
//     albumType,
//     moreAlbumsByArtist,
//     copyright,
//   } = route.params;
//   // console.log(tracks)
//   const [songIds, setSongIds] = useState([]);
//   const [dominantColors, setDominantColors] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const scrollY = new Animated.Value(0);

//   const handleTrackPress = useCallback(
//     (track) => {
//       const index = tracks.findIndex((t) => t.track_id === track.track_id);
//       console.log("Album Detatils:", tracks)
//       MusicPlayerService.loadAndPlaySong(tracks, index);
//     },
//     [tracks]
//   );

//   const fetchDominantColors = async () => {
//     try {
//       const response = await fetch(
//         'https://api.ximilar.com/dom_colors/generic/v2/dominantcolor',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token YOUR_API_TOKEN',
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

//   useEffect(() => {
//     const fetchPlaylists = async () => {
//       try {
//         const token = await tokenManager.getToken();
//         if (!token) {
//           console.error('Token is missing.');
//           return;
//         }
//         const response = await axios.get(`${API_BASE_URL}/playlists`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const playlists = response.data;
//         const allSongIds = playlists.flatMap(playlist => playlist.songs);
//         setSongIds(allSongIds); 
//       } catch (error) {
//         console.error('Error fetching playlists:', error);
//       }
//     };
//     fetchPlaylists();
//   }, []);

//   const dominantColor = colorDark;

//   if (isLoading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#1c1c1c" />
//       </View>
//     );
//   }

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
//     outputRange: [200, 100],
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

//   const TrackItem = React.memo(({ item, handleTrackPress, artistName, songIds }) => {
//     const isLiked = songIds.includes(item.track_id);
//     return (
//       <TouchableOpacity style={styles.trackItem} onPress={() => handleTrackPress(item)}>
//         <View style={styles.trackInfo}>
//           <Text style={styles.trackTitle} numberOfLines={1}>
//             {item.track_name}
//           </Text>
//           <Text style={styles.trackArtist} numberOfLines={1}>
//             {artistName}
//           </Text>
//         </View>
//         {isLiked && (
//           <TouchableOpacity style={styles.moreIcon}>
//             <LikedIcon width={24} height={24} fill="#1ed760" />
//           </TouchableOpacity>
//         )}
//         <TouchableOpacity style={styles.moreIcon}>
//           <Icon name="ellipsis-vertical" size={20} color="#ffffff" />
//         </TouchableOpacity>
//       </TouchableOpacity>
//     );
//   });

//   const ListHeader = React.memo(
//     ({
//       albumImage,
//       albumName,
//       artistImageUrl,
//       artistName,
//       releaseYear,
//       imageSize,
//       largeTitleOpacity,
//     }) => (
//       <View>
//         <View style={styles.imageContainer}>
//           <Animated.Image
//             source={{ uri: albumImage }}
//             style={[styles.albumImage, { width: imageSize, height: imageSize }]}
//           />
//         </View>
//         <View style={styles.detailsContainer}>
//           <Animated.Text style={[styles.albumName, { opacity: largeTitleOpacity }]}>
//             {albumName}
//           </Animated.Text>
//           <View style={styles.artistContainer}>
//             {artistImageUrl && (
//               <Image source={{ uri: artistImageUrl }} style={styles.artistImage} />
//             )}
//             <Text style={styles.artistName}>{artistName}</Text>
//           </View>
//           <View style={styles.actionRelease}>
//             <View style={styles.albumReleaseYear}>
//               <Text style={styles.releaseYearText}>{albumType} • {releaseYear}</Text>
//               <AddIcon width={24} height={24} fill="#fff" opacity="0.7" />
//             </View>
//           </View>
//         </View>
//       </View>
//     )
//   );

//   const RenderHorizontalItem = ({ item }) => {
//     return (
//       <TouchableOpacity style={styles.horizontalItemContainer}>
//         <Image source={{ uri: item.coverArtUrl }} style={styles.horizontalItemImage} />
//         <Text style={styles.horizontalItemTitle} numberOfLines={1}>{item.name}</Text>
//         <Text style={styles.horizontalItemSubtitle} numberOfLines={1}>{item.year} • {item.type}</Text>
//       </TouchableOpacity>
//     );
//   };

//   const ListFooter = React.memo(() => (
//     <View>
//       <View style={styles.footerContainer}>
//         <Text style={styles.releaseDate}>{fullReleaseDate}</Text>
//         <Text style={styles.releaseDate}>
//           {totalTracks > 1 ? `${totalTracks} songs` : `${totalTracks} song`} • {totalDuration}
//         </Text>
//         <View style={styles.artistContainer}>
//           {artistImageUrl && (
//             <Image source={{ uri: artistImageUrl }} style={styles.artistImageLarge} />
//           )}
//           <Text style={styles.artistNameLarge}>{artistName}</Text>
//         </View>
//       </View>

//       {/* More by [ArtistName] */}
//       <View style={styles.sectionContainer}>
//         <Text style={styles.sectionTitle}>More by {artistName}</Text>
//         <FlatList
//           data={moreAlbumsByArtist}
//           renderItem={({ item }) => <RenderHorizontalItem item={item} />}
//           keyExtractor={item => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.horizontalListContent}
//         />
//       </View>

//       {/* You Might Also Like */}

//       {/* Thêm (P) 2022 Sony Music Labels Inc. ở cuối 2 flatlist */}
//       <View style={styles.footerNoteContainer}>
//         <Text style={styles.footerNoteText}>{copyright}</Text>
//       </View>
//     </View>
//   ));

//   return (
//     <View style={[styles.container, { backgroundColor: listBackgroundColor }]}>
//       <Animated.View style={[styles.headerContainer, { backgroundColor: headerBackgroundColor }]}>
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

//       <AnimatedLinearGradient
//         colors={[dominantColor, 'transparent']}
//         style={[styles.gradientOverlay, { opacity: gradientOpacity }]}
//       />

//       <FlatList
//         data={tracks}
//         keyExtractor={(item) => item.track_id}
//         renderItem={({ item }) => (
//           <TrackItem
//             item={item}
//             handleTrackPress={handleTrackPress}
//             artistName={artistName}
//             songIds={songIds}
//           />
//         )}
//         ListHeaderComponent={
//           <ListHeader
//             albumImage={albumImage}
//             albumName={albumName}
//             artistImageUrl={artistImageUrl}
//             artistName={artistName}
//             releaseYear={releaseYear}
//             imageSize={imageSize}
//             largeTitleOpacity={largeTitleOpacity}
//           />
//         }
//         ListFooterComponent={<ListFooter />}
//         contentContainerStyle={styles.listContent}
//         onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
//           useNativeDriver: false,
//         })}
//       />

//       <Animated.View
//         style={[
//           styles.fixedPlayButton,
//           {
//             transform: [
//               {
//                 translateY: scrollY.interpolate({
//                   inputRange: [0, 200],
//                   outputRange: [200, -105],
//                   extrapolate: 'clamp',
//                 }),
//               },
//             ],
//           },
//         ]}
//       >
//         <TouchableOpacity style={styles.playButton}>
//           <PlayIcon width={24} height={24} />
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   // (Giữ nguyên các styles hiện có)
//   container: {
//     flex: 1,
//   },
//   listContent: {
//     paddingBottom: 20,
//   },
//   headerContainer: {
//     position: 'absolute',
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
//     padding: 8,
//     marginTop: 30,
//   },
//   smallTitle: {
//     marginTop: 30,
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
//     height: 300,
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
//     marginTop: 30,
//     borderRadius: 8,
//   },
//   detailsContainer: {
//     paddingTop: 16,
//     paddingHorizontal: 16,
//   },
//   albumName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 8,
//   },
//   trackItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
//   trackInfo: {
//     flex: 1,
//     marginRight: 10,
//   },
//   trackTitle: {
//     fontSize: 16,
//     color: '#ffffff',
//   },
//   trackArtist: {
//     fontSize: 14,
//     color: '#888888',
//   },
//   moreIcon: {
//     padding: 5,
//   },
//   artistContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   artistImage: {
//     width: 20,
//     height: 20,
//     borderRadius: 20,
//     marginRight: 8,
//   },
//   artistName: {
//     fontSize: 13,
//     color: '#fff',
//     textAlign: 'left',
//     fontWeight: 'bold',
//   },
//   albumReleaseYear: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   actionRelease: {
//     marginTop: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   releaseYearText: {
//     fontSize: 13,
//     color: '#fff',
//     opacity: 0.7,
//     fontWeight: '400',
//     marginRight: 20,
//   },
//   playButton: {
//     width: 50,
//     height: 50,
//     backgroundColor: '#1ED760',
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   fixedPlayButton: {
//     position: 'absolute',
//     top: 160,
//     right: 20,
//     zIndex: 20,
//   },
//   footerContainer: {
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//   },
//   releaseDate: {
//     fontSize: 16,
//     color: '#ffffff',
//   },
//   artistImageLarge: {
//     width: 50,
//     height: 50,
//     borderRadius: 30,
//     marginRight: 12,
//   },
//   artistNameLarge: {
//     fontSize: 16,
//     color: '#fff',
//     textAlign: 'left',
//   },
//   sectionContainer: {
//     marginTop: 30,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#ffffff',
//     marginLeft: 16,
//     marginBottom: 10,
//   },
//   horizontalListContent: {
//     paddingHorizontal: 16,
//   },
//   horizontalItemContainer: {
//     marginRight: 16,
//     width: 140,
//   },
//   horizontalItemImage: {
//     width: 140,
//     height: 140,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   horizontalItemTitle: {
//     color: '#ffffff',
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   horizontalItemSubtitle: {
//     color: '#ffffff',
//     opacity: 0.7,
//     fontSize: 12,
//   },
//   footerNoteContainer: {
//     marginTop: 20,
//     marginLeft: 16,
//     marginBottom: 30,
//   },
//   footerNoteText: {
//     color: '#fff',
//     opacity: 0.7,
//   },
// });

// export default AlbumDetailsScreen;

// AlbumDetailsScreen.js
// import React, { useEffect, useState, useCallback } from 'react';
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
// import axios from 'axios';
// import { LinearGradient } from 'expo-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons';
// import AddIcon from '../assets/svg/AddIcon';
// import PlayIcon from '../assets/svg/PlayIcon';
// import LikedIcon from '../assets/svg/LikedIcon';
// import MusicPlayerService from '../services/MusicPlayerService';
// import { useNavigation } from '@react-navigation/native';
// import tokenManager from '../services/TokenManager';
// import { API_BASE_URL } from '../config/config';

// const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

// const AlbumDetailsScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const {
//     albumName,
//     artistName,
//     tracks,
//     albumImage,
//     artistImageUrl,
//     releaseYear,
//     fullReleaseDate,
//     totalTracks,
//     totalDuration,
//     colorDark,
//     albumType,
//     moreAlbumsByArtist,
//     copyright,
//   } = route.params;

//   const [songIds, setSongIds] = useState([]);
//   const [dominantColors, setDominantColors] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const scrollY = new Animated.Value(0);

//   const handleTrackPress = useCallback(
//     (track) => {
//       const index = tracks.findIndex((t) => t.track_id === track.track_id);
//       MusicPlayerService.loadAndPlaySong(tracks, index);
//     },
//     [tracks]
//   );

//   const fetchDominantColors = async () => {
//     try {
//       const response = await fetch(
//         'https://api.ximilar.com/dom_colors/generic/v2/dominantcolor',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token YOUR_API_TOKEN',
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

//   useEffect(() => {
//     const fetchPlaylists = async () => {
//       try {
//         const token = await tokenManager.getToken();
//         if (!token) {
//           console.error('Token is missing.');
//           return;
//         }
//         const response = await axios.get(`${API_BASE_URL}/playlists`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const playlists = response.data;
//         const allSongIds = playlists.flatMap((playlist) => playlist.songs);
//         setSongIds(allSongIds);
//       } catch (error) {
//         console.error('Error fetching playlists:', error);
//       }
//     };
//     fetchPlaylists();
//   }, []);

//   // Lắng nghe sự kiện songLikedChanged từ MusicPlayerService
//   useEffect(() => {
//     const subscription = MusicPlayerService.emitter.addListener(
//       'songLikedChanged',
//       ({ songId, action }) => {
//         setSongIds((prevSongIds) => {
//           if (action === 'add') {
//             if (!prevSongIds.includes(songId)) {
//               return [...prevSongIds, songId];
//             }
//           } else if (action === 'remove') {
//             return prevSongIds.filter((id) => id !== songId);
//           }
//           return prevSongIds;
//         });
//       }
//     );

//     // Dọn dẹp listener khi component unmount
//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   const dominantColor = colorDark;

//   if (isLoading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#1c1c1c" />
//       </View>
//     );
//   }

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
//     outputRange: [200, 100],
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

//   const TrackItem = React.memo(({ item, handleTrackPress, artistName, songIds }) => {
//     const isLiked = songIds.includes(item.track_id);
//     return (
//       <TouchableOpacity style={styles.trackItem} onPress={() => handleTrackPress(item)}>
//         <View style={styles.trackInfo}>
//           <Text style={styles.trackTitle} numberOfLines={1}>
//             {item.track_name}
//           </Text>
//           <Text style={styles.trackArtist} numberOfLines={1}>
//             {artistName}
//           </Text>
//         </View>
//         {isLiked && (
//           <TouchableOpacity style={styles.moreIcon}>
//             <LikedIcon width={24} height={24} fill="#1ed760" />
//           </TouchableOpacity>
//         )}
//         <TouchableOpacity style={styles.moreIcon}>
//           <Icon name="ellipsis-vertical" size={20} color="#ffffff" />
//         </TouchableOpacity>
//       </TouchableOpacity>
//     );
//   });

//   const ListHeader = React.memo(
//     ({
//       albumImage,
//       albumName,
//       artistImageUrl,
//       artistName,
//       releaseYear,
//       imageSize,
//       largeTitleOpacity,
//     }) => (
//       <View>
//         <View style={styles.imageContainer}>
//           <Animated.Image
//             source={{ uri: albumImage }}
//             style={[styles.albumImage, { width: imageSize, height: imageSize }]}
//           />
//         </View>
//         <View style={styles.detailsContainer}>
//           <Animated.Text style={[styles.albumName, { opacity: largeTitleOpacity }]}>
//             {albumName}
//           </Animated.Text>
//           <View style={styles.artistContainer}>
//             {artistImageUrl && <Image source={{ uri: artistImageUrl }} style={styles.artistImage} />}
//             <Text style={styles.artistName}>{artistName}</Text>
//           </View>
//           <View style={styles.actionRelease}>
//             <View style={styles.albumReleaseYear}>
//               <Text style={styles.releaseYearText}>
//                 {albumType} • {releaseYear}
//               </Text>
//               <AddIcon width={24} height={24} fill="#fff" opacity="0.7" />
//             </View>
//           </View>
//         </View>
//       </View>
//     )
//   );

//   const RenderHorizontalItem = ({ item }) => {
//     return (
//       <TouchableOpacity style={styles.horizontalItemContainer}>
//         <Image source={{ uri: item.coverArtUrl }} style={styles.horizontalItemImage} />
//         <Text style={styles.horizontalItemTitle} numberOfLines={1}>
//           {item.name}
//         </Text>
//         <Text style={styles.horizontalItemSubtitle} numberOfLines={1}>
//           {item.year} • {item.type}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const ListFooter = React.memo(() => (
//     <View>
//       <View style={styles.footerContainer}>
//         <Text style={styles.releaseDate}>{fullReleaseDate}</Text>
//         <Text style={styles.releaseDate}>
//           {totalTracks > 1 ? `${totalTracks} songs` : `${totalTracks} song`} • {totalDuration}
//         </Text>
//         <View style={styles.artistContainer}>
//           {artistImageUrl && <Image source={{ uri: artistImageUrl }} style={styles.artistImageLarge} />}
//           <Text style={styles.artistNameLarge}>{artistName}</Text>
//         </View>
//       </View>

//       {/* More by [ArtistName] */}
//       <View style={styles.sectionContainer}>
//         <Text style={styles.sectionTitle}>More by {artistName}</Text>
//         <FlatList
//           data={moreAlbumsByArtist}
//           renderItem={({ item }) => <RenderHorizontalItem item={item} />}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.horizontalListContent}
//         />
//       </View>

//       {/* You Might Also Like */}

//       {/* Thêm (P) 2022 Sony Music Labels Inc. ở cuối 2 flatlist */}
//       <View style={styles.footerNoteContainer}>
//         <Text style={styles.footerNoteText}>{copyright}</Text>
//       </View>
//     </View>
//   ));

//   return (
//     <View style={[styles.container, { backgroundColor: listBackgroundColor }]}>
//       <Animated.View style={[styles.headerContainer, { backgroundColor: headerBackgroundColor }]}>
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

//       <AnimatedLinearGradient
//         colors={[dominantColor, 'transparent']}
//         style={[styles.gradientOverlay, { opacity: gradientOpacity }]}
//       />

//       <FlatList
//         data={tracks}
//         keyExtractor={(item) => item.track_id}
//         renderItem={({ item }) => (
//           <TrackItem
//             item={item}
//             handleTrackPress={handleTrackPress}
//             artistName={artistName}
//             songIds={songIds}
//           />
//         )}
//         ListHeaderComponent={
//           <ListHeader
//             albumImage={albumImage}
//             albumName={albumName}
//             artistImageUrl={artistImageUrl}
//             artistName={artistName}
//             releaseYear={releaseYear}
//             imageSize={imageSize}
//             largeTitleOpacity={largeTitleOpacity}
//           />
//         }
//         ListFooterComponent={<ListFooter />}
//         contentContainerStyle={styles.listContent}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           {
//             useNativeDriver: false,
//           }
//         )}
//       />

//       <Animated.View
//         style={[
//           styles.fixedPlayButton,
//           {
//             transform: [
//               {
//                 translateY: scrollY.interpolate({
//                   inputRange: [0, 200],
//                   outputRange: [200, -105],
//                   extrapolate: 'clamp',
//                 }),
//               },
//             ],
//           },
//         ]}
//       >
//         <TouchableOpacity style={styles.playButton}>
//           <PlayIcon width={24} height={24} />
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   // (Giữ nguyên các styles hiện có)
//   container: {
//     flex: 1,
//   },
//   listContent: {
//     paddingBottom: 20,
//   },
//   headerContainer: {
//     position: 'absolute',
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
//     padding: 8,
//     marginTop: 30,
//   },
//   smallTitle: {
//     marginTop: 30,
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
//     height: 300,
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
//     marginTop: 30,
//     borderRadius: 8,
//   },
//   detailsContainer: {
//     paddingTop: 16,
//     paddingHorizontal: 16,
//   },
//   albumName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 8,
//   },
//   trackItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
//   trackInfo: {
//     flex: 1,
//     marginRight: 10,
//   },
//   trackTitle: {
//     fontSize: 16,
//     color: '#ffffff',
//   },
//   trackArtist: {
//     fontSize: 14,
//     color: '#888888',
//   },
//   moreIcon: {
//     padding: 5,
//   },
//   artistContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   artistImage: {
//     width: 20,
//     height: 20,
//     borderRadius: 20,
//     marginRight: 8,
//   },
//   artistName: {
//     fontSize: 13,
//     color: '#fff',
//     textAlign: 'left',
//     fontWeight: 'bold',
//   },
//   albumReleaseYear: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   actionRelease: {
//     marginTop: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   releaseYearText: {
//     fontSize: 13,
//     color: '#fff',
//     opacity: 0.7,
//     fontWeight: '400',
//     marginRight: 20,
//   },
//   playButton: {
//     width: 50,
//     height: 50,
//     backgroundColor: '#1ED760',
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   fixedPlayButton: {
//     position: 'absolute',
//     top: 160,
//     right: 20,
//     zIndex: 20,
//   },
//   footerContainer: {
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//   },
//   releaseDate: {
//     fontSize: 16,
//     color: '#ffffff',
//   },
//   artistImageLarge: {
//     width: 50,
//     height: 50,
//     borderRadius: 30,
//     marginRight: 12,
//   },
//   artistNameLarge: {
//     fontSize: 16,
//     color: '#fff',
//     textAlign: 'left',
//   },
//   sectionContainer: {
//     marginTop: 30,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#ffffff',
//     marginLeft: 16,
//     marginBottom: 10,
//   },
//   horizontalListContent: {
//     paddingHorizontal: 16,
//   },
//   horizontalItemContainer: {
//     marginRight: 16,
//     width: 140,
//   },
//   horizontalItemImage: {
//     width: 140,
//     height: 140,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   horizontalItemTitle: {
//     color: '#ffffff',
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   horizontalItemSubtitle: {
//     color: '#ffffff',
//     opacity: 0.7,
//     fontSize: 12,
//   },
//   footerNoteContainer: {
//     marginTop: 20,
//     marginLeft: 16,
//     marginBottom: 30,
//   },
//   footerNoteText: {
//     color: '#fff',
//     opacity: 0.7,
//   },
// });

// export default AlbumDetailsScreen;


import React, { useEffect, useState, useCallback, useRef } from 'react';
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
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import AddIcon from '../assets/svg/AddIcon';
import PlayIcon from '../assets/svg/PlayIcon';
import LikedIcon from '../assets/svg/LikedIcon';
import MusicPlayerService from '../services/MusicPlayerService';
import { useNavigation } from '@react-navigation/native';
import tokenManager from '../services/TokenManager';
import { API_BASE_URL } from '../config/config';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const AlbumDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const {
    albumName,
    artistName,
    tracks,
    albumImage,
    artistImageUrl,
    releaseYear,
    fullReleaseDate,
    totalTracks,
    totalDuration,
    colorDark,
    albumType,
    moreAlbumsByArtist,
    copyright,
  } = route.params;

  const [songIds, setSongIds] = useState([]);
  const [dominantColors, setDominantColors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const playingTrackIdRef = useRef(null); // Lưu trữ ID bài hát đang phát
  const trackRefs = useRef({}); // Lưu trữ refs đến từng mục trong danh sách
  const scrollY = new Animated.Value(0);

  const handleTrackPress = useCallback(
    (track) => {
      const index = tracks.findIndex((t) => t.track_id === track.track_id);
      MusicPlayerService.loadAndPlaySong(tracks, index);
    },
    [tracks]
  );

  const fetchDominantColors = async () => {
    try {
      const response = await fetch(
        'https://api.ximilar.com/dom_colors/generic/v2/dominantcolor',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token YOUR_API_TOKEN',
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
// Lắng nghe sự kiện bài hát đang phát từ MusicPlayerService
useEffect(() => {
  const subscription = MusicPlayerService.emitter.addListener('songChanged', ({ currentSong }) => {
    const currentTrackId = currentSong.track_id || currentSong.trackId;

    // Đổi màu bài hát cũ về mặc định
    if (playingTrackIdRef.current && trackRefs.current[playingTrackIdRef.current]) {
      trackRefs.current[playingTrackIdRef.current].setNativeProps({
        style: styles.trackTitle,
      });
    }

    // Đổi màu bài hát mới thành màu xanh
    if (trackRefs.current[currentTrackId]) {
      trackRefs.current[currentTrackId].setNativeProps({
        style: [styles.trackTitle, styles.trackTitlePlaying],
      });
    }

    // Cập nhật bài hát đang phát
    playingTrackIdRef.current = currentTrackId;
  });

  return () => {
    subscription.remove(); // Gỡ listener khi component bị unmount
  };
}, []);
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = await tokenManager.getToken();
        if (!token) {
          console.error('Token is missing.');
          return;
        }
        const response = await axios.get(`${API_BASE_URL}/playlists`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const playlists = response.data;
        const allSongIds = playlists.flatMap((playlist) => playlist.songs);
        setSongIds(allSongIds);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };
    fetchPlaylists();
  }, []);

  // Lắng nghe sự kiện songLikedChanged từ MusicPlayerService
  useEffect(() => {
    const subscription = MusicPlayerService.emitter.addListener(
      'songLikedChanged',
      ({ songId, action }) => {
        setSongIds((prevSongIds) => {
          if (action === 'add') {
            if (!prevSongIds.includes(songId)) {
              return [...prevSongIds, songId];
            }
          } else if (action === 'remove') {
            return prevSongIds.filter((id) => id !== songId);
          }
          return prevSongIds;
        });
      }
    );

    // Dọn dẹp listener khi component unmount
    return () => {
      subscription.remove();
    };
  }, []);

  const dominantColor = colorDark;

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

  const TrackItem = React.memo(({ item, handleTrackPress, artistName, songIds }) => {
    const isLiked = songIds.includes(item.track_id);
    return (
      <TouchableOpacity style={styles.trackItem} onPress={() => handleTrackPress(item)}>
        <View style={styles.trackInfo}>
          <Text
            ref={(ref) => (trackRefs.current[item.track_id] = ref)} // Lưu ref vào trackRefs
            style={styles.trackTitle} numberOfLines={1}>
            {item.track_name}
          </Text>
          <Text style={styles.trackArtist} numberOfLines={1}>
            {artistName}
          </Text>
        </View>
        {isLiked && (
          <TouchableOpacity style={styles.moreIcon}>
            <LikedIcon width={24} height={24} fill="#1ed760" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.moreIcon}>
          <Icon name="ellipsis-vertical" size={20} color="#ffffff" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  });

  const ListHeader = React.memo(
    ({
      albumImage,
      albumName,
      artistImageUrl,
      artistName,
      releaseYear,
      imageSize,
      largeTitleOpacity,
    }) => (
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
          <View style={styles.artistContainer}>
            {artistImageUrl && <Image source={{ uri: artistImageUrl }} style={styles.artistImage} />}
            <Text style={styles.artistName}>{artistName}</Text>
          </View>
          <View style={styles.actionRelease}>
            <View style={styles.albumReleaseYear}>
              <Text style={styles.releaseYearText}>
                {albumType} • {releaseYear}
              </Text>
              <AddIcon width={24} height={24} fill="#fff" opacity="0.7" />
            </View>
          </View>
        </View>
      </View>
    )
  );

  const RenderHorizontalItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.horizontalItemContainer}>
        <Image source={{ uri: item.coverArtUrl }} style={styles.horizontalItemImage} />
        <Text style={styles.horizontalItemTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.horizontalItemSubtitle} numberOfLines={1}>
          {item.year} • {item.type}
        </Text>
      </TouchableOpacity>
    );
  };

  const ListFooter = React.memo(() => (
    <View>
      <View style={styles.footerContainer}>
        <Text style={styles.releaseDate}>{fullReleaseDate}</Text>
        <Text style={styles.releaseDate}>
          {totalTracks > 1 ? `${totalTracks} songs` : `${totalTracks} song`} • {totalDuration}
        </Text>
        <View style={styles.artistContainer}>
          {artistImageUrl && <Image source={{ uri: artistImageUrl }} style={styles.artistImageLarge} />}
          <Text style={styles.artistNameLarge}>{artistName}</Text>
        </View>
      </View>

      {/* More by [ArtistName] */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>More by {artistName}</Text>
        <FlatList
          data={moreAlbumsByArtist}
          renderItem={({ item }) => <RenderHorizontalItem item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListContent}
        />
      </View>

      {/* You Might Also Like */}

      {/* Thêm (P) 2022 Sony Music Labels Inc. ở cuối 2 flatlist */}
      <View style={styles.footerNoteContainer}>
        <Text style={styles.footerNoteText}>{copyright}</Text>
      </View>
    </View>
  ));

  return (
    <View style={[styles.container, { backgroundColor: listBackgroundColor }]}>
      <Animated.View style={[styles.headerContainer, { backgroundColor: headerBackgroundColor }]}>
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

      <AnimatedLinearGradient
        colors={[dominantColor, 'transparent']}
        style={[styles.gradientOverlay, { opacity: gradientOpacity }]}
      />

      <FlatList
        data={tracks}
        keyExtractor={(item) => item.track_id}
        renderItem={({ item }) => (
          <TrackItem
            item={item}
            handleTrackPress={handleTrackPress}
            artistName={artistName}
            songIds={songIds}
          />
        )}
        ListHeaderComponent={
          <ListHeader
            albumImage={albumImage}
            albumName={albumName}
            artistImageUrl={artistImageUrl}
            artistName={artistName}
            releaseYear={releaseYear}
            imageSize={imageSize}
            largeTitleOpacity={largeTitleOpacity}
          />
        }
        ListFooterComponent={<ListFooter />}
        contentContainerStyle={styles.listContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: false,
          }
        )}
      />

      <Animated.View
        style={[
          styles.fixedPlayButton,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 200],
                  outputRange: [200, -105],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity style={styles.playButton}>
          <PlayIcon width={24} height={24} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  // (Giữ nguyên các styles hiện có)
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
  trackTitlePlaying: {
    color: '#1ed760', // Màu xanh cho bài hát đang phát
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
    height: 300,
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
  },
  detailsContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  albumName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  trackInfo: {
    flex: 1,
    marginRight: 10,
  },
  trackTitle: {
    fontSize: 16,
    color: '#ffffff',
  },
  trackArtist: {
    fontSize: 14,
    color: '#888888',
  },
  moreIcon: {
    padding: 5,
  },
  artistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  artistImage: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginRight: 8,
  },
  artistName: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  albumReleaseYear: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionRelease: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  releaseYearText: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.7,
    fontWeight: '400',
    marginRight: 20,
  },
  playButton: {
    width: 50,
    height: 50,
    backgroundColor: '#1ED760',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedPlayButton: {
    position: 'absolute',
    top: 160,
    right: 20,
    zIndex: 20,
  },
  footerContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  releaseDate: {
    fontSize: 16,
    color: '#ffffff',
  },
  artistImageLarge: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 12,
  },
  artistNameLarge: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
  },
  sectionContainer: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 16,
    marginBottom: 10,
  },
  horizontalListContent: {
    paddingHorizontal: 16,
  },
  horizontalItemContainer: {
    marginRight: 16,
    width: 140,
  },
  horizontalItemImage: {
    width: 140,
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
  },
  horizontalItemTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  horizontalItemSubtitle: {
    color: '#ffffff',
    opacity: 0.7,
    fontSize: 12,
  },
  footerNoteContainer: {
    marginTop: 20,
    marginLeft: 16,
    marginBottom: 30,
  },
  footerNoteText: {
    color: '#fff',
    opacity: 0.7,
  },
});

export default AlbumDetailsScreen;
