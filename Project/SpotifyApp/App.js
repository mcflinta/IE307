// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { AuthProvider, AuthContext } from './context/AuthContext';
// import AuthStack from './navigation/AuthStack';
// import AppStack from './navigation/AppStack';

// export default function App() {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <AuthContext.Consumer>
//           {({ user }) => (user ? <AppStack /> : <AuthStack />)}
//         </AuthContext.Consumer>
//       </NavigationContainer>
//     </AuthProvider>
//   );
// }

import { CardStyleInterpolators } from '@react-navigation/stack'; // Đảm bảo import đúng
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import Splash from './screens/SplashScreen';
import InitScreen from './screens/InitScreen';
import SignUpScreen from './screens/SignUpScreen'; // Import màn hình Sign Up
import SignUpPwScreen from './screens/SignUpPwScreen'; // Import m
const Stack = createStackNavigator();
const MyTheme = { 
  ...DefaultTheme, 
  colors: {
    ...DefaultTheme.colors, 
    background: '#121212',
  }
};

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await Font.loadAsync({
          'Spotify-font': require('./assets/fonts/SpotifyMixUI-Regular.ttf'),
        });
        setTimeout(() => setIsAppReady(true), 3000); // Giả lập chờ tải 3 giây
      } catch (error) {
        console.warn('Error loading resources:', error);
      }
    };
  
    prepareApp();
  }, []);

  if (!isAppReady) {
    return <Splash />;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="InitScreen">
        <Stack.Screen
          // mode="modal"
          name="InitScreen"
          component={InitScreen}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          
          // mode="card"
          name="SignUpScreen"
          
          component={SignUpScreen}
          options={{ title: 'Create account', headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#fff', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerTitleAlign: 'center' }}
        />
        {/* <Stack.Screen
          
          // mode="card"
          name="SignUpPwScreen"
          
          component={SignUpPwScreen}
          options={{ title: 'Create account', headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#fff', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerTitleAlign: 'center' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
