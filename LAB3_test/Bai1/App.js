// // App.js
// import React, { useContext } from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import { SafeAreaView, StyleSheet } from 'react-native';
// import { AuthProvider, AuthContext } from './contexts/AuthContext';
// // import RootNavigator from './navigators/RootNavigator';
// import AuthStack from './components/AuthStack';
// import MainBottomTab from './components/MainBottomTab';

// const App = () => (
//   <AuthProvider>
//     <SafeAreaView style={styles.container}>
//       <NavigationContainer>
//         <RootNavigator />      
//       </NavigationContainer>
//     </SafeAreaView>
//   </AuthProvider>
// );


// const RootNavigator = () => {
//   const { isAuthenticated } = useContext(AuthContext);
//   return isAuthenticated ? <MainBottomTab /> : <AuthStack />;
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;

import React, { createContext, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons'; // Ensure this is installed

// Context để quản lý tiêu đề và nút back
const HeaderContext = createContext();

const HeaderProvider = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState('Init Screen');
  const [showBackButton, setShowBackButton] = useState(false);

  return (
    <HeaderContext.Provider value={{ headerTitle, setHeaderTitle, showBackButton, setShowBackButton }}>
      {children}
    </HeaderContext.Provider>
  );
};

// Header component using useNavigation hook
const Header = () => {
  const { headerTitle, showBackButton } = useContext(HeaderContext);
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {showBackButton && (
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
      )}
      <Text style={styles.headerText}>{headerTitle}</Text>
    </View>
  );
};

// Màn hình Init
const InitScreen = ({ navigation }) => {
  const { setHeaderTitle, setShowBackButton } = useContext(HeaderContext);

  React.useEffect(() => {
    setHeaderTitle('Init Screen');
    setShowBackButton(false);
  }, []);

  return (
    <View style={styles.screen}>
      <Text>Init Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => {
          setHeaderTitle('Home');
          setShowBackButton(true);
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

// Màn hình Home
const HomeScreen = ({ navigation }) => {
  const { setHeaderTitle, setShowBackButton } = useContext(HeaderContext);

  React.useEffect(() => {
    setHeaderTitle('Home');
    setShowBackButton(true);
  }, []);

  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Screen 2"
        onPress={() => {
          setHeaderTitle('Screen 2');
          setShowBackButton(true);
          navigation.navigate('Screen2');
        }}
      />
    </View>
  );
};

// Màn hình Screen 2
const Screen2 = ({ navigation }) => {
  const { setHeaderTitle, setShowBackButton } = useContext(HeaderContext);

  React.useEffect(() => {
    setHeaderTitle('Screen 2');
    setShowBackButton(true);
  }, []);

  return (
    <View style={styles.screen}>
      <Text>Screen 2</Text>
      <Button
        title="Go to Screen 3"
        onPress={() => {
          setHeaderTitle('Screen 3');
          setShowBackButton(true);
          navigation.navigate('Screen3');
        }}
      />
    </View>
  );
};

// Màn hình Screen 3
const Screen3 = ({ navigation }) => {
  const { setHeaderTitle, setShowBackButton } = useContext(HeaderContext);

  React.useEffect(() => {
    setHeaderTitle('Screen 3');
    setShowBackButton(true);
  }, []);

  return (
    <View style={styles.screen}>
      <Text>Screen 3</Text>
      <Button
        title="Back to Init Screen"
        onPress={() => {
          setHeaderTitle('Init Screen');
          setShowBackButton(false);
          navigation.navigate('Init');
        }}
      />
    </View>
  );
};

const Stack = createStackNavigator();

// Wrapper để kết hợp Header với Stack Navigator
const AppWrapper = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Init" component={InitScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Screen2" component={Screen2} />
        <Stack.Screen name="Screen3" component={Screen3} />
      </Stack.Navigator>
    </View>
  );
};

// Entry point của ứng dụng
export default function App() {
  return (
    <HeaderProvider>
      <NavigationContainer>
        <AppWrapper />
      </NavigationContainer>
    </HeaderProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: '#6200EE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
