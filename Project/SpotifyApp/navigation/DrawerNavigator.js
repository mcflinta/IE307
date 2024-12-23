// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import HomeTabs from './HomeTabs'; // Màn hình chính
// import CustomDrawerContent from '../components/CustomDrawerContent';
// import RecentScreen from '../screens/RecentScreen';
// const Drawer = createDrawerNavigator();

// const DrawerNavigator = ({ route }) => {
//   const { user, token } = route.params || {};

//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerStyle: {
//           backgroundColor: '#121212',
//         },
//         drawerActiveTintColor: '#1DB954',
//         drawerInactiveTintColor: '#fff',
//         drawerType: 'slide' // Thêm dòng này
//       }}
//       drawerContent={(props) => <CustomDrawerContent {...props} user={user} token={token} />}
//     >
//       <Drawer.Screen 
//         name="HomeTabs" 
//         component={HomeTabs}
//         initialParams={{ user, token }}
//         options={{ title: 'Home' }} 
//       />
//       <Drawer.Screen
//         name="Recents"
//         component={RecentScreen}
//         initialParams={{ user, token }}
//         options={{ title: 'Home' }}
//         screenOptions={{ headerShown: true }}  
//       />
//     </Drawer.Navigator>
//   );
// };

// export default DrawerNavigator;

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import thư viện icon
import HomeTabs from './HomeTabs'; // Màn hình chính
import CustomDrawerContent from '../components/CustomDrawerContent';
import RecentScreen from '../screens/RecentScreen';
import SettingsAndPrivacyScreen from '../screens/SettingAndPrivacyScreen';
const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ route }) => {
  const { user, token } = route.params || {};

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#121212',
        },
        drawerActiveTintColor: '#1DB954',
        drawerInactiveTintColor: '#fff',
        drawerType: 'slide',
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} user={user} token={token} />}
    >
      {/* Màn hình HomeTabs */}
      <Drawer.Screen 
        name="HomeTabs" 
        component={HomeTabs}
        initialParams={{ user, token }}
        options={{ 
          title: 'Home',
          headerShown: false,
        }} 
      />

      {/* Màn hình Recents */}
      <Drawer.Screen
        name="Recents"
        component={RecentScreen}
        initialParams={{ user, token }}
        options={({ navigation }) => ({
          title: 'Recents',
          
          headerShown: true, // Hiển thị header
          headerStyle: {
            backgroundColor: '#121212', // Nền header
          },
          headerTintColor: '#fff', // Màu chữ trong header
          headerTitleAlign: 'center', // Tiêu đề căn giữa
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()} // Xử lý quay lại
            >
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="SettingsAndPrivacy"
        component={SettingsAndPrivacyScreen}
        initialParams={{ user, token }}
        options={({ navigation }) => ({
          title: 'Settings',
          
          headerShown: true, // Hiển thị header
          headerStyle: {
            backgroundColor: '#1c1c1c', // Nền header
          },
          headerTintColor: '#fff', // Màu chữ trong header
          headerTitleAlign: 'center', // Tiêu đề căn giữa
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()} // Xử lý quay lại
            >
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 16, // Khoảng cách từ lề trái
  },
});

export default DrawerNavigator;
