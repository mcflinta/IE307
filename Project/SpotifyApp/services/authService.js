import axios from '../config/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tokenManager from './TokenManager';
export const loginUser = async ({ email, password }) => {
  // const response = await axios.post('/login', { email, password });
  // const { user, token } = response.data;

  // if (token) {
  //   await AsyncStorage.setItem('userToken', token);
  // } else {
  //   throw new Error('Token not received from server.');
  // }

  // if (user) {
  //   await AsyncStorage.setItem('userInfo', JSON.stringify(user));
  // }

  // return { user, token };
  try {
    const response = await axios.post('/login', { email, password });
    const { user, token } = response.data;
    console.log("authService", user);
    if (token) {
      await tokenManager.setToken(token); // Lưu token bằng TokenManager
    } else {
      throw new Error('Token not received from server.');
    }
  
    if (user) {
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
    }
  
    return { user, token };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    console.error('Error in loginUser:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const registerUser = async ({ email, password, gender, name }) => {
  const response = await axios.post('/register', { email, password, gender, name });
  const { user, token } = response.data;

  // if (token) {
  //   await AsyncStorage.setItem('userToken', token);
  // } else {
  //   throw new Error('Token not received from server.');
  // }

  // if (user) {
  //   await AsyncStorage.setItem('userInfo', JSON.stringify(user));
  // }

  return { user, token };
};
