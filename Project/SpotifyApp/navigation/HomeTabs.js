import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import SearchScreen from '../screens/SearchScreen';
import LibraryScreen from '../screens/LibraryScreen';
import PremiumScreen from '../screens/PremiumScreen';
import HomeIcon from '../assets/svg/HomeIcon';
import HomeFocusIcon from '../assets/svg/HomeFocusIcon';
import SearchIcon from '../assets/svg/SearchIcon';
import LibraryIcon from '../assets/svg/LibraryIcon';
import LibraryFocusIcon from '../assets/svg/LibraryFocusIcon';
import PremiumIcon from '../assets/svg/PremiumIcon';

const HomeBottomTab = createBottomTabNavigator();

const HomeTabs = ({ route }) => {
  const { user } = route.params || {};
  console.log('HomeTabs user:', user);

  return (
    <HomeBottomTab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        header: () => null,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <HomeBottomTab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <HomeFocusIcon width={size} height={size} fill={color} />
            ) : (
              <HomeIcon width={size} height={size} fill={color} />
            ),
        }}
        initialParams={{ user }}
      />

      <HomeBottomTab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <SearchIcon width={size} height={size} fill={color} />
          ),
        }}
        initialParams={{ user }}
      />

      <HomeBottomTab.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <LibraryFocusIcon width={size} height={size} fill={color} />
            ) : (
              <LibraryIcon width={size} height={size} fill={color} />
            ),
        }}
        initialParams={{ user }}
      />

      <HomeBottomTab.Screen
        name="PremiumScreen"
        component={PremiumScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Premium',
          tabBarIcon: ({ color, size }) => (
            <PremiumIcon width={size} height={size} fill={color} />
          ),
        }}
        initialParams={{ user }}
      />
    </HomeBottomTab.Navigator>
  );
};

export default HomeTabs;
