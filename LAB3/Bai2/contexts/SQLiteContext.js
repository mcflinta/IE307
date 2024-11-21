// contexts/SQLiteContext.js
import React, { createContext } from 'react';
import * as SQLite from 'expo-sqlite';

export const SQLiteContext = createContext();

export const SQLiteProvider = ({ children }) => {
  const db = SQLite.openDatabaseAsync('notes.db');

  return (
    <SQLiteContext.Provider value={db}>
      {children}
    </SQLiteContext.Provider>
  );
};
