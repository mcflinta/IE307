import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// 21521901 - Mai Quốc Cường
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('userInfo');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUserInfo(JSON.parse(storedUser));
      }
    };
    loadData();
  }, []);

  const register = async (newUserData) => {
    setIsLoading(true);
    try {
      // Lấy danh sách user đã có
      const usersStr = await AsyncStorage.getItem('users');
      let users = [];
      if (usersStr) {
        users = JSON.parse(usersStr);
      }
      const existed = users.find(
        (u) =>
          u.username === newUserData.username ||
          u.email === newUserData.email
      );
      if (existed) {
        throw new Error('User already exists locally!');
      }
      // Thêm user
      users.push(newUserData);
      // Lưu lại xuống AsyncStorage
      await AsyncStorage.setItem('users', JSON.stringify(users));
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const usersStr = await AsyncStorage.getItem('users');
      let users = [];
      if (usersStr) {
        users = JSON.parse(usersStr);
      }

      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!foundUser) {
        throw new Error('Wrong username or password');
      }

      const localToken = `local-token-of-${username}`;
      setToken(localToken);
      setUserInfo(foundUser);

      await AsyncStorage.setItem('token', localToken);
      await AsyncStorage.setItem('userInfo', JSON.stringify(foundUser));
    } catch (err) {
      console.error(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
//21021901 - Mai Quốc Cường
  const logout = async () => {
    setToken(null);
    setUserInfo(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userInfo');
  };

  const value = {
    token,
    userInfo,
    isLoading,
    login,
    register,
    logout,
    setUserInfo
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
