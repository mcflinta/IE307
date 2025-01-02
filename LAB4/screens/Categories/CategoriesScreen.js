import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getCategories, getAllProducts, getProductsByCategory } from '../../api/fakeStoreApi';
import LoadingIndicator from '../../components/LoadingIndicator';
import ProductCard from '../../components/ProductCard';
import { CartContext } from '../../contexts/CartContext';
import SearchBar from '../../components/SearchBar';
import SortAndFilterBar from './SortAndFilterBar';
// 21521901 - Mai Quốc Cường
const CategoriesScreen = ({ navigation }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allProducts, setAllProducts]   = useState([]);
  const [products, setProducts]         = useState([]);
  const [loading, setLoading]          = useState(false);

  const { addToCart, toggleFavorite, isFavorite } = useContext(CartContext);

  const [searchText, setSearchText] = useState('');
  const [sortMode, setSortMode]     = useState(null);

  useEffect(() => {
    fetchInit();
  }, []);

  const fetchInit = async () => {
    setLoading(true);
    try {
      const catRes = await getCategories();
      setCategoryList(['All', ...catRes.data]);

      const prodRes = await getAllProducts();
      setAllProducts(prodRes.data);
      setProducts(prodRes.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = async (cat) => {
    setSelectedCategory(cat);
    setSearchText('');
    setSortMode(null);
    if (cat === 'All') {
      setProducts(allProducts);
      return;
    }
    try {
      setLoading(true);
      const res = await getProductsByCategory(cat);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchText) return; 

    if (selectedCategory === 'All') {
      const filtered = allProducts.filter((p) =>
        p.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setProducts(filtered);
    } else {
      const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setProducts(filtered);
    }
  }, [searchText]);


  const handleSortChange = (mode) => {
    setSortMode(mode);
    let sorted = [...products];
    switch (mode) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        sorted.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      default:
        break;
    }
    setProducts(sorted);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.catItem,
        item === selectedCategory && { backgroundColor: '#FF6600' }
      ]}
      onPress={() => handleSelectCategory(item)}
    >
      <Text
        style={[
          styles.catText,
          item === selectedCategory && { color: '#fff' }
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('CatProductDetail', { product: item })}
      onAddPress={() => {
        const success = addToCart(item);
        if (!success) alert('Already in cart!');
      }}
      onFavoritePress={() => toggleFavorite(item.id)}
      isFavorite={isFavorite(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      {/* Categories list */}
      <View style={styles.categoriesWrapper}>
        <FlatList
          data={categoryList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) => `${item}-${index}`}
          contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 8 }}
        />
      </View>

      {/* Search */}
      <SearchBar
        value={searchText}
        onChange={(val) => {
          setSearchText(val);
          if (!val) {
            handleSelectCategory(selectedCategory);
          }
        }}
        placeholder="Search products..."
      />

      {/* Sort bar */}
      <SortAndFilterBar onSortChange={handleSortChange} currentSort={sortMode} />

      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={renderProductItem}
          contentContainerStyle={{ paddingHorizontal: 6, paddingBottom: 80 }}
        />
      )}
    </View>
  );
};
// 21521901 - Mai Quốc Cường
export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  categoriesWrapper: {
    height: 50,
    justifyContent: 'center'
  },
  catItem: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#ccc',
    borderRadius: 16,
    marginRight: 8
  },
  catText: {
    color: '#333',
    fontWeight: '500'
  }
});
