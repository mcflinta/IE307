// src/config/axiosConfig.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './config';
// Tạo instance của axios với baseURL
const instance = axios.create({
  baseURL: `${API_BASE_URL}/api`, // Đảm bảo địa chỉ IP và cổng đúng
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
