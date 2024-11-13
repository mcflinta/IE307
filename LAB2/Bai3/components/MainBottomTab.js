// MainBottomTab.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import CategoryScreen from './CategoryScreen';
import FavoritesScreen from './FavoritesScreen';
import AccountScreen from './AccountScreen';

const Tab = createBottomTabNavigator();

const MainBottomTab = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
    <Tab.Screen name="Category" component={CategoryScreen} options={{ tabBarLabel: 'Category' }} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ tabBarLabel: 'Favorites' }} />
    <Tab.Screen name="Account" component={AccountScreen} options={{ tabBarLabel: 'Account' }} />
  </Tab.Navigator>
);

export default MainBottomTab;
