


// import React, { useEffect, useState, useContext, useCallback } from 'react';
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
// import AddIcon from '../assets/svg/AddIcon';
// import ThreeDotIcon from '../assets/svg/ThreeDotIcon';
// import ShufffeIcon from '../assets/svg/ShuffleIcon';
// import PlayIcon from '../assets/svg/PlayIcon'
// import { MusicPlayerContext } from '../components/MusicPlayerProvider';
// const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

// const AlbumDetailsScreen = ({ route, navigation }) => {
//   const { albumName, artistName, tracks, albumImage, artistImageUrl, releaseYear, fullReleaseDate, totalTracks, totalDuration } = route.params;
//   const [dominantColors, setDominantColors] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const scrollY = new Animated.Value(0);
//   // console.log(totalTracks)
//   const { loadAndPlaySong } = useContext(MusicPlayerContext);
//   console.log("hello")
//   const handleTrackPress = useCallback((track) => {
//     // console.log('Playing track:', track);
//     track = {      id: '1',
//       title: 'Die With A Smile',
//       artist: 'Lady Gaga, Bruno Mars',
//       url: 'http://192.168.105.35:3000/music/Lady%20Gaga,%20Bruno%20Mars%20-%20Die%20With%20A%20Smile.mp3',
//       image: 'https://i.scdn.co/image/ab67706f000000024bbada5194e822e26b22947d',}
//     loadAndPlaySong(track); // Phát bài hát
//   },[loadAndPlaySong]);
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
//   const TrackItem = React.memo(({ item, handleTrackPress, artistName }) => (
//     <TouchableOpacity style={styles.trackItem} onPress={() => handleTrackPress(item)}>
//       <View style={styles.trackInfo}>
//         <Text style={styles.trackTitle} numberOfLines={1}>
//           {item.title}
//         </Text>
//         <Text style={styles.trackArtist} numberOfLines={1}>
//           {artistName}
//         </Text>
//       </View>
//       <TouchableOpacity style={styles.moreIcon}>
//         <Icon name="ellipsis-vertical" size={20} color="#ffffff" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   ));
//   const ListHeader = React.memo(({ albumImage, albumName, artistImageUrl, artistName, releaseYear, imageSize, largeTitleOpacity }) => (
//     <View>
//       <View style={styles.imageContainer}>
//         <Animated.Image
//           source={{ uri: albumImage }}
//           style={[styles.albumImage, { width: imageSize, height: imageSize }]}
//         />
//       </View>
//       <View style={styles.detailsContainer}>
//         <Animated.Text style={[styles.albumName, { opacity: largeTitleOpacity }]}>
//           {albumName}
//         </Animated.Text>
//         <View style={styles.artistContainer}>
//           {artistImageUrl && (
//             <Image
//               source={{ uri: artistImageUrl }}
//               style={styles.artistImage}
//             />
//           )}
//           <Text style={styles.artistName}>{artistName}</Text>
//         </View>
//         <View style={styles.actionRelease}>
//           <View style={styles.albumReleaseYear}>
//             <Text style={styles.releaseYearText}>Album • {releaseYear}</Text>
//             <AddIcon width={24} height={24} fill="#fff" opacity="0.7" />
//           </View>
//         </View>
//       </View>
//     </View>
//   ));
//   return (
//     <View style={[styles.container, { backgroundColor: listBackgroundColor }]}>
//       {/* Header */}
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
  
//       {/* FlatList */}
//       <FlatList
//         data={tracks}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TrackItem
//             item={item}
//             handleTrackPress={handleTrackPress}
//             artistName={artistName}
//           />
//         )}
//         // ListHeaderComponent={() => (
//         //   <View>
//         //     <View style={styles.imageContainer}>
//         //       <Animated.Image
//         //         source={{ uri: albumImage }}
//         //         style={[styles.albumImage, { width: imageSize, height: imageSize }]}
//         //       />
//         //     </View>
//         //     <View style={styles.detailsContainer}>
//         //       <Animated.Text style={[styles.albumName, { opacity: largeTitleOpacity }]}>
//         //         {albumName}
//         //       </Animated.Text>
//         //       <View style={styles.artistContainer}>
//         //         {artistImageUrl && (
//         //           <Image
//         //             source={{ uri: artistImageUrl }}
//         //             style={styles.artistImage}
//         //           />
//         //         )}
//         //         <Text style={styles.artistName}>{artistName}</Text>
//         //       </View>
//         //       <View style={styles.actionRelease}>
//         //         <View style={styles.albumReleaseYear}>
//         //           <Text style={styles.releaseYearText}>Album • {releaseYear}</Text>
//         //           <AddIcon width={24} height={24} fill="#fff" opacity="0.7" />
//         //         </View>
//         //       </View>
//         //     </View>
//         //   </View>
//         // )}
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
//         ListFooterComponent={() => (
//           <View style={styles.footerContainer}>
//             <Text style={styles.releaseDate}>{fullReleaseDate}</Text>
//             <Text style={styles.releaseDate}>
//               {totalTracks > 1 ? `${totalTracks} songs` : `${totalTracks} song`} • {totalDuration}
//             </Text>
//             <View style={styles.artistContainer}>
//                 {artistImageUrl && (
//                   <Image
//                     source={{ uri: artistImageUrl }}
//                     style={styles.artistImageLarge}
//                   />
//                 )}
//                 <Text style={styles.artistNameLarge}>{artistName}</Text>
//               </View>
//           </View>
//         )}
//         contentContainerStyle={styles.listContent}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: false }
//         )}


//       />
  
//       {/* Nút Play di chuyển */}
//       <Animated.View
//         style={[
//           styles.fixedPlayButton,
//           {
//             transform: [
//               {
//                 translateY: scrollY.interpolate({
//                   inputRange: [0, 200], // Từ khi chưa cuộn đến khi header xuất hiện
//                   outputRange: [200, -105], // Di chuyển từ vị trí ban đầu đến vị trí cố định
//                   extrapolate: 'clamp', // Không cho giá trị vượt ngoài khoảng trên
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
//   container: {
//     flex: 1,
//     paddingBottom: 60, // Độ cao của MiniPlayer
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
//     marginTop: 30,
//     borderRadius: 8,
//     // width: 300,
//     // height: 300,
//   },
//   detailsContainer: {
//     paddingTop: 16,
//     paddingHorizontal: 16,
//   },
//   albumName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//     // textAlign: 'center',
//     marginBottom: 8,
//   },

//   trackItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     // borderBottomWidth: 1,
//     // borderBottomColor: '#333',
//   },
//   trackInfo: {
//     flex: 1,
//     marginRight: 10,
//   },
//   trackTitle: {
//     fontSize: 16,
//     color: '#ffffff',
//     // fontWeight: 'bold',
//   },
//   trackArtist: {
//     fontSize: 14,
//     color: '#888888',
//   },
//   moreIcon: {
//     padding: 5,
//   },
//   artistContainer: {
//     flexDirection: 'row', // Đặt các phần tử theo chiều ngang
//     alignItems: 'center', // Căn giữa theo chiều dọc
//     marginTop: 8, // Khoảng cách bên trên
//   },
//   artistImage: {
//     width: 20, // Chiều rộng hình ảnh
//     height: 20, // Chiều cao hình ảnh
//     borderRadius: 20, // Bo tròn để tạo hình tròn
//     marginRight: 8, // Khoảng cách giữa hình ảnh và tên nghệ sĩ
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
//     justifyContent: 'space-between'
//   },
//   releaseYearText: {
//     fontSize: 13, // Nhỏ hơn một chút để phù hợp
//     color: '#fff',
//     opacity: 0.7, // Tạo hiệu ứng màu mờ giống như trong ảnh
//     fontWeight: '400',
//     marginRight: 20,

//   },
  
//   playButton: {
//     width: 50,
//     height: 50,
//     backgroundColor: '#1ED760', // Màu xanh lá Spotify
//     borderRadius: 25, // Tạo nút hình tròn
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   fixedPlayButton: {
//     position: 'absolute',
//     top:160,
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
//     width: 50, // Chiều rộng hình ảnh
//     height: 50, // Chiều cao hình ảnh
//     borderRadius: 30, // Bo tròn để tạo hình tròn
//     marginRight: 12, // Khoảng cách giữa hình ảnh và tên nghệ sĩ

//   },
//   artistNameLarge: {
//     fontSize: 16,
//     color: '#fff',
//     textAlign: 'left',
//     // fontWeight: 'bold',
//   },
// });

// export default AlbumDetailsScreen;



import React, { useEffect, useState, useCallback } from 'react';
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
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const AlbumDetailsScreen = ({ route}) => {
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
  } = route.params;
  // console.log('AlbumDetailsScreen', route.params.token);
  const token = route.params.token
  const [songIds, setSongIds] = useState([]);
  // console.log(token)
  const [dominantColors, setDominantColors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false); // Trạng thái icon
  // console.log("AlbumDetailsScreen", tracks)
  const scrollY = new Animated.Value(0);

  const handleTrackPress = useCallback(
    (track) => {
      // track = [{      id: '1',
      //         title: 'Die With A Smile',
      //         artist: 'Lady Gaga, Bruno Mars',
      //         url: 'http://192.168.105.35:3000/music/Lady%20Gaga,%20Bruno%20Mars%20-%20Die%20With%20A%20Smile.mp3',
      //         image: 'https://i.scdn.co/image/ab67706f000000024bbada5194e822e26b22947d',}]

      
      const index = tracks.findIndex((t) => t.id === track.id);
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
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        // Gọi API để lấy danh sách playlist
        const response = await axios.get('http://149.28.146.58:3000/playlists', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const playlists = response.data;
        // console.log("Play list:", playlists)
        // Trích xuất tất cả id bài hát từ tất cả playlist
        const allSongIds = playlists.flatMap(playlist => playlist.songs);

        // console.log("All song id:", allSongIds)
        setSongIds(allSongIds); // Lưu danh sách id bài hát vào state
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, [token]);
  // console.log(songIds)
  console.log(songIds)
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

  // const TrackItem = React.memo(({ item, handleTrackPress, artistName }) => (
  //   <TouchableOpacity style={styles.trackItem} onPress={() => handleTrackPress(item)}>
  //     <View style={styles.trackInfo}>
  //       <Text style={styles.trackTitle} numberOfLines={1}>
  //         {item.title}
  //       </Text>
  //       <Text style={styles.trackArtist} numberOfLines={1}>
  //         {artistName}
  //       </Text>
  //     </View>
  //     {isAdded && (
  //     <TouchableOpacity style={styles.moreIcon}>
  //       <LikedIcon width={24} height={24} fill="#1ed760" />
  //     </TouchableOpacity>
  //   )}
  //     <TouchableOpacity style={styles.moreIcon}>
  //       <Icon name="ellipsis-vertical" size={20} color="#ffffff" />
  //     </TouchableOpacity>
  //   </TouchableOpacity>
  // ));
  const TrackItem = React.memo(({ item, handleTrackPress, artistName, songIds }) => {
    console.log(songIds)
    const isLiked = songIds.includes(item.id); // Kiểm tra xem item.id có trong allSongIds không
  
    return (
      <TouchableOpacity style={styles.trackItem} onPress={() => handleTrackPress(item)}>
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.trackArtist} numberOfLines={1}>
            {artistName}
          </Text>
        </View>
        {/* Hiển thị LikedIcon nếu bài hát được thích */}
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
            {artistImageUrl && (
              <Image source={{ uri: artistImageUrl }} style={styles.artistImage} />
            )}
            <Text style={styles.artistName}>{artistName}</Text>
          </View>
          <View style={styles.actionRelease}>
            <View style={styles.albumReleaseYear}>
              <Text style={styles.releaseYearText}>Album • {releaseYear}</Text>
              <AddIcon width={24} height={24} fill="#fff" opacity="0.7" />
            </View>
          </View>
        </View>
      </View>
    )
  );

  return (
    <View style={[styles.container, { backgroundColor: listBackgroundColor }]}>
      {/* Header */}
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
          <TrackItem item={item} handleTrackPress={handleTrackPress} artistName={artistName}
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
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <Text style={styles.releaseDate}>{fullReleaseDate}</Text>
            <Text style={styles.releaseDate}>
              {totalTracks > 1 ? `${totalTracks} songs` : `${totalTracks} song`} • {totalDuration}
            </Text>
            <View style={styles.artistContainer}>
              {artistImageUrl && (
                <Image source={{ uri: artistImageUrl }} style={styles.artistImageLarge} />
              )}
              <Text style={styles.artistNameLarge}>{artistName}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
      />

      {/* Nút Play di chuyển */}
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
});

export default AlbumDetailsScreen;
