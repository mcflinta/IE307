// Mai Quốc Cường - 21521901
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import EmailIcon from '../assets/svg/email';
import PasswordIcon from '../assets/svg/password';
import UserIcon from '../assets/svg/user';

const IconTextInput = ({ icon: Icon, placeholder, ...props }) => (
  <View style={styles.iconInputContainer}>
    <Icon style={styles.icon} />
    <TextInput
      style={styles.iconInput}
      placeholder={placeholder}
      placeholderTextColor="#888"
      {...props}
    />
  </View>
);

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Account Created');
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/logo.png')}
        style={styles.logo} 
      />
      <Text style={styles.title}>Create New Account</Text>
      <IconTextInput
        icon={UserIcon}
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#888"
      />
      <IconTextInput
        icon={EmailIcon}
        placeholder="Enter email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#888"
      />
      <IconTextInput
        icon={PasswordIcon}
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#888"
      />
      <IconTextInput
        icon={PasswordIcon}
        placeholder="Confirm password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>CREATE</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account? 
        <Text 
          style={styles.loginNowText} 
          onPress={() => navigation.navigate('Login')}
        >
          Login now!
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  iconInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
  },
  icon: {
    marginRight: 10,
  },
  iconInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#FF7F32',
    padding: 14,
    borderRadius: 8,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 20,
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  loginNowText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
