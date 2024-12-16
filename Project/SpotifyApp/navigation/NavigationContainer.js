import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeTabs from './HomeTabs';
import { View, Text } from 'react-native';

const Drawer = createDrawerNavigator();

// Một màn hình tạm để minh họa Drawer
const TempScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: '#fff' }}>Another Screen</Text>
  </View>
);

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: '#121212' },
        drawerLabelStyle: { color: '#fff' },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen name="TempScreen" component={TempScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
