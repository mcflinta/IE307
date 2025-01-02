// services/api.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export const API_URL = 'http://149.28.146.58:3000'; // Thay bằng địa chỉ IP của bạn
// export const API_URL = 'http://192.168.105.35:3000';

export const API_URL = 'http://172.31.158.151:3000';

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      config.headers.Authorization = user.token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
