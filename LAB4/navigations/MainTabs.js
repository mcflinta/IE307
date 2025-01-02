import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import CategoriesStack from './CategoriesStack';
import CartStack from './CartStack';
import ProfileStack from './ProfileStack';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartContext } from '../contexts/CartContext';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { cartItems } = useContext(CartContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6600',
        tabBarInactiveTintColor: '#666'
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Icon name="home-outline" color={color} size={size} />
        }}
      />
      <Tab.Screen
        name="CategoriesStack"
        component={CategoriesStack}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color, size }) => <Icon name="grid-outline" color={color} size={size} />
        }}
      />
      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => <Icon name="cart-outline" color={color} size={size} />,
          tabBarBadge: cartItems.length > 0 ? cartItems.length : null
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <Icon name="person-outline" color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  );
}
