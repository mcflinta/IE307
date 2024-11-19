import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SimpleScreen from './SimpleScreen'; // Đảm bảo bạn đã tạo và export `SimpleScreen`

// Tạo Tab Navigator
const Tab = createMaterialTopTabNavigator();

const CategoryScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: 'white' },
        tabBarIndicatorStyle: { backgroundColor: 'blue', height: 2 },
      }}
    >
      <Tab.Screen
        name="Categories1"
        component={SimpleScreen}
        initialParams={{ title: 'Category 1' }} // Truyền tham số 'title'
      />
      <Tab.Screen
        name="Categories2"
        component={SimpleScreen}
        initialParams={{ title: 'Category 2' }} // Truyền tham số 'title'
      />
      <Tab.Screen
        name="Categories3"
        component={SimpleScreen}
        initialParams={{ title: 'Profile' }} // Truyền tham số 'title'
      />
    </Tab.Navigator>
  );
};

export default CategoryScreen;
