import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {  Text, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const passwordInputRef = React.useRef(null);
  const [isValid, setIsValid] = React.useState(false);
  // const { login } = useContext(AuthContext);
  useEffect(() => {
    setIsValid(email.trim() !== '' && password.trim() !== ''); // Đảm bảo cả hai trường đều không rỗng
  }, [email, password]);
  const handleLogin = () => {
    login(email, password);
  };
  const handleNext = () => {
    // console.log("Password:", password);
    navigation.navigate('LoadingScreen', {
      email: email.trim(),
      password: password.trim(),
      fromScreen: 'LoginScreen', // Thêm thông tin màn hình nguồn
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleEmail}>Email or username</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: email ? '#808080' : '#4c4c4c',
            color: '#fff'
          }
        ]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType='next'
        autoCorrect={false}
        cursorColor="#fff"
        placeholder="Enter your email"
        placeholderTextColor="#999"
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      ></TextInput>
      <Text style={styles.titlePw}>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={passwordInputRef}
          style={[
            styles.input,
            {
              backgroundColor: password ? '#808080' : '#4c4c4c',
              color: '#fff'
            }
          ]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          returnKeyType="done"
          autoCorrect={false}
          cursorColor="#fff"
          placeholder="Enter your password"
          placeholderTextColor="#999" />
        <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
        <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#fff"/>
        </TouchableOpacity>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            { backgroundColor: isValid ? '#fff' : '#4c4c4c' },
          ]}
          onPress={handleNext}
          disabled={!isValid}
        >
          <Text
            style={[
              styles.nextButtonText,
              { color: isValid ? '' : '#333333' },
            ]}
          >
            Log in
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  titleEmail: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  titlePw: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
  },
  inputContainer: {
    position: 'relative',
    marginTop: 10,
    marginBottom: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 23,
  },
  input: {
    marginTop: 10,
    height: 50,
    paddingLeft: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  nextButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    paddingHorizontal: 25,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

});
export default LoginScreen;
