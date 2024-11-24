import React, { createContext } from 'react';
import * as SQLite from 'expo-sqlite';

export const SQLiteContext = createContext();

export const SQLiteProvider = ({ children }) => {
  const db = SQLite.openDatabaseSync('notes.db'); // Không có 'Sync' trong Expo SQLite

  return (
    <SQLiteContext.Provider value={db}>
      {children}
    </SQLiteContext.Provider>
  );
};
