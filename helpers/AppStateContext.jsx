import React, { createContext, useContext, useState } from 'react';
import { CONSTANTS } from '../constants';
export const AppStateContext = createContext();
export const AppStateProvider = ({ children }) => {
  const [records,setRecords]=useState([]);
  const [level, setLevelUp] = useState(1);
  const [deg, setDeg] = useState(0);
  const [isGameRun, setIsGameRun] = useState(false);
  const [vibration, setVibration] = useState(false);
  const [sound, setSound] = useState();
  const [music, setMusic] = useState(false);
  const [gameSpeed,setGameSpeed]=useState(CONSTANTS.GAME_SPEED);

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
  const updateMusic = (newData) => {
    setMusic(newData);
  };
  const updateSound = (newData) => {
    setSound(newData);
  };
  const updateVibration = (newData) => {
    setVibration(newData);
  };
  const updateGameSpeed = (newData) => {
    setGameSpeed(newData);
  };
  const contextValue = {
    vibration:vibration,
    gameSpeed:gameSpeed,
    music:music,
    sound:sound,
    records:records,
    updateMusic:updateMusic,
    updateSound:updateSound,
    updateVibration:updateVibration,
    updateGameSpeed:updateGameSpeed,
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
