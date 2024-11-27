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
import SignUpPolicyScreen from './screens/SignUpPolicyScreen';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import LibraryScreen from './screens/LibraryScreen'; 
import PremiumScreen from './screens/PremiumScreen';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeIcon from './assets/svg/HomeIcon';
import HomeFocusIcon from './assets/svg/HomeFocusIcon';
import SearchIcon from './assets/svg/SearchIcon';
import LibraryIcon from './assets/svg/LibraryIcon';
import LibraryFocusIcon from './assets/svg/LibraryFocusIcon';
import PremiumIcon from './assets/svg/PremiumIcon';
const MainStack = createStackNavigator();
const SignUpStack = createStackNavigator();
const LoginStack = createStackNavigator();
// const HomeStack = createStackNavigator();

const HomeBottomTab = createBottomTabNavigator();

const MyTheme = { 
  ...DefaultTheme, 
  colors: {
    ...DefaultTheme.colors, 
    background: '#121212',
  }
};

const HomeTabs = () => {
  return (
    <HomeBottomTab.Navigator
      initialRouteName="HomeScreen" 
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#121212', // Đổi màu tab
          borderTopWidth: 0, // Loại bỏ vạch kẻ trắng
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <HomeBottomTab.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            focused
              ? <HomeFocusIcon width={size} height={size} fill={color} />
              : <HomeIcon width={size} height={size} fill={color} />
          )
          
        }} 
      />
      <HomeBottomTab.Screen 
        name="SearchScreen" 
        component={SearchScreen} 
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size, focused }) => (
            focused
              ? <SearchIcon width={size} height={size} fill={color} />
              : <SearchIcon width={size} height={size} fill={color} />
          )
        }} 
      />
      <HomeBottomTab.Screen 
        name="LibraryScreen" 
        component={LibraryScreen} 
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({ color, size, focused }) => (
            focused
              ? <LibraryFocusIcon width={size} height={size} fill={color} />
              : <LibraryIcon width={size} height={size} fill={color} />
          )
        }} 
      />
      <HomeBottomTab.Screen 
        name="PremiumScreen" 
        component={PremiumScreen} 
        options={{
          tabBarLabel: 'Premium',
          tabBarIcon: ({ color, size, focused }) => (
            focused
              ? <PremiumIcon width={size} height={size} fill={color} />
              : <PremiumIcon width={size} height={size} fill={color} />
          )
        }} 
      />

    </HomeBottomTab.Navigator>
  );
};

// SignUpFlow Component with Header Hidden
const SignUpFlow = () => (
  <SignUpStack.Navigator
    screenOptions={{
      headerShown: false, 
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
    <SignUpStack.Screen
      name='SignUpPolicyScreen'
      component={SignUpPolicyScreen}
      options={{ backgroundColor: '#121212' }}/>
    {/* <SignUpStack.Screen 
      name="LoadingScreen"
      component={LoadingScreen}/> */}
  </SignUpStack.Navigator>
);
const LoginFlow = () => (
  <LoginStack.Navigator
    screenOptions={{
      headerShown: false, 
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <LoginStack.Screen  
      name="LoginScreen" 
      component={LoginScreen} 
    />
  </LoginStack.Navigator>
)

// const HomeFlow = () => (

// )

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
      <MainStack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        // options={{ headerShown: false }} // Hide header for SignUpFlow
        options={{ headerShown: false, backgroundColor: '#121212' }}
    
        />
        <MainStack.Screen
          name="LoginFlow"
          component={LoginFlow}
          options={{ title: '', headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#fff', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerTitleAlign: 'center' }}
        />
        <MainStack.Screen
          name='HomeTabs'
          component={HomeTabs}
          // screenOptions=
          options={{ headerLeft: () => null, headerTitle: () => null,  headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#fff', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerTitleAlign: 'center' }}/>
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
