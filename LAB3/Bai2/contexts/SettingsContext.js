// contexts/SettingsContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { SQLiteContext } from './SQLiteContext';
import * as SQLite from 'expo-sqlite';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const db = SQLite.openDatabaseAsync('notes.db');

  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const initializeSettings = async () => {
      try {
        await db.withTransactionAsync(async (tx) => {
          // Tạo bảng settings nếu chưa tồn tại
          await tx.executeSqlAsync(
            `CREATE TABLE IF NOT EXISTS settings (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              darkMode INTEGER,
              fontSize INTEGER
            );`
          );

          // Lấy dữ liệu settings hiện tại
          const { rows } = await tx.executeSqlAsync(
            'SELECT * FROM settings WHERE id = 1;'
          );

          if (rows.length > 0) {
            setDarkMode(!!rows.item(0).darkMode);
            setFontSize(rows.item(0).fontSize);
          } else {
            // Khởi tạo bản ghi settings mặc định nếu chưa có
            await tx.executeSqlAsync(
              'INSERT INTO settings (id, darkMode, fontSize) VALUES (1, ?, ?);',
              [0, 16]
            );
          }
        });
      } catch (error) {
        console.error('Error initializing settings:', error);
      }
    };

    initializeSettings();
  }, []);

  const updateSettings = async (newDarkMode, newFontSize) => {
    setDarkMode(newDarkMode);
    setFontSize(newFontSize);

    try {
      await db.withTransactionAsync(async (tx) => {
        await tx.executeSqlAsync(
          'UPDATE settings SET darkMode = ?, fontSize = ? WHERE id = 1;',
          [newDarkMode ? 1 : 0, newFontSize]
        );
      });
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <SettingsContext.Provider value={{ darkMode, fontSize, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
