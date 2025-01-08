import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import { requestNotificationPermission } from './services/notification';
// 21521901 - Mai Quốc Cường
import PlaceListScreen from './screens/PlaceListScreen';
import AddPlaceScreen from './screens/AddPlaceScreen';
import PlaceDetailScreen from './screens/PlaceDetailScreen';
import MapScreen from './screens/MapScreen';
import MediaLibraryScreen from './screens/MediaLibraryScreen';
import RecordVideoScreen from './screens/RecordVideoScreen';
import MapDetail from './screens/MapDetail';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const handleSavePress = (location) => {
  if (location) {
    console.log('Saved Location:', location);
    alert(`Saved Location: ${location.latitude}, ${location.longitude}`);
  } else {
    alert('No location selected to save.');
  }
};

function PlacesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PlaceList"
        component={PlaceListScreen}
        options={{ title: 'Place List' }}
      />
      <Stack.Screen
        name="AddPlace"
        component={AddPlaceScreen}
        options={{ title: 'Add Place' }}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
        options={({ route, navigation }) => ({
          title: 'Place Details',
          headerRight: () => (
            <TouchableOpacity 
              style={{ marginRight: 10 }}
              onPress={() => {
                const { latitude, longitude, address } = route.params.place;
                navigation.navigate('MapDetail', { 
                  location: { latitude, longitude, address } 
                });
              }}
            >
              <Ionicons name="map-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        initialParams={{ location: null }} 
        options={({ route }) => ({
          title: 'Map',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => handleSavePress(route.params?.location)}
            >
              <Ionicons
                name="bookmark-outline"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="MapDetail"
        component={MapDetail}
        options={{ title: 'Place Details' }}
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
        options={{ title: 'Library' }}
      />
      <Stack.Screen
        name="RecordVideo"
        component={RecordVideoScreen}
        options={{ title: 'Record Video' }}
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
