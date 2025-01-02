import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// 21521901 - Mai Quốc Cường
const SortAndFilterBar = ({ onSortChange, currentSort }) => {
  const handleSortPriceAsc = () => onSortChange('price-asc');
  const handleSortPriceDesc = () => onSortChange('price-desc');
  const handleSortRating = () => onSortChange('rating-desc');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sort by:</Text>
      <TouchableOpacity style={styles.btn} onPress={handleSortPriceAsc}>
        <Icon name="arrow-up" size={16} color="#fff" />
        <Text style={styles.btnText}>Price</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={handleSortPriceDesc}>
        <Icon name="arrow-down" size={16} color="#fff" />
        <Text style={styles.btnText}>Price</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={handleSortRating}>
        <Icon name="star" size={16} color="#fff" />
        <Text style={styles.btnText}>Rating</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SortAndFilterBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FF6600',
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  label: {
    color: '#fff',
    marginRight: 8,
    fontWeight: '600'
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12
  },
  btnText: {
    color: '#fff',
    marginLeft: 4
  }
});
