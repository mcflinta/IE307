
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { requestNotificationPermission } from './services/notification';

import PlaceListScreen from './screens/PlaceListScreen';
import AddPlaceScreen from './screens/AddPlaceScreen';
import PlaceDetailScreen from './screens/PlaceDetailScreen';
import MapScreen from './screens/MapScreen';
import MediaLibraryScreen from './screens/MediaLibraryScreen';
import RecordVideoScreen from './screens/RecordVideoScreen';
// 21521901 - Mai Quốc Cường
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function PlacesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="PlaceList"
        component={PlaceListScreen}
        options={{ title: 'Danh sách địa điểm' }}
      />
      <Stack.Screen 
        name="AddPlace"
        component={AddPlaceScreen}
        options={{ title: 'Thêm địa điểm' }}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
        options={{ title: 'Chi tiết địa điểm' }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ title: 'Bản đồ' }}
      />
    </Stack.Navigator>
  );
}

function MediaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MediaLibrary"
        component={MediaLibraryScreen}
        options={{ title: 'Thư viện' }}
      />
      <Stack.Screen
        name="RecordVideo"
        component={RecordVideoScreen}
        options={{ title: 'Quay video' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Places') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Media') {
              iconName = focused ? 'images' : 'images-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Places" component={PlacesStack} />
        <Tab.Screen name="Media" component={MediaStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
