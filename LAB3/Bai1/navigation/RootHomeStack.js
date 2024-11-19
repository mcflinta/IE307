import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeDrawer from './HomeDrawer';
import HomeDetailsScreen from '../screens/HomeDetailsScreen';
import NotificationDetailsScreen from '../screens/NotificationDetailScreen';
const Stack = createStackNavigator();

const RootHomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeDrawer">
      {/* Bao bọc HomeDrawer */}
      <Stack.Screen 
        name="HomeDrawer" 
        component={HomeDrawer} 
        options={{ headerShown: false }} 
      />
      {/* Màn hình chi tiết không có Drawer */}
      <Stack.Screen 
        name="HomeDetailsScreen" 
        component={HomeDetailsScreen} 
        options={{ title: 'Details' }} 
      />
      <Stack.Screen
        name="NotificationDetailScreen"
        component={NotificationDetailsScreen}
        options={{ title: 'Notification Detail Screen' }}
      />
    </Stack.Navigator>
  );
};

export default RootHomeStack;
