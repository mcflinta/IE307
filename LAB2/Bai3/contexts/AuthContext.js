// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    // Điều kiện đăng nhập (sử dụng email sinh viên và mật khẩu tên viết liền không dấu)
    if (email === '1' && password === '1') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid email or password');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
