import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// 21521901 - Mai Quốc Cường
const ProductCard = ({
    product,
    onPress,
    onAddPress,
    onFavoritePress,
    isFavorite
  }) => {
  
    return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image
    source={{ uri: product.image }}
    style={styles.image}
    />

  
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
  
          <View style={styles.row}>
            {/* Nút yêu thích */}
            <TouchableOpacity onPress={onFavoritePress} style={{ marginRight: 10 }}>
              <Icon
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={22}
                color={isFavorite ? 'red' : '#333'}
              />
            </TouchableOpacity>
  
            {/* Nút thêm giỏ hàng */}
            <TouchableOpacity onPress={onAddPress}>
              <Icon name="cart-outline" size={24} color="#FF6600" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 2
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'contain'
  },
  info: {
    marginTop: 8
  },
  title: {
    
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  },
  price: {
    marginVertical: 4,
    color: '#FF6600'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
