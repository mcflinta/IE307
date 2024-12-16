import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeTabs from './HomeTabs'; // Màn hình chính
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ route }) => {
  const { user, token } = route.params || {};

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#121212',
        },
        drawerActiveTintColor: '#1DB954',
        drawerInactiveTintColor: '#fff',
        drawerType: 'slide' // Thêm dòng này
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} user={user} token={token} />}
    >
      <Drawer.Screen 
        name="HomeTabs" 
        component={HomeTabs}
        initialParams={{ user, token }}
        options={{ title: 'Home' }} 
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
