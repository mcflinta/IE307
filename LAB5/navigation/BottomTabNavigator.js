import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// 21521901 - Mai Quốc Cường
import PlacesStackNavigator from './PlacesStackNavigator';
import MediaStackNavigator from './MediaStackNavigator';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'PlacesTab') {
            iconName = 'location-outline';
          } else if (route.name === 'MediaTab') {
            iconName = 'camera-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="PlacesTab"
        component={PlacesStackNavigator}
        options={{ title: 'Places' }}
      />
      <Tab.Screen
        name="MediaTab"
        component={MediaStackNavigator}
        options={{ title: 'Media' }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
