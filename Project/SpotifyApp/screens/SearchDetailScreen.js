import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, FlatList, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import debounce from 'lodash.debounce';
import { API_BASE_URL } from '../config/config';
import { useNavigation, useRoute } from '@react-navigation/native';
import SearchHeader from '../components/SearchHeader';
import { Ionicons } from '@expo/vector-icons';
import MusicPlayerService from '../services/MusicPlayerService';
const SearchDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { initialQuery = '', user } = route.params || {};
  const [searchText, setSearchText] = useState(initialQuery);
  // console.log(user)
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hàm xóa lịch sử tìm kiếm
  const handleRemoveHistory = async (item) => {
    const originalHistory = [...history];

    setHistory((prevHistory) => prevHistory.filter((historyItem) => {
      if (historyItem.Type === 'Song') {
        return historyItem.trackId !== item.trackId;
      } else if (historyItem.Type === 'Album') {
        return historyItem.albumId !== item.albumId;
      } else if (historyItem.Type === 'Artist') {
        return historyItem.artistId !== item.artistId;
      }
      return true;
    }));

    try {
      const response = await fetch(`${API_BASE_URL}/search/history`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          Type: item.Type,
          ...(item.Type === 'Song' ? { trackId: item.trackId } :
             item.Type === 'Album' ? { albumId: item.albumId } :
             { artistId: item.artistId }),
        }),
      });

      const data = await response.json();
      // console.log(data)
      if (!response.ok) {
        console.error('Failed to delete history:', data.message);
        // Khôi phục lại dữ liệu cũ nếu xóa thất bại
        setHistory(originalHistory);
      }
    } catch (error) {
      console.error('Error deleting search history:', error);
      // Khôi phục lại dữ liệu cũ nếu xảy ra lỗi
      setHistory(originalHistory);
    }
  };

  // Hàm lấy kết quả tìm kiếm
  const fetchSearchResults = useCallback(
    async (query) => {
      const trimmedQuery = query.trim();
      if (!trimmedQuery) return;

      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(trimmedQuery)}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        // console.log(data)
        setResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Hàm lấy lịch sử tìm kiếm
  const fetchSearchHistory = useCallback(async () => {
    if (!user || !user.id) {
      console.error('User ID is missing. Cannot fetch search history.');
      setHistory([]);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/search/history?userId=${user.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data.history);

      // Chuyển đổi data.history sang định dạng tương thích
      const formattedHistory = data.history.map(item => ({
        Type: item.Type,
        artistName: item.artistName,
        albumImage: item.albumImage,
        ...(item.Type === 'Song' ? {
          trackId: item.trackId,
          trackName: item.trackName,
          uri: item.uri,
          colorDark: item.colorDark,
          colorLight: item.colorLight,
          albumID: item.albumID,
          artistID: item.artistID,
          artistImageUrl: item.artistImageUrl,
          albumVideo: item.albumVideo
          // track
        } : item.Type === 'Album' ? {
          albumId: item.albumId,
          albumName: item.albumName,
          artistID: item.artistID,
        } : item.Type === 'Artist' ? {
          artistId: item.artistId,
          artistName: item.artistName,
        } : {}),
      }));

      setHistory(formattedHistory);
    } catch (error) {
      console.error('Error fetching search history:', error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const debouncedFetchResults = useCallback(debounce(fetchSearchResults, 500), [fetchSearchResults]);

  useEffect(() => {
    if (searchText.trim() === '') {
      fetchSearchHistory();
      setResults([]); 
    } else {
      debouncedFetchResults(searchText);
    }
    return () => debouncedFetchResults.cancel();
  }, [searchText, debouncedFetchResults, fetchSearchHistory]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <SearchHeader onSearch={setSearchText} initialValue={searchText} />,
      headerStyle: { backgroundColor: '#121212' },
      headerTintColor: '#fff',
    });
  }, [navigation, searchText]);
  const handleAlbumPress = useCallback(async (item) => {
    setLoading(true);
    try {
      // console.log(item)
      const response = await fetch(`${API_BASE_URL}/search/album/${item.artistID}/${item.albumId}`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
  
      const albumData = await response.json();
  
      navigation.navigate('HomeTabs', {
        screen: 'HomeStack',              // Navigator con// Điều hướng đến HomeStack
        params: {
          screen: 'AlbumTrackDetailScreen', // Màn hình con trong HomeStack
          params: {
            albumName: albumData.albumName,
            artistName: albumData.artistName,
            tracks: albumData.tracks,
            albumImage: albumData.albumImage,
            artistImageUrl: albumData.artistImageUrl || null,
            releaseYear: albumData.releaseYear,
            fullReleaseDate: albumData.fullReleaseDate,
            totalTracks: albumData.totalTracks,
            totalDuration: albumData.totalDuration,
            colorDark: albumData.colorDark,
            albumType: albumData.albumType,
            moreAlbumsByArtist: albumData.moreAlbumsByArtist,
            copyright: albumData.copyright,
          },
        }

      });
    } catch (err) {
      console.error('Error fetching album details:', err);
      Alert.alert('Error', 'Unable to fetch album details. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [navigation]);
  const handleItemPress = useCallback(
    async (item) => {
      // Lưu mục tìm kiếm vào lịch sử
      saveSearchHistory(item);
      // // console.log("Results:",results)
      // if (!Array.isArray(item))
      // {
      //   results = results.history;
      // }
      // console.log

      // console.log(results)
      if (item.Type === 'Song') {
        // Tải và phát bài hát
        const songIndex = results.findIndex(track => track.trackId === item.trackId);
        // console.log(results)

        // console.log(songIndex)
        // console.log("Seachresults)
        if (songIndex !== -1) {
          await MusicPlayerService.loadAndPlaySong(results, songIndex);
        } else {
          console.error('Song not found in results.');
        }
      }
      else if (item.Type === 'Album') {
        // console.log(item.artistID)
        // navigation.navigate('HomeStack', {
        //   screen: 'AlbumDetailScreen', // Điều hướng tới PlaylistDetailScreen
        //   params: { albumId: item.albumId }, // Truyền albumId dưới dạng tham số
        // });
        handleAlbumPress(item)
      } else if (item.Type === 'Artist') {
        navigation.navigate('HomeStack', {
          screen: 'ArtistScreen',
          params: {
            artistId: item.artistId,
          }
        });
      }
    },
    [navigation, results, saveSearchHistory]
  );

  const renderSearchItem = useCallback(({ item }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => handleItemPress(item)}>
      <Image 
        source={{ uri: item.albumImage }} 
        style={[
          styles.albumImage, 
          item.Type === 'Artist' ? styles.artistImage : null
        ]} 
      />
      <View style={styles.trackInfo}>
        <Text style={styles.trackName}>
          {item.Type === 'Song' ? item.trackName :
           item.Type === 'Album' ? item.albumName :
           item.Type === 'Artist' ? item.artistName : 'Unknown'}
        </Text>
        {item.Type === 'Album' && (
          <Text style={styles.artistName}>{`${item.albumType || 'Unknown'} * ${item.artistName}`}</Text>
        )}
        {item.Type === 'Song' && (
          <Text style={styles.artistName}>{`${item.Type || 'Unknown'} * ${item.artistName}`}</Text>
        )}
        {item.Type === 'Artist' && (
          <Text style={styles.typeOnly}>{item.Type}</Text>
        )}
      </View>
      {/* {item.Type === 'Song' && (
        <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.playButton}>
          <FontAwesome name="play" size={20} color="#1DB954" />
        </TouchableOpacity>
      )} */}
    </TouchableOpacity>
  ), [handleItemPress]);

  const renderHistoryItem = useCallback(({ item }) => (
    <TouchableOpacity 
      style={styles.resultItem} 
      onPress={() => handleItemPress(item)}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: item.albumImage }} 
        style={[
          styles.albumImage, 
          item.Type === 'Artist' ? styles.artistImage : null
        ]} 
      />
      <View style={styles.trackInfo}>
        <Text style={styles.trackName}>
          {item.Type === 'Song' ? item.trackName :
           item.Type === 'Album' ? item.albumName :
           item.Type === 'Artist' ? item.artistName : 'Unknown'}
        </Text>
        {item.Type !== 'Artist' && (
          <Text style={styles.artistName}>{`${item.Type || 'Unknown'} * ${item.artistName}`}</Text>
        )}
        {item.Type === 'Artist' && (
          <Text style={styles.typeOnly}>{item.Type}</Text>
        )}
      </View>
      {/* Nút xóa lịch sử */}
      <TouchableOpacity 
        onPress={(e) => {
          e.stopPropagation(); // Ngăn sự kiện lan truyền lên TouchableOpacity cha
          handleRemoveHistory(item);
        }}
        style={styles.deleteButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Tăng vùng nhấn để dễ dàng hơn
      >
        <Ionicons name="close-outline" size={24} color="grey" />
      </TouchableOpacity>
    </TouchableOpacity>
  ), [handleItemPress, handleRemoveHistory]);
  // Hàm lưu lịch sử tìm kiếm
  const saveSearchHistory = useCallback(async (item) => {
    if (!user || !user.id) {
      console.error('User ID is missing. Cannot save search history.');
      return;
    }

    // Kiểm tra dữ liệu item
    const isValidData = (
      (item.Type === 'Song' && item.trackId && item.trackName && item.artistName && item.albumImage) ||
      (item.Type === 'Album' && item.albumId && item.albumName && item.artistName && item.albumImage) ||
      (item.Type === 'Artist' && item.artistId && item.artistName && item.albumImage)
    );

    if (!isValidData) {
      console.error('Invalid item data. Cannot save to search history.', item);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/search/history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          Type: item.Type,
          ...(item.Type === 'Song' ? {
            trackId: item.trackId,
            trackName: item.trackName,
            uri: item.uri,
            colorDark: item.colorDark,
            colorLight: item.colorLight,
            albumID: item.albumID,
            albumName: item.albumName,
            artistID: item.artistID,
            artistImageUrl: item.artistImageUrl,
            albumVideo: item.albumVideo
          } : item.Type === 'Album' ? {
            albumId: item.albumId,
            albumName: item.albumName,
            artistID: item.artistID
          } : item.Type === 'Artist' ? {
            artistId: item.artistId,
            artistName: item.artistName,
          } : {}),
          artistName: item.artistName,
          albumImage: item.albumImage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Failed to save search history:', data.message);
        return;
      }

      console.log('Search history saved successfully:', data);

      // Cập nhật state `history`
      setHistory((prevHistory) => {
        const isItemExists = prevHistory.some((historyItem) => {
          if (historyItem.Type === 'Song') {
            return historyItem.trackId === item.trackId;
          } else if (historyItem.Type === 'Album') {
            return historyItem.albumId === item.albumId;
          } else if (historyItem.Type === 'Artist') {
            return historyItem.artistId === item.artistId;
          }
          return false;
        });

        if (!isItemExists) {
          return [item, ...prevHistory];
        }

        return prevHistory;
      });
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  }, [user]);

  const keyExtractor = (item) => {
    if (item.Type === 'Song') {
      return `Song-${item.trackId}`;
    } else if (item.Type === 'Album') {
      return `Album-${item.albumId}`;
    } else if (item.Type === 'Artist') {
      return `Artist-${item.artistId}`;
    } else {
      return `Unknown-${Math.random()}`;
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#1DB954" style={styles.loadingIndicator} />}
      
      {searchText.trim() === '' && (
        <FlatList
          data={history}
          keyExtractor={keyExtractor}
          renderItem={renderHistoryItem}
          ListEmptyComponent={<Text style={styles.noResultsText}>No search history found</Text>}
          contentContainerStyle={history.length === 0 ? styles.emptyContainer : null}
        />
      )}

      {searchText.trim() !== '' && (
        <FlatList
          data={results}
          keyExtractor={keyExtractor}
          renderItem={renderSearchItem}
          ListEmptyComponent={<Text style={styles.noResultsText}>No results found</Text>}
          contentContainerStyle={results.length === 0 ? styles.emptyContainer : null}
        />
      )}

      {/* Thêm NowPlayingBar ở dưới cùng */}
      {/* <NowPlayingBar /> */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  albumImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  artistImage: {
    borderRadius: 25, // Để bo tròn hoàn toàn hình ảnh
  },
  trackInfo: {
    flex: 1,
  },
  trackName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#aaa',
    fontSize: 14,
  },
  typeOnly: {
    color: '#aaa',
    fontSize: 14,
  },
  noResultsText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(SearchDetailScreen);
