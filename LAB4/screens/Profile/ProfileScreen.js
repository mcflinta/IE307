import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { CartContext } from '../../contexts/CartContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAllProducts } from '../../api/fakeStoreApi';
// 21521901 - Mai Quốc Cường
const ProfileScreen = ({ navigation }) => {
  const { userInfo, logout } = useContext(AuthContext);
  const { favorites, toggleFavorite, isFavorite } = useContext(CartContext);

  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const res = await getAllProducts();
        const all = res.data;
        const favProds = all.filter((p) => favorites.includes(p.id));
        setFavoriteProducts(favProds);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFavs();
  }, [favorites]);

  const handleEditPress = () => {
    navigation.navigate('EditProfile', { userData: userInfo });
  };

  const handleLogout = () => {
    logout();
  };

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text>No user info found!</Text>
      </View>
    );
  }

  const renderFavItem = ({ item }) => (
    <View style={styles.favItem}>
      <Image source={{ uri: item.image }} style={styles.favImage} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.favTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={{ color: '#FF6600', marginVertical: 2 }}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Icon
          name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite(item.id) ? 'red' : '#333'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Image
          source={{ uri: 'https://via.placeholder.com/80.png?text=Avatar' }}
          style={styles.avatar}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.name}>
            {userInfo.name?.firstname} {userInfo.name?.lastname}
          </Text>
          <Text style={{ fontSize: 14, color: '#555' }}>
            {userInfo.username}
          </Text>
        </View>
        <TouchableOpacity onPress={handleEditPress} style={styles.editBtn}>
          <Text style={{ color: '#FF6600', fontSize: 16 }}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoWrapper}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userInfo.email}</Text>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={{ color: '#fff', fontWeight: '600' }}>LOG OUT</Text>
      </TouchableOpacity>

      <Text style={styles.favHeader}>Favorites</Text>
      {favoriteProducts.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 8, color: '#666' }}>
          You have no favorite products.
        </Text>
      ) : (
        <FlatList
          data={favoriteProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFavItem}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
};
// 21521901 - Mai Quốc Cường
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    elevation: 2
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd'
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333'
  },
  editBtn: {
    marginRight: 8
  },
  infoWrapper: {
    backgroundColor: '#fff',
    padding: 12,
    marginTop: 4,
    elevation: 2
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#333'
  },
  value: {
    marginBottom: 4,
    color: '#555'
  },
  logoutBtn: {
    backgroundColor: 'red',
    padding: 12,
    margin: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  favHeader: {
    fontSize: 16,
    fontWeight: '600',
    margin: 12,
    color: '#333'
  },
  favItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    elevation: 2
  },
  favImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 6
  },
  favTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  }
});
