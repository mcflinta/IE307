// import React from 'react';
// import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

// const AlbumDetailsScreen = ({ route }) => {
//   const { albumName, artistName, tracks, albumImage } = route.params;

//   return (
//     <View style={styles.container}>
//       {/* Hình ảnh album */}
//       <Image source={{ uri: albumImage }} style={styles.albumImage} />

//       {/* Tên album */}
//       <Text style={styles.header}>{albumName}</Text>

//       {/* Tên nghệ sĩ */}
//       <Text style={styles.subHeader}>Artist: {artistName}</Text>

//       {/* Danh sách bài hát */}
//       <FlatList
//         data={tracks}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.trackItem}>
//             <Text style={styles.trackName}>{item.title}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#858583',
//   },
//   albumImage: {
//     width: 200, // Chiều rộng hình ảnh
//     height: 200, // Chiều cao hình ảnh
//     alignSelf: 'center', // Căn giữa hình ảnh
//     marginBottom: 16, // Khoảng cách dưới hình ảnh
//     borderRadius: 8, // Bo góc hình ảnh
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   subHeader: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 16,
//     color: '#555',
//   },
//   trackItem: {
//     padding: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   trackName: {
//     fontSize: 16,
//   },
// });

// export default AlbumDetailsScreen;


// import React from 'react';
// import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// const AlbumDetailsScreen = ({ route }) => {
//   const { albumName, artistName, tracks, albumImage } = route.params;

//   return (
//     <LinearGradient
//       colors={['#858583', '#1c1c1c']} // Gradient từ màu tối hơn đến nhạt hơn
//       style={styles.container}
//     >
//       {/* Hình ảnh album */}
//       <Image source={{ uri: albumImage }} style={styles.albumImage} />

//       {/* Tên album */}
//       <Text style={styles.header}>{albumName}</Text>

//       {/* Tên nghệ sĩ */}
//       <Text style={styles.subHeader}>Artist: {artistName}</Text>

//       {/* Danh sách bài hát */}
//       <FlatList
//         data={tracks}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.trackItem}>
//             <Text style={styles.trackName}>{item.title}</Text>
//           </View>
//         )}
//       />
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   albumImage: {
//     width: 300, // Chiều rộng hình ảnh
//     height: 300, // Chiều cao hình ảnh
//     alignSelf: 'center',
//     marginBottom: 16, // Khoảng cách dưới hình ảnh
//     borderRadius: 8, // Bo góc hình ảnh
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 8,
//     color: '#ffffff', // Màu chữ trắng
//   },
//   subHeader: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 16,
//     color: '#aaaaaa', // Màu chữ xám nhạt
//   },
//   trackItem: {
//     padding: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#333333', // Màu gạch ngang
//   },
//   trackName: {
//     fontSize: 16,
//     color: '#ffffff', // Màu chữ danh sách bài hát
//   },
// });

// export default AlbumDetailsScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AlbumDetailsScreen = ({ route }) => {
  const { albumName, artistName, tracks, albumImage } = route.params;
  const [dominantColors, setDominantColors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(albumImage)
  // Hàm lấy màu từ API
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
        setDominantColors(colors); // Lưu màu trả về từ API
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
// Hàm làm nhạt màu mạnh hơn
  const lightenColor = (hex, percent) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.min(255, Math.floor((num >> 16) * (1 + percent)));
    const g = Math.min(255, Math.floor(((num >> 8) & 0xff) * (1 + percent)));
    const b = Math.min(255, Math.floor((num & 0xff) * (1 + percent)));
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
  };

  // Hàm pha trộn với màu đen (nhẹ nhàng hơn)
  const blendWithBlack = (hex, percent) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.floor((num >> 16) * (1 - percent));
    const g = Math.floor(((num >> 8) & 0xff) * (1 - percent));
    const b = Math.floor((num & 0xff) * (1 - percent));
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
  };

  // Tạo màu pha trộn
  const dominantColor = dominantColors && dominantColors[dominantColors.length - 1]?.startsWith("#")
  ? blendWithBlack(lightenColor(dominantColors[dominantColors.length - 1], 0.99), 0.0001) // Làm nhạt mạnh hơn, pha ít đen hơn
  : "#e6e6e6"; // Màu mặc định sáng hơn nếu không có API



  
  
  useEffect(() => {
    // Cập nhật StatusBar khi dominantColors thay đổi
    if (dominantColors && dominantColors.length > 1) {
      StatusBar.setBackgroundColor(blendWithBlack(lightenColor(dominantColors[dominantColors.length - 1], 0.99), 0.0001));
      StatusBar.setBarStyle('light-content');
    }
  }, [dominantColors]); // Lắng nghe thay đổi của dominantColors

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1c1c1c" />
      </View>
    );
  }

  // Màu gradient tùy thuộc vào API hoặc dùng giá trị mặc định
  // const gradientColors = dominantColors
  //   ? [dominantColors[1], '#000'] // Sử dụng màu tối từ API
  //   : ['#1c1c1c', '#ffffff']; // Mặc định nếu không có API
// Hàm làm nhạt màu
// Hàm tính độ sáng của màu


  // Gradient sử dụng chỉ một màu
  const gradientColors = [dominantColor, "#000"]; // Chuyển từ dominantColor sang trắng

  console.log('GradientColor:', gradientColors)
    return (
      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.5, 1]} // Đảm bảo gradient chuyển tại 70% chiều cao
        style={styles.container}
      >
        {/* Hình ảnh album */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: albumImage }} style={styles.albumImage} />
        </View>

        {/* Phần thông tin */}
        <View style={styles.detailsContainer}>
          <Text style={styles.albumName}>{albumName}</Text>
          <Text style={styles.artistName}>{artistName}</Text>
          <FlatList
            data={tracks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.trackItem}>
                <Text style={styles.trackName}>{item.title}</Text>
              </View>
            )}
          />
        </View>
      </LinearGradient>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
  },
  imageContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumImage: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  albumName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  artistName: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 16,
  },
  trackItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  trackName: {
    fontSize: 16,
    color: '#000000',
  },
});

export default AlbumDetailsScreen;
