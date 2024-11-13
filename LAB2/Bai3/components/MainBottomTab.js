import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AccountScreen from '../screens/AccountScreen';

// Import các icon SVG dưới dạng component
import HomeIcon from '../assets/svg/home.js';
import CategoryIcon from '../assets/svg/category.js';
import FavoritesIcon from '../assets/svg/favorites.js';
import AccountIcon from '../assets/svg/account.js';

const Tab = createBottomTabNavigator();

const MainBottomTab = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => (
          <HomeIcon fill={focused ? '#000' : '#888'} width={24} height={24} />
        ),
      }}
    />
    <Tab.Screen
      name="Category"
      component={CategoryScreen}
      options={{
        tabBarLabel: 'Category',
        tabBarIcon: ({ focused }) => (
          <CategoryIcon fill={focused ? '#000' : '#888'} width={24} height={24} />
        ),
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{
        tabBarLabel: 'Favorites',
        tabBarIcon: ({ focused }) => (
          <FavoritesIcon fill={focused ? '#000' : '#888'} width={24} height={24} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountScreen}
      options={{
        tabBarLabel: 'Account',
        tabBarIcon: ({ focused }) => (
          <AccountIcon fill={focused ? '#000' : '#888'} width={24} height={24} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainBottomTab;
