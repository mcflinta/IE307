// 21521901 - Mai Quốc Cường
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PlaceListScreen from '../screens/places/PlaceListScreen';
import AddPlaceScreen from '../screens/places/AddPlaceScreen';
import PlaceDetailScreen from '../screens/places/PlaceDetailScreen';
import MapScreen from '../screens/places/MapScreen';

const Stack = createStackNavigator();

function PlacesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PlaceList"
        component={PlaceListScreen}
        options={{ title: 'My Places' }}
      />
      <Stack.Screen
        name="AddPlace"
        component={AddPlaceScreen}
        options={{ title: 'Add a new Place' }}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
        options={{ title: 'Place Detail' }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ title: 'Map' }}
      />
    </Stack.Navigator>
  );
}

export default PlacesStackNavigator;
