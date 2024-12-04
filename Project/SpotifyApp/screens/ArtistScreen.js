

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
  return Number(count).toLocaleString(); // Thêm dấu phẩy ngăn cách mỗi 3 chữ số
};


const popularReleasesData = [
  { id: "1", title: "Sign", releaseInfo: "Latest release • EP", image: "https://i.scdn.co/image/ab67616d0000b273334eb8d7beb80b5c1ca9db8f" },
  { id: "2", title: "残響散歌", releaseInfo: "2021 • Single", image: "https://i.scdn.co/image/ab67616d0000b273334eb8d7beb80b5c1ca9db8f" },
  { id: "3", title: "daydream", releaseInfo: "2016 • Album", image: "https://i.scdn.co/image/ab67616d0000b273334eb8d7beb80b5c1ca9db8f" },
  { id: "4", title: "Open a Door", releaseInfo: "2023 • Album", image: "https://i.scdn.co/image/ab67616d0000b273334eb8d7beb80b5c1ca9db8f" },
];

const featuringData = [
  { id: "1", title: "This Is Aimer", image: "https://i.scdn.co/image/ab67616d0000b273334eb8d7beb80b5c1ca9db8f" },
  { id: "2", title: "Aimer Radio", image: "https://i.scdn.co/image/ab67616d0000b273334eb8d7beb80b5c1ca9db8f" },
  { id: "3", title: "Anime One", image: "https://i.scdn.co/image/ab67616d0000b273334eb8d7beb80b5c1ca9db8f" },
];


const aboutData = {
  image: "https://i.scdn.co/image/ab67616d0000b273334eb8d7beb80b5c1ca9db8f", // Link đến ảnh nghệ sĩ
  verified: true,
  listeners: "3,310,930",
  description:
    "15歳の頃、歌唱による喉の酷使が原因で突如声が出なくなるアクシデントに見舞われるも、数年後には独特のハスキーで甘い歌声を得ることとなる。2011年にシングル「六等星の夜」でメジャーデビュー。\n代表曲「蝶々結び」などを収録した4thアルバム「daydream」を2016年9月にリリースし、iTunesアルバムチャート1位などを獲得した他、CDショップ大賞2017において準大賞も受賞。2019年には16枚目のシングル「I beg you  / 花びらたちのマーチ / Sailing」をリリースし、自身初のオリコン週間シングルランキング初登場1位を記録する。\n\nAt the age of 15, Aimer suddenly lost her voice due to overuse of her throat by singing, but a few years later she got a unique husky and sweet singing voice. In 2011, she made her major debut with single &#34;<a href=\"spotify:track:57hbqDXNpE9rMmYd2U9dUB\" data-name=\"六等星の夜\">六等星の夜</a> (Rokutosei no yoru)&#34;.\nIn September 2016, she released her 4th album &#34;<a href=\"spotify:album:0gTeVkaC6wyVZEXNQUA4gF\" data-name=\"daydream\">daydream</a>&#34; which includes her representative song &#34;Chouchou Musubi&#34;, and placed #1 on the iTunes album chart. In 2019, she released her 16th single &#34;<a href=\"spotify:album:2YLBHyegPO32zvOWFJzkLN\" data-name=\"I beg you / 花びらたちのマーチ / Sailing\">I beg you / 花びらたちのマーチ / Sailing</a>&#34; which ranked #1 in the weekly single Oricon chart for the first time in her career.  Her song ‘Zankyosanka’ for the worldwide popular anime “Demon Slayer: Kimetsu no Yaiba” as its season 2 opening theme became a global hit soon after release in 2021. She is coming out with mini album titled “Deep down” to celebrate her 10th anniversary since debut, and the album will include CHAINSAW MAN ending theme ‘Deep down’.", // Mô tả ngắn
};
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
  const [loading, setLoading] = useState(false); // Trạng thái tải
  // console.log("ArtistScreen:", route.params.currentSong.artistIds[0]);
  // console.log("ArtistScreen:", route.params.artistId);
  const artistId = route.params.artistId;
  // Sắp xếp danh sách theo số lượt nghe giảm dần
  useEffect(() => {
    // Dữ liệu JSON mẫu
    const fetchTracks = async () => {
        setLoading(true);
        try {
            // Thay bằng fetch hoặc axios nếu bạn lấy dữ liệu từ API
            const data = await fetch('http://192.168.105.35:3000/artist/toptrack/0bAsR2unSRpn6BQPEnNlZm').then(res => res.json());
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
}, []);
  // console.log("ArtistScreen:", tracks);

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
    // Xử lý khi người dùng nhấn nút (ví dụ: điều hướng đến màn hình khác)
    console.log("See discography pressed");
    // navigation.navigate("DiscographyScreen"); // Nếu có màn hình mới
  };
  
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
            Aimer
          </Animated.Text>
        </AnimatedImageBackground>
      </Animated.View>
      <Text style={styles.listeners}>3.3M monthly listeners</Text>
      <Text style={styles.sectionTitle}>Popular</Text>      
    </View>
  );
  const ListFooter = () => (
    <View>
      <Text style={styles.sectionTitle}>Popular releases</Text>
      <FlatList
        data={popularReleasesData}
        renderItem={renderReleaseItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
      <TouchableOpacity style={styles.discographyButton} onPress={handleSeeDiscography}>
        <Text style={styles.discographyButtonText}>See discography</Text>
      </TouchableOpacity>
  
      <Text style={styles.sectionTitle}>Featuring Aimer</Text>
      <FlatList
        data={featuringData}
        renderItem={renderFeaturingItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuringList}
      />
  
      <Text style={styles.sectionTitle}>About</Text>
  
      {/* Sử dụng ImageBackground làm nền cho toàn bộ container */}
      <ImageBackground
        source={{ uri: aboutData.image }}
        style={styles.aboutContainer} // Đây sẽ là vùng chứa toàn bộ nội dung
        imageStyle={{ borderRadius: 8 }} // Bo góc cho ảnh nền
      >
        {/* Biểu tượng Verified */}
        {aboutData.verified && (
          <View style={styles.verifiedIconContainer}>
            <VerifiedIcon height={24} width={24} fill="#4cb3ff" />
            <Text style={{ color: "#fff", fontSize: 14, marginLeft: 10 }}>Verified artist</Text>
          </View>
        )}
  
        {/* Nội dung bên trong */}
        <View style={styles.aboutContent}>
        <Text style={styles.aboutListeners}>
          <Text style={styles.boldText}>{aboutData.listeners}</Text> MONTHLY LISTENERS
        </Text>
          <Text style={styles.aboutDescription} numberOfLines={3} ellipsizeMode="tail">
            {aboutData.description}
          </Text>
        </View>
      </ImageBackground>
      <Text style={styles.sectionTitle}>Artist Playlists</Text>
        <FlatList
          data={artistPlaylistsData}
          renderItem={renderPlaylistItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.playlistList}
        />
      <Text style={styles.sectionTitle}>Fans also like</Text>
        <FlatList
          data={fansAlsoLikeData}
          renderItem={renderFansItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.fansList}
        />
    </View>
  );
  
  // console.log(tracks)
  const renderReleaseItem = ({ item }) => (
    <View style={styles.releaseItem}>
      <Image source={{ uri: item.image }} style={styles.releaseImage} />
      <View style={styles.releaseInfo}>
        <Text style={styles.releaseTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.releaseDetails}>{item.releaseInfo}</Text>
      </View>
    </View>
  );
  const renderFeaturingItem = ({ item }) => (
    <View style={styles.featuringItem}>
      <Image source={{ uri: item.image }} style={styles.featuringImage} />
      <Text style={styles.featuringTitle} numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  );
  const renderPlaylistItem = ({ item }) => (
    <View style={styles.playlistItem}>
      <Image source={{ uri: item.image }} style={styles.playlistImage} />
      <Text style={styles.playlistTitle} numberOfLines={2} ellipsizeMode="tail">
        {item.title}
      </Text>
    </View>
  );
  const renderFansItem = ({ item }) => (
    <View style={styles.fansItem}>
      <Image source={{ uri: item.image }} style={styles.fansImage} />
      <Text style={styles.fansName} numberOfLines={1}>
        {item.name}
      </Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.navBar, { backgroundColor: navBarBackgroundColor }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Animated.Text style={[styles.artistNameSmall, { opacity: smallTitleOpacity }]}>
          Aimer
        </Animated.Text>
      </Animated.View>

    <FlatList
    data={tracks}
    renderItem={renderSongItem}
    keyExtractor={(item, index) => `${item.id}_${item.track_id}_${index}`} // Tạo key duy nhất
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
    width: 60,
    height: 60,
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
  featuringList: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  featuringItem: {
    marginRight: 15,
    alignItems: "center",
  },
  featuringImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  featuringTitle: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    width: 120,
  },
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
