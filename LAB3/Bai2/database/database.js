// database/database.js
import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabase('notes.db');
const db = await SQLite.openDatabaseAsync('notes');
export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        darkMode INTEGER,
        fontSize INTEGER
      );`
    );
  });
};

export const getDb = () => {
  return db;
};
