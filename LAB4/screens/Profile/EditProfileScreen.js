import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
// 21521901 - Mai Quốc Cường
const EditProfileScreen = ({ route, navigation }) => {
  const { userData } = route.params;
  const { setUserInfo } = useContext(AuthContext);

  const [firstName, setFirstName] = useState(userData?.name?.firstname || '');
  const [lastName, setLastName]   = useState(userData?.name?.lastname || '');
  const [email, setEmail]         = useState(userData?.email || '');

  const handleSave = async () => {
    const updated = {
      ...userData,
      name: {
        firstname: firstName,
        lastname: lastName
      },
      email
    };
    setUserInfo(updated);
    Alert.alert('Success', 'Profile updated!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={{ color: '#fff', fontWeight: '600' }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16
  },
  label: {
    marginTop: 12,
    fontWeight: '600',
    color: '#333'
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 10,
    marginTop: 4
  },
  saveBtn: {
    marginTop: 24,
    backgroundColor: '#FF6600',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  }
};
