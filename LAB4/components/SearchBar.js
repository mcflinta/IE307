import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// 21521901 - Mai Quốc Cường
const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#999" style={{ marginHorizontal: 8 }} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 6,
    alignItems: 'center',
    elevation: 2
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 4
  }
});
