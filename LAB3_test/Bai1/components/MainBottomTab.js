// MainBottomTab.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation } from "@react-navigation/native";
import HomeDrawer from './HomeDrawer.js'; // Import từ file HomeDrawer mới
import CategoryScreen from '../screens/CategoryScreen.js';
import FavoritesScreen from '../screens/FavoritesScreen.js';
import AccountScreen from '../screens/AccountScreen.js';
import RootStackHome from '../navigation/RootStackHome.js';
import HomeIcon from '../assets/svg/home.js';
import CategoryIcon from '../assets/svg/category.js';
import FavoritesIcon from '../assets/svg/favorites.js';
import AccountIcon from '../assets/svg/account.js';

const Tab = createBottomTabNavigator();
const NavigationStackHome = createStaticNavigation(RootStackHome);
const MainBottomTab = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeDrawer}
      options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => (
          <HomeIcon fill={focused ? '#000' : '#888'} width={24} height={24} />
        ),
      }}
    ><NavigationStackHome/></Tab.Screen>
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
