
import React, { useRef, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Animated, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const SearchScreen = ({ route }) => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { user } = route.params || {};

  // Dữ liệu browseItems được memo hóa để tránh tạo lại mỗi khi component render
  const browseItems = useMemo(() => [
    { id: '1', name: 'Music', color: 'rgb(220,20, 140)', image: { uri: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb' } },
    { id: '2', name: 'Podcasts', color: 'rgb(0, 100, 80)', image: { uri: 'https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa' } },
    { id: '3', name: 'Live Events', color: 'rgb(132, 0,231)', image: { uri: 'https://concerts.spotifycdn.com/images/live-events_category-image.jpg' } },
    { id: '4', name: '2024 in Music', color: 'rbg(20, 138, 8)', image: { uri: 'https://i.scdn.co/image/ab67fb8200005caf3a376f97c4510dd35ef8118b' } },
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
    bottom: -8,
    right: -20,
    width: 70,
    height: 70,
    transform: [{ rotate: '30deg' }],
    resizeMode: 'contain',
    opacity: 0.8,
    borderRadius: 5,
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
