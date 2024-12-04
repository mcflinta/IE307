
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import VerifiedIcon from "../assets/svg/VerifiedIcon";
import axios from "axios";
import tokenManager from "../services/TokenManager";
const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

const SCREEN_WIDTH = Dimensions.get("window").width;
const formatPlaycount = (count) => {
  return Number(count).toLocaleString().toString(); // Thêm dấu phẩy ngăn cách mỗi 3 chữ số
};


const featuringData = [
  { id: "1", title: "This Is Aimer", image: "https://i.scdn.co/image/ab67616d0000b273334eb8d7beb80b5c1ca9db8f" },
  { id: "2", title: "Aimer Radio", image: "https://i.scdn.co/image/ab67616d0000b273334eb8d7beb80b5c1ca9db8f" },
  { id: "3", title: "Anime One", image: "https://i.scdn.co/image/ab67616d0000b273334eb8d7beb80b5c1ca9db8f" },
];



const artistPlaylistsData = [
  {
    id: "1",
    title: "Aimer - SACRA MUSIC MONTH",
    subtitle: "Aimer Setlist Riyadh Season 2022 (Dec 9, 2022)",
    image: "https://i.scdn.co/image/ab67616d0000b273334eb8d7beb80b5c1ca9db8f",
  },
  {
    id: "2",
    title: "Aimer 10th Anniversary",
    subtitle: "",
    image: "https://i.scdn.co/image/ab67616d0000b273334eb8d7beb80b5c1ca9db8f",
  },
  {
    id: "3",
    title: "This Is Aimer",
    subtitle: "",
    image: "https://i.scdn.co/image/ab67616d0000b273334eb8d7beb80b5c1ca9db8f",
  },
];

const fansAlsoLikeData = [
  { id: "1", name: "milet", image: "https://i.scdn.co/image/ab67616d0000b273334eb8d7beb80b5c1ca9db8f" },
  { id: "2", name: "SPYAIR", image: "https://i.scdn.co/image/ab67616d0000b273334eb8d7beb80b5c1ca9db8f" },
  { id: "3", name: "yama", image: "https://i.scdn.co/image/ab67616d0000b273334eb8d7beb80b5c1ca9db8f" },
];

const ArtistScreen = ({ route }) => {
  const [scrollY] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const [tracks, setTracks] = useState([]); // Lưu danh sách bài hát
  const [albums, setAlbums] = useState([]); // Dữ liệu album
  const [lastestAlbum, setLastestAlbum] = useState([]); // Dữ liệu album mới nhất
  const [artistPlaylists, setArtistPlaylists] = useState([]); // Dữ liệu playlist của nghệ sĩ
  const [fansAlsoLike, setFansAlsoLike] = useState([]); // Dữ liệu nghệ sĩ cùng thích
  const [artist, setArtist] = useState([]); // Dữ liệu nghệ sĩ
  const [loading, setLoading] = useState(false); // Trạng thái tải
  const [error, setError] = useState(null); // Thêm state để lưu lỗi nếu cần
  
  const artistId = route.params.artistId;

  // Fetch Tracks
  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      try {
        const token = await tokenManager.getToken(); // Lấy token từ TokenManager
        if (!token) {
          console.error('Token is missing.');
          return;
        }
        const response = await fetch(`http://149.28.146.58:3000/artist/toptrack/${artistId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        const sortedData = data.sort((a, b) => parseInt(b.playcount) - parseInt(a.playcount));

        setTracks(sortedData); // Lưu dữ liệu đã sắp xếp
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setError('Không thể tải dữ liệu.');
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [artistId]);

  // Fetch Albums
  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      try {
        const token = await tokenManager.getToken(); // Lấy token từ TokenManager
        if (!token) {
          console.error('Token is missing.');
          return;
        }
        const response = await fetch(`http://149.28.146.58:3000/artist/popularAlbumRelease/${artistId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAlbums(data.popularReleaseAlbums); // Lưu danh sách album
        setLastestAlbum(data.latest); // Lưu album mới nhất
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err);
        setError('Không thể tải dữ liệu.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [artistId]);

  // Fetch Artist Info
  useEffect(() => {
    const fetchArtist = async () => {
      setLoading(true);
      try {
        const token = await tokenManager.getToken(); // Lấy token từ TokenManager
        if (!token) {
          console.error('Token is missing.');
          return;
        }
        const response = await fetch(`http://149.28.146.58:3000/artist/artistInfo/${artistId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setArtist(data); // Lưu thông tin nghệ sĩ
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err);
        setError('Không thể tải dữ liệu.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [artistId]);
  useEffect(() => {
    const fetchArtistPlaylists = async () => {
      setLoading(true);
      try {
        const token = await tokenManager.getToken(); // Lấy token từ TokenManager
        if (!token) {
          console.error('Token is missing.');
          return;
        }
        const response = await fetch(`http://149.28.146.58:3000/artist/artistPlaylists/${artistId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setArtistPlaylists(data); // Lưu thông tin nghệ sĩ
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err);
        setError('Không thể tải dữ liệu.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtistPlaylists();
  }, [artistId]);
  useEffect(() => {
    const fetchFanAlsoLike = async () => {
      setLoading(true);
      try {
        const token = await tokenManager.getToken(); // Lấy token từ TokenManager
        if (!token) {
          console.error('Token is missing.');
          return;
        }
        const response = await fetch(`http://149.28.146.58:3000/artist/relatedArtists/${artistId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFansAlsoLike(data); // Lưu thông tin nghệ sĩ
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err);
        setError('Không thể tải dữ liệu.');
      } finally {
        setLoading(false);
      }
    };

    fetchFanAlsoLike();
  }, [artistId]);
  // Format functions
  const formatType = (type) => {
    if (!type) return '';
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };
  const handleItemPress = (item) => {
    console.log("Item pressed", item.id);
    navigation.navigate('HomeTabs', {
      screen: 'HomeStack',
      params: {
        screen: 'ArtistScreen',
        params: { artistId: item.id }, // Truyền artistId ở đây
      },
    });
  };
  
  const formatNumber = (num) => {
    num = Number(num);
    if (isNaN(num)) {
      return '0';
    }

    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }

    return num.toString();
  };

  const handlePress = () => {
    navigation.navigate('HomeTabs', {
      screen: 'HomeStack',
      params: {
        screen: 'BioArtistScreen',
        params: { artistId: artistId },
      },
    });
  };

  // Sort albums by date descending
  const sortedAlbums = albums.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // Sắp xếp giảm dần
  });

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [300, 80],
    extrapolate: "clamp",
  });

  const largeTitleOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const smallTitleOpacity = scrollY.interpolate({
    inputRange: [80, 150],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const navBarBackgroundColor = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"],
    extrapolate: "clamp",
  });

  const headerImageOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const handleSeeDiscography = () => {
    console.log("See discography pressed");
    // navigation.navigate("DiscographyScreen");
  };

  // Render functions
  const renderSongItem = ({ item, index }) => (
    <View style={styles.songItem}>
      <Text style={styles.songIndex}>{index + 1}</Text>
      <Image source={{ uri: item.album_cover }} style={styles.songImage} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.songPlays}>{formatPlaycount(item.playcount)}</Text>
      </View>
      <TouchableOpacity>
        <Icon name="ellipsis-vertical" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const ListHeader = () => (
    <View>
      <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
        <AnimatedImageBackground
          source={{ uri: "https://i.scdn.co/image/ab6761610000e5eb23241889efb57a4ce8338932" }}
          style={[styles.headerBackground, { opacity: headerImageOpacity }]}
        >
          <Animated.Text style={[styles.artistNameLarge, { opacity: largeTitleOpacity }]}>
            {artist.name}
          </Animated.Text>
        </AnimatedImageBackground>
      </Animated.View>
      <Text style={styles.listeners}>
        {formatNumber(artist.monthlyListeners)} monthly listeners
      </Text>
      <Text style={styles.sectionTitle}>Popular</Text>
    </View>
  );

  const ListFooter = () => (
    <View>
      <Text style={styles.sectionTitle}>Popular releases</Text>
      <FlatList
        data={sortedAlbums}
        renderItem={renderReleaseItem}
        keyExtractor={(item, index) => `${item.id}_${item.album_id}_${index}`}
        scrollEnabled={false}
      />
      <TouchableOpacity style={styles.discographyButton} onPress={handleSeeDiscography}>
        <Text style={styles.discographyButtonText}>See discography</Text>
      </TouchableOpacity>

      {/* <Text style={styles.sectionTitle}>Featuring Aimer</Text> */}
      {/* <FlatList
        data={featuringData}
        renderItem={renderFeaturingItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuringList}
      /> */}

      <Text style={styles.sectionTitle}>About</Text>

      {/* Sử dụng ImageBackground làm nền cho toàn bộ container */}
      <TouchableOpacity onPress={handlePress}>
        <ImageBackground
          source={{ uri: artist.gallery }}
          style={styles.aboutContainer}
          imageStyle={{ borderRadius: 8 }}
        >
          {/* Biểu tượng Verified */}
          {artist.verified && (
            <View style={styles.verifiedIconContainer}>
              <VerifiedIcon height={24} width={24} fill="#4cb3ff" />
              <Text style={{ color: "#fff", fontSize: 14, marginLeft: 10 }}>Verified artist</Text>
            </View>
          )}

          {/* Nội dung bên trong */}
          <View style={styles.aboutContent}>
            <Text style={styles.aboutListeners}>
              <Text style={styles.boldText}>{formatPlaycount(artist.monthlyListeners)}</Text> MONTHLY LISTENERS
            </Text>
            <Text style={styles.aboutDescription} numberOfLines={3} ellipsizeMode="tail">
              {artist.biography}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Artist Playlists</Text>
      <FlatList
        data={artistPlaylists}
        renderItem={renderPlaylistItem}
        keyExtractor={(item, index) => `${item.id}_${item.uri}_${index}`}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.playlistList}
      />

      <Text style={styles.sectionTitle}>Fans also like</Text>
      <FlatList
        data={fansAlsoLike}
        renderItem={renderFansItem}
        // keyExtractor={(item) => item.id}
        keyExtractor={(item, index) => `${item.id}_${item.uri}_${index}`}

        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.fansList}
      />
    </View>
  );

  const renderReleaseItem = ({ item, index }) => {
    if (lastestAlbum && index === 0) {
      return (
        <View style={styles.releaseItem}>
          <Image source={{ uri: lastestAlbum.coverArt }} style={styles.releaseImage} />
          <View style={styles.releaseInfo}>
            <Text style={styles.releaseTitle} numberOfLines={1}>
              {lastestAlbum.name}
            </Text>
            <Text style={styles.releaseDetails}>Latest release • {lastestAlbum.type}</Text>
          </View>
        </View>
      );
    } else if (index <= 4) {
      return (
        <View style={styles.releaseItem}>
          <Image source={{ uri: item.coverArt }} style={styles.releaseImage} />
          <View style={styles.releaseInfo}>
            <Text style={styles.releaseTitle} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.releaseDetails}>{item.date} • {formatType(item.type)}</Text>
          </View>
        </View>
      );
    } else {
      return null; // Explicitly return null for indices > 4
    }
  };

  // const renderFeaturingItem = ({ item }) => (
  //   <View style={styles.featuringItem}>
  //     <Image source={{ uri: item.image }} style={styles.featuringImage} />
  //     <Text style={styles.featuringTitle} numberOfLines={1}>
  //       {item.title}
  //     </Text>
  //   </View>
  // );

  const renderPlaylistItem = ({ item }) => (
    <View style={styles.playlistItem}>
      <Image source={{ uri: item.image }} style={styles.playlistImage} />
      <Text style={styles.playlistTitle} numberOfLines={2} ellipsizeMode="tail">
        {item.name}
      </Text>
    </View>
  );

  const renderFansItem = ({ item }) => (
    <TouchableOpacity style={styles.fansItem}
      onPress={() => handleItemPress(item)}>
      <Image source={{ uri: item.avatar }} style={styles.fansImage} />
      <Text style={styles.fansName} numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.navBar, { backgroundColor: navBarBackgroundColor }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Animated.Text style={[styles.artistNameSmall, { opacity: smallTitleOpacity }]}>
          {artist.name}
        </Animated.Text>
      </Animated.View>

      <FlatList
        data={tracks}
        renderItem={renderSongItem}
        keyExtractor={(item, index) => `${item.id}_${item.track_id}_${index}`}
        contentContainerStyle={styles.songList}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
      />

      <View style={{ height: 200 }}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#121212",
    // paddingBottom: 200,
  },
  navBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    verticalAlign: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  backButton: {
    marginRight: 10,
  },
  artistNameSmall: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  headerContainer: {
    width: "100%",
    overflow: "hidden",
  },
  headerBackground: {
    width: SCREEN_WIDTH,
    height: "100%",
    justifyContent: "flex-end",
    paddingBottom: 20,
    paddingHorizontal: 20,
    resizeMode: "contain",
  },
  artistNameLarge: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
  },
  listeners: {
    paddingHorizontal: 15,
    fontSize: 14,
    color: "#b3b3b3",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  songList: {},
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  songIndex: {
    width: 30,
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    // fontWeight: "bold",
    color: "#fff",
  },
  songPlays: {
    fontSize: 14,
    color: "#b3b3b3",
  },
  releaseItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  releaseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  releaseInfo: {
    flex: 1,
  },
  releaseTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  releaseDetails: {
    fontSize: 14,
    color: "#b3b3b3",
  },
  discographyButton: {
    marginTop: 20,
    marginHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#333", // Màu nền của nút
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  discographyButtonText: {
    color: "#fff", // Màu chữ
    fontSize: 16,
    fontWeight: "bold",
  },
  // featuringList: {
  //   paddingHorizontal: 15,
  //   marginTop: 10,
  // },
  // featuringItem: {
  //   marginRight: 15,
  //   alignItems: "center",
  // },
  // featuringImage: {
  //   width: 120,
  //   height: 120,
  //   borderRadius: 8,
  //   marginBottom: 8,
  // },
  // featuringTitle: {
  //   fontSize: 14,
  //   color: "#fff",
  //   textAlign: "center",
  //   width: 120,
  // },
  aboutContainer: {
    flexDirection: "column", // Đặt nội dung theo chiều dọc
    justifyContent: "center",
    backgroundColor: "#1e1e1e", // Màu nền phụ khi ảnh không tải
    borderRadius: 8,
    marginHorizontal: 15,
    marginTop: 4,
    padding: 15,
    overflow: "hidden", // Đảm bảo ảnh nền bo góc
    height: 350,
  },
  verifiedIconContainer: {
    position: "absolute",
    top: 10, // Vị trí biểu tượng Verified trong nền
    left: 10,
    // backgroundColor: "rgba(0, 0, 0, 0.6)", // Nền đen trong suốt
    // borderRadius: 50,
    padding: 4,
    flexDirection: "row",
  },
  aboutContent: {
    // marginTop: 0, // Đẩy nội dung xuống để không bị chồng lên biểu tượng
    position: 'absolute',
    bottom: 30,
    left: 10,
  },
  // aboutListeners: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   color: "#fff",
  //   marginBottom: 10,
  // },
  boldText: {
    fontWeight: "bold", // In đậm phần số lượng
    color: "#fff", // Đảm bảo màu sắc nhất quán
    fontSize: 18,
  },
  aboutListeners: {
    fontSize: 12,
    color: "#fff", // Màu chữ còn lại
    marginBottom: 10,

  },
  aboutDescription: {
    fontSize: 18,
    color: "#fff",
  },
  playlistList: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  playlistItem: {
    marginRight: 15,
    width: 140, // Đảm bảo kích thước item cố định
  },
  playlistImage: {
    width: "100%",
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
  },
  playlistTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2,
    // height: 100,
    // alignItems: "center",
    textAlign: "center",
  },
  playlistSubtitle: {
    fontSize: 12,
    color: "#b3b3b3",
  },
  fansList: {
    paddingHorizontal: 15,
    marginTop: 10,
    paddingBottom: 200,
  },
  fansItem: {
    marginRight: 15,
    alignItems: "center",
    width: 120, // Đảm bảo kích thước cố định cho mỗi mục
  },
  fansImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Tạo hình ảnh tròn
    marginBottom: 8,
  },
  fansName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  
});

export default ArtistScreen;
