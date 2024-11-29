


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
import AddIcon from '../assets/svg/AddIcon';
import ThreeDotIcon from '../assets/svg/ThreeDotIcon';
import ShufffeIcon from '../assets/svg/ShuffleIcon';
import PlayIcon from '../assets/svg/PlayIcon'
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const AlbumDetailsScreen = ({ route, navigation }) => {
  const { albumName, artistName, tracks, albumImage, artistImageUrl, releaseYear, fullReleaseDate } = route.params;
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
              <View style={styles.artistContainer}>
                {artistImageUrl && (
                  <Image
                    source={{ uri: artistImageUrl }}
                    style={styles.artistImage}
                  />
                )}
                <Text style={styles.artistName}>{artistName}</Text>
              </View>
              <View style={styles.actionRelease}>
                <View style={styles.albumReleaseYear}>
                  <Text style={styles.releaseYearText}>Album • {releaseYear}</Text>
                  <AddIcon width={24} height={24} fill="#fff" opacity="0.7" />
                </View>
                  <TouchableOpacity style={styles.playButton}>
                    <PlayIcon  width={24} height={24} />
                  </TouchableOpacity>
              </View>


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
  artistContainer: {
    flexDirection: 'row', // Đặt các phần tử theo chiều ngang
    alignItems: 'center', // Căn giữa theo chiều dọc
    marginTop: 8, // Khoảng cách bên trên
  },
  artistImage: {
    width: 20, // Chiều rộng hình ảnh
    height: 20, // Chiều cao hình ảnh
    borderRadius: 20, // Bo tròn để tạo hình tròn
    marginRight: 8, // Khoảng cách giữa hình ảnh và tên nghệ sĩ
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
    justifyContent: 'space-between'
  },
  releaseYearText: {
    fontSize: 13, // Nhỏ hơn một chút để phù hợp
    color: '#fff',
    opacity: 0.7, // Tạo hiệu ứng màu mờ giống như trong ảnh
    fontWeight: '400',
    marginRight: 20,

  },
  
  playButton: {
    width: 50,
    height: 50,
    backgroundColor: '#1ED760', // Màu xanh lá Spotify
    borderRadius: 25, // Tạo nút hình tròn
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default AlbumDetailsScreen;
