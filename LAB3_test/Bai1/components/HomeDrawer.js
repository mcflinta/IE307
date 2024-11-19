import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RootStackHome from '../navigation/RootStackHome';
import NotificationScreen from '../screens/NotificationScreen';
import HelpScreen from '../screens/HelpScreen';
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();
const HomeDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen
      name="RootStackHome"
      component={HomeScreen}
      options={{ title: 'Home' }}
    />
    <Drawer.Screen name="Notifications" component={NotificationScreen} />
    <Drawer.Screen name="Help" component={HelpScreen} />
  </Drawer.Navigator>
);

export default HomeDrawer;
