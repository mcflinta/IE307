import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
  const { user } = props;
  
  // Demo: user = { name: "mai cyong", photoURL: "https://path-to-image.jpg" }
  
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Header của ngăn kéo */}
      <View style={styles.headerContainer}>
        <View style={styles.userInfoContainer}>
          <Image 
            source={{ uri: user?.photoURL || 'https://via.placeholder.com/70' }} 
            style={styles.avatar} 
          />
          <Text style={styles.username}>{user?.name || 'User Name'}</Text>
          <TouchableOpacity>
            <Text style={styles.viewProfileText}>View profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Các item bên dưới */}
      <View style={styles.menuContainer}>
        <DrawerItem
          label="Add account"
          labelStyle={styles.drawerItemLabel}
          onPress={() => {}}
          icon={() => (
            <Text style={styles.iconText}>+</Text> // Hoặc import icon từ SVG/Font
          )}
        />
        
        <DrawerItem
          label="What's new"
          labelStyle={styles.drawerItemLabel}
          onPress={() => {}}
          icon={() => (
            <Text style={styles.iconText}>⚡</Text>
          )}
        />

        <DrawerItem
          label="Recents"
          labelStyle={styles.drawerItemLabel}
          onPress={() => {}}
          icon={() => (
            <Text style={styles.iconText}>⏱</Text>
          )}
        />

        <DrawerItem
          label="Settings and privacy"
          labelStyle={styles.drawerItemLabel}
          onPress={() => {}}
          icon={() => (
            <Text style={styles.iconText}>⚙</Text>
          )}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    paddingTop: 0,
  },
  headerContainer: {
    padding: 16,
    borderBottomColor: '#333',
    borderBottomWidth: 0.5,
  },
  userInfoContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewProfileText: {
    color: '#999',
    fontSize: 14,
    marginTop: 4,
  },
  menuContainer: {
    marginTop: 16,
  },
  drawerItemLabel: {
    color: '#fff',
    fontSize: 15,
    marginLeft: -20, // tuỳ chỉnh vị trí text
  },
  iconText: {
    color: '#fff',
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
});

export default CustomDrawerContent;
