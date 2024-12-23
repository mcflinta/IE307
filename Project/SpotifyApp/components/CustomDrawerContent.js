// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/Feather'; // Feather là 1 trong các bộ icon
// const CustomDrawerContent = (props) => {
//   const { user } = props;
  
//   // Demo: user = { name: "mai cyong", photoURL: "https://path-to-image.jpg" }
  
//   return (
//     <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
//       {/* Header của ngăn kéo */}
//       <View style={styles.headerContainer}>
//         <View style={styles.userInfoContainer}>
//           <Image 
//             source={{ uri: user?.photoURL || 'https://via.placeholder.com/70' }} 
//             style={styles.avatar} 
//           />
//           <Text style={styles.username}>{user?.name || 'User Name'}</Text>
//           <TouchableOpacity>
//             <Text style={styles.viewProfileText}>View profile</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Các item bên dưới */}
//       <View style={styles.menuContainer}>
//       <DrawerItem
//         label="Add account"
//         labelStyle={styles.drawerItemLabel}
//         onPress={() => {}}
//         icon={() => <Icon name="user-plus" size={24} color="#fff" />}
//       />

//       <DrawerItem
//         label="What's new"
//         labelStyle={styles.drawerItemLabel}
//         onPress={() => {}}
//         icon={() => <Icon name="zap" size={24} color="#fff" />}
//       />

//       <DrawerItem
//         label="Recents"
//         labelStyle={styles.drawerItemLabel}
//         onPress={() => {}}
//         icon={() => <Icon name="clock" size={24} color="#fff" />}
//       />

//       <DrawerItem
//         label="Settings and privacy"
//         labelStyle={styles.drawerItemLabel}
//         onPress={() => {}}
//         icon={() => <Icon name="settings" size={24} color="#fff" />}
//       />
//       </View>
//     </DrawerContentScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#121212',
//     flex: 1,
//     paddingTop: 0,
//   },
//   headerContainer: {
//     flexDirection: 'row', // Căn ngang các thành phần
//     alignItems: 'center', // Căn giữa theo chiều dọc
//     backgroundColor: '#000', // Nền đen như trong hình
//     padding: 16, // Khoảng cách từ lề
//   },
//   avatar: {
//     width: 50, 
//     height: 50,
//     borderRadius: 25, // Hình ảnh tròn
//     marginRight: 12, // Khoảng cách giữa avatar và text
//   },
//   textContainer: {
//     justifyContent: 'center',
//   },
//   username: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff', // Màu chữ trắng
//   },
//   viewProfileText: {
//     fontSize: 14,
//     color: '#aaa', // Màu xám nhạt
//   },
//   menuContainer: {
//     marginTop: 16,
//   },
//   drawerItemLabel: {
//     color: '#fff',
//     fontSize: 15,
//     marginLeft: -20, // tuỳ chỉnh vị trí text
//   },
//   iconText: {
//     color: '#fff',
//     fontSize: 18,
//     width: 24,
//     textAlign: 'center',
//   },
// });

// export default CustomDrawerContent;

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

const CustomDrawerContent = (props) => {
  const { user, navigation } = props; // Truyền navigation để điều hướng

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: user?.photoURL || 'https://via.placeholder.com/70' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{user?.name || 'User Name'}</Text>
          <TouchableOpacity>
            <Text style={styles.viewProfileText}>View profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => alert('Add account pressed!')} // Sự kiện khi ấn
        >
          <Icon name="user-plus" size={20} color="#fff" />
          <Text style={styles.menuItemText}>Add account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => alert("What's new pressed!")}
        >
          <Icon name="zap" size={20} color="#fff" />
          <Text style={styles.menuItemText}>What's new</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Recents')} // Điều hướng
        >
          <Icon name="clock" size={20} color="#fff" />
          <Text style={styles.menuItemText}>Recents</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('SettingsAndPrivacy')} // Điều hướng

        >
          <Icon name="settings" size={20} color="#fff" />
          <Text style={styles.menuItemText}>Settings and privacy</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c', // Nền đen
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#444',
    marginRight: 12,
  },
  userInfo: {
    justifyContent: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  viewProfileText: {
    fontSize: 14,
    color: '#aaa',
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
  },
});

export default CustomDrawerContent;
