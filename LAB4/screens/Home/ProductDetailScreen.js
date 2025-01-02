import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
// 21521901 - Mai Quốc Cường
const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: product.title });
  }, [navigation, product]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.title}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.rating}>
        Rating: {product.rating?.rate ?? 0} ★ ({product.rating?.count ?? 0} reviews)
      </Text>

      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    marginBottom: 10
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    color: '#333'
  },
  price: {
    fontSize: 16,
    color: '#FF6600',
    marginBottom: 4
  },
  rating: {
    fontSize: 14,
    marginBottom: 6,
    color: '#666'
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333'
  }
});
