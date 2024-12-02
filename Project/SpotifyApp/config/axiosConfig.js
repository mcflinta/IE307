// src/config/axiosConfig.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tạo instance của axios với baseURL
const instance = axios.create({
  baseURL: 'http://149.28.146.58:3000/api', // Đảm bảo địa chỉ IP và cổng đúng
});

// Thêm interceptor để chèn token vào mỗi yêu cầu
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
