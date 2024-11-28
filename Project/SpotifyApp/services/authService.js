import axios from '../config/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async ({ email, password }) => {
  const response = await axios.post('/login', { email, password });
  const { user, token } = response.data;

  if (token) {
    await AsyncStorage.setItem('userToken', token);
  } else {
    throw new Error('Token not received from server.');
  }

  if (user) {
    await AsyncStorage.setItem('userInfo', JSON.stringify(user));
  }

  return { user, token };
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
