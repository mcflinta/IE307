// HomeDrawer.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack'; // Import từ file HomeStack mới
import NotificationScreen from '../screens/NotificationScreen';
import HelpScreen from '../screens/HelpScreen';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
    <Drawer.Screen name="Notifications" component={NotificationScreen} />
    <Drawer.Screen name="Help" component={HelpScreen} />
  </Drawer.Navigator>
);

export default HomeDrawer;
