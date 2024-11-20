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


import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import Splash from './screens/SplashScreen';
import MainScreen from './screens/InitScreen';

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        await Font.loadAsync({
          'Spotify-font': require('./assets/fonts/SpotifyMixUI-Regular.ttf'),
        });
        setIsAppReady(true);
      } catch (error) {
        console.warn('Error loading app:', error);
      }
    };

    prepareApp();
  }, []);

  if (!isAppReady) {
    return <Splash />;
  }

  return (
    <LinearGradient
      colors={['#1c1c1c', '#121212']}
      style={styles.container}
    >
      <MainScreen />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;