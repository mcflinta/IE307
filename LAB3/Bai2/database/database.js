// database/database.js
import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabase('notes.db');
const db = await SQLite.openDatabaseAsync('notes.db');
export const createTables = () => {
  // db.withTransactionSync(() => {
  //   db.runAsync(
  //     `CREATE TABLE IF NOT EXISTS notes (
  //       id INTEGER PRIMARY KEY AUTOINCREMENT,
  //       title TEXT,
  //       content TEXT
  //     );`
  //   );
  //   db.runAsync(
  //     `CREATE TABLE IF NOT EXISTS settings (
  //       id INTEGER PRIMARY KEY AUTOINCREMENT,
  //       darkMode INTEGER,
  //       fontSize INTEGER
  //     );`
  //   );
  // });
  db.execAsync(
    `CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT
    );`
  );
  db.execAsync(
    `CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      darkMode INTEGER,
      fontSize INTEGER
    );`
  );
};

export const getDb = () => {
  return db;
};
