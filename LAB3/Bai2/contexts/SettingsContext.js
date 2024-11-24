import React, { createContext, useState, useEffect, useContext } from 'react';
import { SQLiteContext } from './SQLiteContext';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const db = useContext(SQLiteContext); // Lấy DB từ SQLiteContext

  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const initializeSettings = async () => {
      db.withTransactionAsync(() => {
        // Tạo bảng nếu chưa tồn tại
        db.execAsync(
          `CREATE TABLE IF NOT EXISTS settings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            darkMode INTEGER,
            fontSize INTEGER
          );`
        );

        // Lấy dữ liệu settings hiện tại
        db.execAsync(
          'SELECT * FROM settings WHERE id = 1;',
          [],
          (_, { rows }) => {
            if (rows.length > 0) {
              const item = rows.item(0);
              setDarkMode(!!item.darkMode);
              setFontSize(item.fontSize);
            } else {
              // Nếu chưa có bản ghi, thêm bản ghi mặc định
              db.execAsync(
                'INSERT INTO settings (id, darkMode, fontSize) VALUES (1, ?, ?);',
                [0, 16]
              );
            }
          },
          (txObj, error) => {
            console.error('Error fetching settings:', error);
          }
        );
      });
    };

    initializeSettings();
  }, [db]);

  const updateSettings = (newDarkMode, newFontSize) => {
    setDarkMode(newDarkMode);
    setFontSize(newFontSize);

    db.withTransactionAsync(() => {
      db.execAsync(
        'UPDATE settings SET darkMode = ?, fontSize = ? WHERE id = 1;',
        [newDarkMode ? 1 : 0, newFontSize],
        () => {
          console.log('Settings updated successfully');
        },
        (txObj, error) => {
          console.error('Error updating settings:', error);
        }
      );
    });
  };

  return (
    <SettingsContext.Provider value={{ darkMode, fontSize, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
