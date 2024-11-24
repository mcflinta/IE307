import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import HelpScreen from '../screens/HelpScreen';
import HomeDrawerIcon from '../assets/svg/HomeDrawerIcon.js';
import NotificationDrawerIcon from '../assets/svg/NotificationDrawerIcon.js'; // Giả sử bạn đã chuyển đổi SVG này sang component React Native.
import HelpDrawerIcon from '../assets/svg/HelpDrawerIcon.js';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="HomeScreen">
      <Drawer.Screen
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ 
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <HomeDrawerIcon width={size} height={size} fill={color} />
          ),
        }} 
      />
      <Drawer.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ 
          title: 'Notification',
          drawerIcon: ({ color, size }) => (
            <NotificationDrawerIcon width={size} height={size} fill={color} />
          ),
        }} 
      />
      <Drawer.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={{ 
          title: 'Helps',
          drawerIcon: ({ color, size }) => (
            <HelpDrawerIcon width={size} height={size} fill={color} />
          ),
        }} 
      />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
