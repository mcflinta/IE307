

import React, { useState } from "react";
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

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

const SCREEN_WIDTH = Dimensions.get("window").width;

const data = [
  { id: "1", title: "残響散歌", plays: "252,370,429", image: "https://link-to-image1.com" },
  { id: "2", title: "カタオモイ", plays: "124,950,576", image: "https://link-to-image2.com" },
  { id: "3", title: "Brave Shine", plays: "78,391,121", image: "https://link-to-image3.com" },
];

const ArtistScreen = () => {
  const [scrollY] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  // Sắp xếp danh sách theo số lượt nghe giảm dần
  const sortedData = data.sort(
    (a, b) => parseInt(b.plays.replace(/,/g, "")) - parseInt(a.plays.replace(/,/g, ""))
  );

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

  const renderSongItem = ({ item, index }) => (
    <View style={styles.songItem}>
      <Text style={styles.songIndex}>{index + 1}</Text>
      <Image source={{ uri: item.image }} style={styles.songImage} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.songPlays}>{item.plays} plays</Text>
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
        data={sortedData}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.songList}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        ListHeaderComponent={ListHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
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
});

export default ArtistScreen;
