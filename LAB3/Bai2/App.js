// App.js
import React from 'react';
import { SQLiteProvider } from './contexts/SQLiteContext';
import { SettingsProvider } from './contexts/SettingsContext';
import MainNavigation from './navigation/MainNavigation';

export default function App() {
  return (
    <SQLiteProvider>
      <SettingsProvider>
        <MainNavigation />
      </SettingsProvider>
    </SQLiteProvider>
  );
}
