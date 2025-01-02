import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from '../../contexts/CartContext';
import ModalConfirm from '../../components/ModalConfirm';
// 21521901 - Mai Quốc Cường
const CartScreen = ({ navigation }) => {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useContext(CartContext);

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDeletePress = (id) => {
    setSelectedItem(id);
    setConfirmVisible(true);
  };

  const onConfirmDelete = () => {
    removeFromCart(selectedItem);
    setConfirmVisible(false);
    setSelectedItem(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartImage} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.btnSmall}>
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.btnSmall}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtotal}>
          Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 8 }} onPress={() => handleDeletePress(item.id)}>
        <Text style={{ fontWeight: 'bold', color: 'red' }}>X</Text>
      </TouchableOpacity>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>Your cart is empty</Text>
        <TouchableOpacity
          style={styles.shopBtn}
          onPress={() => navigation.navigate('HomeStack', { screen: 'Home' })}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>SHOP NOW</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${cartTotal.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => alert('Checkout not implemented!')}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>

      <ModalConfirm
        visible={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        onConfirm={onConfirmDelete}
        message="Are you sure you want to remove this product?"
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    elevation: 2
  },
  cartImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 6
  },
  info: {
    marginLeft: 8,
    flex: 1
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  },
  price: {
    fontSize: 14,
    color: '#FF6600'
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6
  },
  btnSmall: {
    width: 30,
    height: 30,
    backgroundColor: '#FF6600',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: '#fff',
    fontWeight: '700'
  },
  qtyText: {
    marginHorizontal: 8,
    fontSize: 16
  },
  subtotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  shopBtn: {
    marginTop: 12,
    backgroundColor: '#FF6600',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 6
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center'
  },
  totalText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '600',
    color: '#333'
  },
  checkoutBtn: {
    marginLeft: 'auto',
    marginRight: 12,
    backgroundColor: '#FF6600',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6
  }
});
