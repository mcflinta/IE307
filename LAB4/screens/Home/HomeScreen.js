import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { getAllProducts } from '../../api/fakeStoreApi';
import LoadingIndicator from '../../components/LoadingIndicator';
import ProductCard from '../../components/ProductCard';
import { CartContext } from '../../contexts/CartContext';
import Carousel from 'react-native-reanimated-carousel';

const width = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [hotDeals, setHotDeals] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(false);

  const { addToCart, isFavorite, toggleFavorite } = useContext(CartContext);

  // Banner mock
  const banners = [
    'https://intphcm.com/data/upload/banner-thoi-trang.jpg',
    'https://intphcm.com/data/upload/banner-thoi-trang-thu-hut.jpg',
    'https://intphcm.com/data/upload/banner-thoi-trang-nam-tinh.jpg'
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getAllProducts();
      setProducts(res.data);
      setHotDeals(res.data.slice(0, 6));
      setNewArrivals(res.data.slice(6, 12));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const renderGridItems = (items) => {
    return (
      <View style={styles.gridContainer}>
        {items.map((item) => (
          <View style={styles.gridItem} key={item.id}>
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
              onAddPress={() => {
                const success = addToCart(item);
                if (!success) alert('This product is already in your cart!');
              }}
              onFavoritePress={() => toggleFavorite(item.id)}
              isFavorite={isFavorite(item.id)}
            />
          </View>
        ))}
      </View>
    );
  };
 //21521901 - Mai Quốc Cường
  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Welcome to E-Shop</Text>

      {/* Carousel banner */}
      <View style={styles.bannerWrapper}>
        <Carousel
          width={width}
          height={200}
          data={banners}
          autoPlay
          autoPlayInterval={2500}
          scrollAnimationDuration={800}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.bannerImage} />
          )}
        />
      </View>

      {/* Hot deals */}
      <Text style={styles.sectionTitle}>Hot Deals 🔥</Text>
      {renderGridItems(hotDeals)}

      {/* New Arrivals */}
      <Text style={styles.sectionTitle}>New Arrivals ✨</Text>
      {renderGridItems(newArrivals)}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    marginLeft: 10,
    color: '#333'
  },
  bannerWrapper: {
    width: '100%',
    height: 200,
    marginBottom: 8
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    marginVertical: 8,
    color: '#333'
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  gridItem: {
    width: '48%', 
    marginBottom: 10,
  },
});
