import React, { createContext, useContext, useState } from 'react';
import { CONSTANTS } from '../constants';
export const AppStateContext = createContext();
export const AppStateProvider = ({ children }) => {
  const [level, setLevelUp] = useState(1);
  const [isGameRun, setIsGameRun] = useState(false);

  const updateLevel = (newData) => {
    setLevelUp(newData);
  };
  const updateGame = (newData) => {
    console.log('context run');
    setIsGameRun(newData);
  };

  const contextValue = {
    level:level,
    updateLevel:updateLevel,
    isGameRun:isGameRun,
    updateGame:updateGame,
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};
