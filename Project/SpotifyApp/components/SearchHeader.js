// components/SearchHeader.js
import React, { useState, useCallback, useEffect } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchHeader = React.memo(({ onSearch, initialValue }) => {
  const [inputText, setInputText] = useState(initialValue || '');

  useEffect(() => {
    setInputText(initialValue || '');
  }, [initialValue]);

  const handleChangeText = useCallback(
    (text) => {
      setInputText(text);
      onSearch(text);
    },
    [onSearch]
  );

  return (
    <TextInput
      style={styles.searchInput}
      placeholder="What do you want to listen to?"
      placeholderTextColor="#aaa"
      value={inputText}
      onChangeText={handleChangeText}
      autoFocus
      returnKeyType="search"
      clearButtonMode="while-editing"
    />
  );
});

const styles = StyleSheet.create({
  searchInput: {
    color: '#fff',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    flex: 1,
    paddingVertical: 5,
  },
});

export default SearchHeader;
