import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

import GoogleIcon from '../assets/svg/google';
import FacebookIcon from '../assets/svg/facebook';

import EmailIcon from '../assets/svg/email';
import PasswordIcon from '../assets/svg/password';

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

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/logo.png')}
        style={styles.logo} 
      />
      <Text style={styles.title}>Welcome</Text>

      <IconTextInput
        icon={EmailIcon}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <IconTextInput
        icon={PasswordIcon}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.button} onPress={() => login(email, password)}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log('Forgot password pressed')}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <GoogleIcon fill="#4285F4" width={30} height={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FacebookIcon fill="#3b5998" width={30} height={30} />
        </TouchableOpacity>
      </View>

      <Text style={styles.registerText}>
        Don't have an account? 
        <Text 
          style={styles.signupText} 
          onPress={() => navigation.navigate('Register')}
        >
          Sign up here!
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
  forgotPasswordText: {
    color: 'pink',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  socialButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#ddd',
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  registerText: {
    marginTop: 20,
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  signupText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;