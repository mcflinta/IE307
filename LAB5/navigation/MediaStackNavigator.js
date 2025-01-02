// 21521901 - Mai Quốc Cường
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GalleryScreen from '../screens/media/GalleryScreen';
import RecordVideoScreen from '../screens/media/RecordVideoScreen';

const Stack = createStackNavigator();

function MediaStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{ title: 'My Gallery' }}
      />
      <Stack.Screen
        name="RecordVideo"
        component={RecordVideoScreen}
        options={{ title: 'Record Video' }}
      />
    </Stack.Navigator>
  );
}

export default MediaStackNavigator;
