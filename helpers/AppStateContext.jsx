import React, { createContext, useContext, useState } from 'react';
import { CONSTANTS } from '../constants';
export const AppStateContext = createContext();
export const AppStateProvider = ({ children }) => {
  const [bounce, setBounce] = useState(false);

  const updateBounce = (newData) => {
    console.log('useContext ');
    setBounce(newData);
  };

  const contextValue = {
    bounce:bounce,
    updateBounce:updateBounce,
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};
