
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import tokenManager from '../services/TokenManager';
import XIcon from '../assets/svg/XIcon.svg';
import WikiIcon from '../assets/svg/WikiIcon.svg';
import { API_BASE_URL } from '../config/config';

const BioArtistScreen = ({ route }) => {
  const artistId = route.params.artistId;
  const [artist, setArtist] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePress = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url); // Mở URL
      } else {
        Alert.alert(`Không thể mở đường link: ${url}`);
      }
    } catch (error) {
      Alert.alert('Đã xảy ra lỗi khi mở link!');
    }
  };
  const formatType = (type) => {
    if (!type) return '';
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };
  const formatPlaycount = (count) => {
    return Number(count).toLocaleString().toString(); // Thêm dấu phẩy ngăn cách mỗi 3 chữ số
  };
  useEffect(() => {
    const fetchArtist = async () => {
      setLoading(true);
      try {
        const token = await tokenManager.getToken(); // Lấy token từ TokenManager
        if (!token) {
          console.error('Token is missing.');
          return;
        }
        const response = await fetch(
          `${API_BASE_URL}/artist/artistInfo/${artistId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentScroll}>
      {/* Artist Image */}
      {artist.artistImage && (
        <Image source={{ uri: artist.gallery }} style={styles.artistImage} />
      )}

      {/* Monthly Listeners */}
      <Text style={styles.listenersCount}>{formatPlaycount(artist.monthlyListeners)}</Text>
      <Text style={styles.listenersText}>MONTHLY LISTENERS</Text>

      {/* Description */}
      <HTMLView
        value={`<p>${artist.biography || ''}</p>`}
        stylesheet={htmlStyles}
        addLineBreaks={false}
      />
<View style={styles.artistContainer}>
        {artist.artistImage && (
          <Image source={{ uri: artist.artistImage }} style={styles.artistImageLarge} />
        )}
        <Text style={styles.artistNameLarge}>Posted by {artist.name}</Text>
      </View>
      {/* Links Section */}
      <View>
        {artist.external_links &&
          artist.external_links.map((link, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => handlePress(link.url)}
            >
              {/* Icon logic */}
              {link.name === 'TWITTER' ? (
                <XIcon height={30} width={30} fill={'#fff'} style={styles.icon} />
              ) : link.name === 'WIKIPEDIA' ? (
                <WikiIcon height={30} width={30} fill={'#fff'} style={styles.icon} />
              ) : null}
              <Text style={styles.text}>{formatType(link.name)}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  artistImage: {
    width: '100%',
    height: 300,
    borderRadius: 2,
    marginBottom: 20,
  },
  listenersCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  listenersText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
  },
  contentScroll: {
    paddingBottom: 150,
  },
  artistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 40,
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 24, // Kích thước icon
    height: 24,
    marginRight: 20,
  },
  text: {
    color: '#fff', // Màu chữ trắng
    fontSize: 16, // Kích thước chữ
  },
});

const htmlStyles = StyleSheet.create({
  p: {
    fontSize: 15,
    color: '#fff',
    lineHeight: 22,
  },
  a: {
    color: '#1DB954',
  }
});

export default BioArtistScreen;
