// // import React, { useState, useEffect } from 'react';
// // import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
// // import debounce from 'lodash.debounce';
// // import { API_BASE_URL } from '../config/config';
// // export default function SearchDetailScreen({ route }) {
// //   const [searchText, setSearchText] = useState('');
// //   const [results, setResults] = useState([]);

// //   // Hàm gửi request tìm kiếm
// //   const fetchSearchResults = async (query) => {
// //     if (!query.trim()) return;
// //     try {
// //       console.log(`Fetching results for: ${query}`);
// //       const response = await fetch(`${API_BASE_URL}/search?query=${query}`);
// //       console.log(response)
// //       const data = await response.json();
// //       setResults(data);
// //     } catch (error) {
// //       console.error('Error fetching search results:', error);
// //     }
// //   };

// //   // Debounce để tránh gọi API liên tục
// //   const debouncedFetchResults = debounce(fetchSearchResults, 500);

// //   useEffect(() => {
// //     debouncedFetchResults(searchText);
// //     return () => debouncedFetchResults.cancel();
// //   }, [searchText]);

// //   return (
// //     <View style={styles.container}>
// //       <FlatList
// //         data={results}
// //         keyExtractor={(item) => item.track_id}
// //         renderItem={({ item }) => (
// //           <View style={styles.resultItem}>
// //             <Image source={{ uri: item.albumImage }} style={styles.albumImage} />
// //             <View>
// //               <Text style={styles.trackName}>{item.track_name}</Text>
// //               <Text style={styles.artistName}>{item.artistName}</Text>
// //             </View>
// //           </View>
// //         )}
// //         ListEmptyComponent={() => (
// //           <Text style={styles.noResultsText}>No results found</Text>
// //         )}
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#121212',
// //     padding: 10,
// //   },
// //   resultItem: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 10,
// //   },
// //   albumImage: {
// //     width: 50,
// //     height: 50,
// //     marginRight: 10,
// //     borderRadius: 5,
// //   },
// //   trackName: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   artistName: {
// //     color: '#aaa',
// //     fontSize: 14,
// //   },
// //   noResultsText: {
// //     color: '#aaa',
// //     fontSize: 16,
// //     textAlign: 'center',
// //     marginTop: 20,
// //   },
// // });

// // screens/SearchDetailScreen.js
// // import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
// // import { View, FlatList, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
// // import debounce from 'lodash.debounce';
// // import { API_BASE_URL } from '../config/config';
// // import { useNavigation, useRoute } from '@react-navigation/native';
// // import SearchHeader from '../components/SearchHeader';
// // import { Ionicons } from '@expo/vector-icons'; // Thư viện icon phổ biến

// // const SearchDetailScreen = () => {
// //   const navigation = useNavigation();
// //   const route = useRoute();
// //   const { initialQuery = '', user } = route.params || {};

// //   const [searchText, setSearchText] = useState(initialQuery);
// //   const [results, setResults] = useState([]);
// //   const [history, setHistory] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   // Hàm xóa item khỏi lịch sử
// //   const handleRemove = async (item) => {
// //     // Cập nhật UI ngay lập tức
// //     setHistory((prevHistory) =>
// //       prevHistory.filter((historyItem) => historyItem.track_id !== item.track_id)
// //     );

// //     try {
// //       // Gọi API xóa trên server
// //       const response = await fetch(`${API_BASE_URL}/search/history`, {
// //         method: 'DELETE',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           userId: user.id,
// //           trackId: item.track_id,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         console.error('Failed to delete history:', data.message);
// //         // Khôi phục item nếu API lỗi
// //         setHistory((prevHistory) => [...prevHistory, item]);
// //       } else {
// //         console.log('History deleted successfully:', data.message);
// //       }
// //     } catch (error) {
// //       console.error('Error deleting search history:', error);
// //       // Khôi phục item nếu xảy ra lỗi
// //       setHistory((prevHistory) => [...prevHistory, item]);
// //     }
// //   };

// //   // Hàm gửi request tìm kiếm
// //   const fetchSearchResults = useCallback(
// //     async (query) => {
// //       const trimmedQuery = query.trim();
// //       if (!trimmedQuery) return;

// //       try {
// //         setLoading(true);
// //         const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(trimmedQuery)}`);
// //         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //         const data = await response.json();
// //         setResults(data);
// //       } catch (error) {
// //         console.error('Error fetching search results:', error);
// //         setResults([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     },
// //     []
// //   );

// //   // Hàm lấy lịch sử tìm kiếm
// //   const fetchSearchHistory = useCallback(async () => {
// //     if (!user || !user.id) {
// //       console.error('User ID is missing. Cannot fetch search history.');
// //       setHistory([]);
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       const response = await fetch(`${API_BASE_URL}/search/history?userId=${user.id}`);
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const data = await response.json();

// //       // Định dạng dữ liệu phù hợp với FlatList
// //       const formattedHistory = data.history.map((item) => ({
// //         track_id: item.trackId,
// //         track_name: item.trackName,
// //         artistName: item.artistName,
// //         albumImage: item.albumImage,
// //       }));

// //       setHistory(formattedHistory);
// //     } catch (error) {
// //       console.error('Error fetching search history:', error);
// //       setHistory([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [user]);

// //   // Hàm lưu lịch sử tìm kiếm
// //   const saveSearchHistory = useCallback(
// //     async (item) => {
// //       if (!user || !user.id) {
// //         console.error('User ID is missing. Cannot save search history.');
// //         return;
// //       }
// //       try {
// //         await fetch(`${API_BASE_URL}/search/history`, {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({
// //             userId: user.id,
// //             trackId: item.track_id,
// //             trackName: item.track_name,
// //             artistName: item.artistName,
// //             albumImage: item.albumImage,
// //           }),
// //         });
// //       } catch (error) {
// //         console.error('Error saving search history:', error);
// //       }
// //     },
// //     [user]
// //   );

// //   // Debounce hàm tìm kiếm
// //   const debouncedFetchResults = useCallback(debounce(fetchSearchResults, 500), [fetchSearchResults]);

// //   useEffect(() => {
// //     if (searchText.trim() === '') {
// //       fetchSearchHistory(); // Gọi API lấy lịch sử khi searchText rỗng
// //     } else {
// //       debouncedFetchResults(searchText); // Gọi API tìm kiếm khi có từ khóa
// //     }
// //     return () => debouncedFetchResults.cancel();
// //   }, [searchText, debouncedFetchResults, fetchSearchHistory]);

// //   // Cập nhật header với SearchHeader
// //   useLayoutEffect(() => {
// //     navigation.setOptions({
// //       headerTitle: () => <SearchHeader onSearch={setSearchText} initialValue={searchText} />,
// //       headerStyle: { backgroundColor: '#121212' },
// //       headerTintColor: '#fff',
// //     });
// //   }, [navigation, searchText]);

// //   // Hàm xử lý khi nhấn vào một mục
// //   const handleItemPress = useCallback(
// //     (item) => {
// //       saveSearchHistory(item); // Lưu lịch sử
// //       navigation.navigate('SongDetailScreen', { songId: item.track_id }); // Chuyển trang chi tiết bài hát
// //     },
// //     [saveSearchHistory, navigation]
// //   );

// //   // Hàm render cho FlatList
// //   const renderItem = useCallback(
// //     ({ item }) => (
// //       <View style={styles.resultItem}>
// //         <Image source={{ uri: item.albumImage }} style={styles.albumImage} />
// //         <View style={styles.trackInfo}>
// //           <Text style={styles.trackName}>{item.track_name}</Text>
// //           <Text style={styles.artistName}>{item.artistName}</Text>
// //         </View>
// //         <TouchableOpacity onPress={() => handleRemove(item)}>
// //           <Ionicons name="close-outline" size={24} color="grey" />
// //         </TouchableOpacity>
// //       </View>
// //     ),
// //     [handleRemove]
// //   );

// //   const keyExtractor = useCallback((item) => item.track_id.toString(), []);

// //   // Dữ liệu hiển thị: lịch sử hoặc kết quả tìm kiếm
// //   const dataToDisplay = searchText.trim() === '' ? history : results;

// //   return (
// //     <View style={styles.container}>
// //       {loading && <ActivityIndicator size="large" color="#1DB954" style={styles.loadingIndicator} />}
// //       <FlatList
// //         data={dataToDisplay}
// //         keyExtractor={keyExtractor}
// //         renderItem={renderItem}
// //         ListEmptyComponent={!loading && <Text style={styles.noResultsText}>No results found</Text>}
// //         contentContainerStyle={
// //           dataToDisplay.length === 0 && !loading ? styles.emptyContainer : null
// //         }
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#121212',
// //     padding: 10,
// //   },
// //   resultItem: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 10,
// //     padding: 10,
// //     backgroundColor: 'transparent',
// //     borderRadius: 8,
// //   },
// //   albumImage: {
// //     width: 50,
// //     height: 50,
// //     marginRight: 10,
// //     borderRadius: 5,
// //   },
// //   trackInfo: {
// //     flex: 1,
// //   },
// //   trackName: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   artistName: {
// //     color: '#aaa',
// //     fontSize: 14,
// //   },
// //   noResultsText: {
// //     color: '#aaa',
// //     fontSize: 16,
// //     textAlign: 'center',
// //     marginTop: 20,
// //   },
// //   loadingIndicator: {
// //     marginTop: 20,
// //   },
// //   emptyContainer: {
// //     flexGrow: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// // });

// // export default React.memo(SearchDetailScreen);

// // screens/SearchDetailScreen.js
import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, FlatList, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import debounce from 'lodash.debounce';
import { API_BASE_URL } from '../config/config';
import { useNavigation, useRoute } from '@react-navigation/native';
import SearchHeader from '../components/SearchHeader';
import { Ionicons } from '@expo/vector-icons';

const SearchDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { initialQuery = '', user } = route.params || {};

  const [searchText, setSearchText] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hàm xóa lịch sử tìm kiếm
  const handleRemoveHistory = async (item) => {
    setHistory((prevHistory) => prevHistory.filter((historyItem) => historyItem.track_id !== item.track_id));
    try {
      const response = await fetch(`${API_BASE_URL}/search/history`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          trackId: item.track_id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Failed to delete history:', data.message);
        setHistory((prevHistory) => [...prevHistory, item]);
      }
    } catch (error) {
      console.error('Error deleting search history:', error);
      setHistory((prevHistory) => [...prevHistory, item]);
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

    // Chuyển đổi data.history sang định dạng tương thích với FlatList
    const formattedHistory = data.history.map(item => ({
      track_id: item.trackId, // đảm bảo key phù hợp với renderItem
      track_name: item.trackName,
      artistName: item.artistName,
      albumImage: item.albumImage,
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
      setResults([]); // Reset kết quả tìm kiếm
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

  const renderSearchItem = useCallback(({ item }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => handleItemPress(item)}>
      <Image source={{ uri: item.albumImage }} style={styles.albumImage} />
      <View style={styles.trackInfo}>
        <Text style={styles.trackName}>{item.track_name}</Text>
        <Text style={styles.artistName}>{item.artistName}</Text>
      </View>
    </TouchableOpacity>
  ), [handleItemPress]);
  
  const renderHistoryItem = useCallback(({ item }) => (
    <View style={styles.resultItem}>
      <Image source={{ uri: item.albumImage }} style={styles.albumImage} />
      <View style={styles.trackInfo}>
        <Text style={styles.trackName}>{item.track_name}</Text>
        <Text style={styles.artistName}>{item.artistName}</Text>
      </View>
      <TouchableOpacity onPress={() => handleRemoveHistory(item)}>
        <Ionicons name="close-outline" size={24} color="grey" />
      </TouchableOpacity>
    </View>
  ), [handleRemoveHistory]);
  
 // Hàm lưu lịch sử tìm kiếm
 const saveSearchHistory = useCallback(async (item) => {
  if (!user || !user.id) {
    console.error('User ID is missing. Cannot save search history.');
    return;
  }

  // Kiểm tra dữ liệu item
  if (!item.track_id || !item.track_name || !item.artistName || !item.albumImage) {
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
        trackId: item.track_id,
        trackName: item.track_name,
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

    // Cập nhật state `history` để hiển thị ngay lập tức
    setHistory((prevHistory) => {
      // Kiểm tra nếu item đã tồn tại trong `history`
      const isItemExists = prevHistory.some((historyItem) => historyItem.track_id === item.track_id);

      // Nếu item chưa tồn tại, thêm vào `history`
      if (!isItemExists) {
        return [...prevHistory, item];
      }

      return prevHistory;
    });
  } catch (error) {
    console.error('Error saving search history:', error);
  }
}, [user]);

  
  const handleItemPress = useCallback((item) => {
    // Lưu mục tìm kiếm vào lịch sử
    saveSearchHistory(item);
    // Điều hướng hoặc thực hiện hành động khác nếu cần
    // Ví dụ: chuyển sang trang chi tiết bài hát
    navigation.navigate('SongDetailScreen', { songId: item.track_id });
  }, [saveSearchHistory, navigation]);


  const keyExtractor = (item) => item.track_id.toString();

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#1DB954" style={styles.loadingIndicator} />}
      
      {/* FlatList Hiển thị Lịch sử Tìm kiếm */}
      {searchText.trim() === '' && (
        <FlatList
          data={history}
          keyExtractor={keyExtractor}
          renderItem={renderHistoryItem}
          ListEmptyComponent={<Text style={styles.noResultsText}>No search history found</Text>}
          contentContainerStyle={history.length === 0 ? styles.emptyContainer : null}
        />
      )}

      {/* FlatList Hiển thị Kết quả Tìm kiếm */}
      {searchText.trim() !== '' && (
        <FlatList
          data={results}
          keyExtractor={keyExtractor}
          renderItem={renderSearchItem}
          ListEmptyComponent={<Text style={styles.noResultsText}>No results found</Text>}
          contentContainerStyle={results.length === 0 ? styles.emptyContainer : null}
        />
      )}
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


// import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
// import { View, FlatList, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
// import debounce from 'lodash.debounce';
// import { API_BASE_URL } from '../config/config';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import SearchHeader from '../components/SearchHeader';
// import { Ionicons } from '@expo/vector-icons'; // Thư viện icon phổ biến
// const SearchDetailScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { initialQuery = '', user } = route.params || {};
// //   console.log(route.params)
//   const [searchText, setSearchText] = useState(initialQuery);
//   const [results, setResults] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
// //   console.log(user)
//   const handleRemove = async (id) => {
//     try {
//     //   console.log(id.track_id);
//       const response = await fetch(`${API_BASE_URL}/search/history`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId: user.id, // Thay bằng userId thực tế
//           trackId: id.track_id,           // Truyền trackId của item cần xóa
//         }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         console.log('History deleted:', data.message);
//         // Cập nhật state để xóa item khỏi FlatList
//         setHistory((prevData) => prevData.filter((item) => item.id !== id));
//       } else {
//         console.error('Failed to delete history:', data.message);
//       }
//     } catch (error) {
//       console.error('Error deleting search history:', error);
//     }
//   };
//   // Hàm gửi request tìm kiếm được memoized
//   const fetchSearchResults = useCallback(async (query) => {
//     const trimmedQuery = query.trim();
//     if (!trimmedQuery) {
//       // Nếu không có từ khóa, không thực hiện tìm kiếm
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(trimmedQuery)}`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setResults(data);
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Hàm lấy lịch sử tìm kiếm
  // const fetchSearchHistory = useCallback(async () => {
  //   if (!user || !user.id) {
  //     console.error('User ID is missing. Cannot fetch search history.');
  //     setHistory([]);
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const response = await fetch(`${API_BASE_URL}/search/history?userId=${user.id}`);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  
  //     // Chuyển đổi data.history sang định dạng tương thích với FlatList
  //     const formattedHistory = data.history.map(item => ({
  //       track_id: item.trackId, // đảm bảo key phù hợp với renderItem
  //       track_name: item.trackName,
  //       artistName: item.artistName,
  //       albumImage: item.albumImage,
  //     }));
  
  //     setHistory(formattedHistory);
  //   } catch (error) {
  //     console.error('Error fetching search history:', error);
  //     setHistory([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [user]);

//   // Hàm lưu lịch sử tìm kiếm
//   const saveSearchHistory = useCallback(async (item) => {
//     if (!user || !user.id) {
//       console.error('User ID is missing. Cannot save search history.');
//       return;
//     }
//     try {
//       await fetch(`${API_BASE_URL}/search/history`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId: user.id,
//           trackId: item.track_id,
//           trackName: item.track_name,
//           artistName: item.artistName,
//           albumImage: item.albumImage,
//         }),
//       });
//     } catch (error) {
//       console.error('Error saving search history:', error);
//     }
//   }, [user]);

//   // Debounced phiên bản của hàm tìm kiếm
//   const debouncedFetchResults = useCallback(debounce(fetchSearchResults, 500), [fetchSearchResults]);

//   useEffect(() => {
//     if (searchText.trim() === '') {
//       // Gọi API lấy lịch sử tìm kiếm khi searchText trống
//       fetchSearchHistory();
//     } else {
//       // Gọi API tìm kiếm khi searchText có nội dung
//       debouncedFetchResults(searchText);
//     }
//     return () => debouncedFetchResults.cancel();
//   }, [searchText, debouncedFetchResults, fetchSearchHistory]);
  

//   // Cập nhật header với SearchHeader component
//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTitle: () => <SearchHeader onSearch={setSearchText} initialValue={searchText} />,
//       headerStyle: { backgroundColor: '#121212' },
//       headerTintColor: '#fff',
//     });
//   }, [navigation, searchText]);

//   // Hàm xử lý khi người dùng chạm vào một mục
  // const handleItemPress = useCallback((item) => {
  //   // Lưu mục tìm kiếm vào lịch sử
  //   saveSearchHistory(item);
  //   // Điều hướng hoặc thực hiện hành động khác nếu cần
  //   // Ví dụ: chuyển sang trang chi tiết bài hát
  //   navigation.navigate('SongDetailScreen', { songId: item.track_id });
  // }, [saveSearchHistory, navigation]);

//   // Hàm render cho FlatList
//   const renderItem = useCallback(({ item }) => (
//     <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.resultItem}>
//       <Image source={{ uri: item.albumImage }} style={styles.albumImage} />
//       <View style={styles.trackInfo}>
//         <Text style={styles.trackName}>{item.track_name}</Text>
//         <Text style={styles.artistName}>{item.artistName}</Text>
//       </View>
//       <TouchableOpacity onPress={() => handleRemove(item)}>
//         <Ionicons name="close-outline" size={24} color="grey" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   ), [handleItemPress]);

//   const keyExtractor = useCallback((item) => item.track_id.toString(), []);

//   // Dữ liệu để hiển thị trong FlatList
//   const dataToDisplay = searchText.trim() === '' ? history : results;

//   return (
//       <View style={styles.container}>
//       {loading && <ActivityIndicator size="large" color="#1DB954" style={styles.loadingIndicator} />}
//       <FlatList
//         data={dataToDisplay}
//         keyExtractor={keyExtractor}
//         renderItem={renderItem}
//         ListEmptyComponent={!loading && <Text style={styles.noResultsText}>No results found</Text>}
//         contentContainerStyle={dataToDisplay.length === 0 && !loading ? styles.emptyContainer : null}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     padding: 10,
//   },
//   resultItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     backgroundColor: 'transparent',
//     padding: 10,
//     borderRadius: 8,
//   },
//   albumImage: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//     borderRadius: 5,
//   },
//   trackInfo: {
//     flex: 1,
//   },
//   trackName: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   artistName: {
//     color: '#aaa',
//     fontSize: 14,
//   },
//   noResultsText: {
//     color: '#aaa',
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   loadingIndicator: {
//     marginTop: 20,
//   },
//   emptyContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default React.memo(SearchDetailScreen);