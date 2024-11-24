import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RootHomeStack from '../navigation/RootHomeStack';
import CategoryScreen from '../screens/CategoryScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AccountScreen from '../screens/AccountScreen';
import HomeIcon from '../assets/svg/home';
import CategoryIcon from '../assets/svg/category';
import FavoritesIconWithBadge from '../assets/svg/favorites'; // Sử dụng biểu tượng mới
import AccountIcon from '../assets/svg/account';

const Tab = createBottomTabNavigator();

const MainBottomTab = () => {
  const favoritesCount = 3; // Thay số lượng này bằng dữ liệu thực tế (ví dụ từ Redux, Context API, hoặc API)

  return (
    <Tab.Navigator initialRouteName='Home'>
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
            <FavoritesIconWithBadge
              fill={focused ? '#000' : '#888'}
              width={24}
              height={24}
              count={favoritesCount} // Truyền số lượng thông báo
            />
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
};

export default MainBottomTab;
