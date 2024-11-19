import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RootHomeStack from '../navigation/RootHomeStack'; // Sử dụng RootHomeStack thay vì HomeScreen
import CategoryScreen from '../screens/CategoryScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AccountScreen from '../screens/AccountScreen';
import HomeIcon from '../assets/svg/home';
import CategoryIcon from '../assets/svg/category';
import FavoritesIcon from '../assets/svg/favorites';
import AccountIcon from '../assets/svg/account';

const Tab = createBottomTabNavigator();

const MainBottomTab = () => (
  <Tab.Navigator>
    {/* Tab chứa RootHomeStack */}
    <Tab.Screen
      name="Home"
      component={RootHomeStack}
      options={{
        headerShown: false,
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
