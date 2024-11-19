import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import HelpScreen from '../screens/HelpScreen';
const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="HomeScreen">
      <Drawer.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ title: 'Home' }} 
      />
      <Drawer.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ title: 'Notification' }} />
      <Drawer.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={{ title: 'Helps' }} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
