import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import ProductDetailScreen from '../screens/Categories/ProductDetailScreen';

const Stack = createNativeStackNavigator();

export default function CategoriesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="CatProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}
