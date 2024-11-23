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

import { CardStyleInterpolators } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import Splash from './screens/SplashScreen';
import InitScreen from './screens/InitScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignUpPwScreen from './screens/SignUpPwScreen';
import SignUpGenderScreen from './screens/SignUpGenderScreen';
const MainStack = createStackNavigator();
const SignUpStack = createStackNavigator();

const MyTheme = { 
  ...DefaultTheme, 
  colors: {
    ...DefaultTheme.colors, 
    background: '#121212',
  }
};

// SignUpFlow Component with Header Hidden
const SignUpFlow = () => (
  <SignUpStack.Navigator
    screenOptions={{
      headerShown: false, // Hide headers in nested navigator
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <SignUpStack.Screen  
      name="SignUpScreen" 
      component={SignUpScreen} 
    />
    <SignUpStack.Screen 
      name="SignUpPwScreen" 
      component={SignUpPwScreen} 
    />

    <SignUpStack.Screen
      name='SignUpGenderScreen'
      component={SignUpGenderScreen} />
  </SignUpStack.Navigator>
);



const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await Font.loadAsync({
          'Spotify-font': require('./assets/fonts/SpotifyMixUI-Regular.ttf'),
        });
        setTimeout(() => setIsAppReady(true), 500); // Simulate loading delay
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
      <MainStack.Navigator initialRouteName="InitScreen">
        <MainStack.Screen
          name="InitScreen"
          component={InitScreen}
          options={{ headerShown: false }} // Hide header for InitScreen
        />
    <MainStack.Screen
          name="SignUpFlow"
          component={SignUpFlow}
          // options={{ headerShown: false }} // Hide header for SignUpFlow
          options={{ title: 'Create account', headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#fff', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerTitleAlign: 'center' }}
      
    />


      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
