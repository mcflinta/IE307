import React, { createContext, useContext, useState } from 'react';

const CurrentScreenContext = createContext();

export const CurrentScreenProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('SignUpScreen');

  return (
    <CurrentScreenContext.Provider value={{ currentScreen, setCurrentScreen }}>
      {children}
    </CurrentScreenContext.Provider>
  );
};

export const useCurrentScreen = () => useContext(CurrentScreenContext);
