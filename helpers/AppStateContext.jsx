import React, { createContext, useContext, useState } from 'react';
import { CONSTANTS } from '../constants';
export const AppStateContext = createContext();
export const AppStateProvider = ({ children }) => {
  const [records,setRecords]=useState([]);
  const [level, setLevelUp] = useState(1);
  const [deg, setDeg] = useState(0);
  const [isGameRun, setIsGameRun] = useState(false);

  const updateLevel = (newData) => {
    setLevelUp(newData);
  };
  const updateDeg = (newData) => {
    setDeg(newData);
  };
  const updateRec = (newData) => {
    setRecords(newData);
  };
  const updateGame = (newData) => {
    console.log('context run');
    setIsGameRun(newData);
  };

  const contextValue = {
    records:records,
    updateRec:updateRec,
    level:level,
    updateLevel:updateLevel,
    isGameRun:isGameRun,
    updateGame:updateGame,
    deg:deg,
    updateDeg:updateDeg,
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};
