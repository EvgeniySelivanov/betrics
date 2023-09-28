import React, { createContext, useContext, useState } from 'react';
import { CONSTANTS } from '../constants';
export const AppStateContext = createContext();
export const AppStateProvider = ({ children }) => {
  const [level, setLevelUp] = useState(1);

  const updateLevel = (newData) => {
    setLevelUp(newData);
  };

  const contextValue = {
    level:level,
    setLevelUp:setLevelUp,
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};
