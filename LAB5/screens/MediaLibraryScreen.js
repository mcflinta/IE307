
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
// 2521901 -  Mai Quốc Cường
const numColumns = 2;
const { width } = Dimensions.get('window');
const ITEM_SIZE = width / numColumns - 6;

export default function MediaLibraryScreen({ navigation }) {
  const [mediaFiles, setMediaFiles] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('RecordVideo')}>
          <Ionicons name="videocam-outline" size={28} color="blue" />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const media = await MediaLibrary.getAssetsAsync({
          sortBy: [MediaLibrary.SortBy.creationTime],
          mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
          first: 15
        });
        setMediaFiles(media.assets);
      } else {
        console.log('Quyền thư viện bị từ chối!');
      }
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => {
    const isVideo = item.mediaType === 'video';
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.uri }} style={styles.itemImage} />
        {isVideo && (
          <View style={styles.videoOverlay}>
            <Ionicons name="play-circle" size={32} color="#fff" />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {mediaFiles.length === 0 ? (
        <Text style={styles.noData}>Không có tệp tin đa phương tiện.</Text>
      ) : (
        <FlatList
          data={mediaFiles}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          numColumns={numColumns}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 4 },
  noData: { textAlign: 'center', marginTop: 20 },
  itemContainer: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: 2,
    position: 'relative'
  },
  itemImage: { width: '100%', height: '100%', borderRadius: 4 },
  videoOverlay: {
    position: 'absolute',
    top: '40%',
    left: '40%'
  }
});
