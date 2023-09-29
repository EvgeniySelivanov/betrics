import React, { useContext, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import styled from 'styled-components/native';
import { CONSTANTS } from '../constants';
import { AppStateContext } from '../helpers/AppStateContext';
import ResetBtn from '../components/Btns/ResetBtn';
import GameSpeed from '../components/Btns/GameSpeed';
import VibroBtn from '../components/Btns/VibroBtn';
import SoundBtn from '../components/Btns/SoundBtn';

const bgImage = require('../assets/bgMenu.png');
const Space = styled(ImageBackground)`
  flex: 1;
  margin-top: 25px;
  margin-bottom: 25px;
  overflow: hidden;
  justify-content: center;
  align: center;
`;
const StyledSetting = styled.Text`
  margin-top: 10px;
  color: #ffffff;
  font-size: 50px;
  font-weight: 700;
  text-align: center;
  padding: 7px;
`;
const Setting = () => {
  const contextValue = useContext(AppStateContext);
  const {
    gameSpeed,
    vibration,
    sound,
    music,
    updateGameSpeed,
    updateVibration,
    updateMusic,
    updateSound,
  } = contextValue;
  const changeVibro = () => {
    if (vibration) {
      updateVibration(false);
    } else {
      updateVibration(true);
    }
  };
  const changeGameSpeed = () => {
    if (gameSpeed >= 1000) {
      updateGameSpeed((gameSpeed) => gameSpeed - 500);
    }
  };
  const defaultOption = () => {
    updateVibration(false);
    updateGameSpeed(CONSTANTS.GAME_SPEED);
    stopMusic();
  };
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/music.mp3')
    );
    await updateSound(sound);
    await sound.playAsync(); // Проигрывание аудио
  }
  const stopMusic = async () => {
    if (sound) {
      await sound.stopAsync();
    }

    updateMusic(false);
  };
  const onMusic = () => {
    console.log('work onMusic', music);
    if (music) {
      stopMusic();
      updateMusic(false);
    }
    if (!music) {
      updateMusic(true);
      playSound();
    }
  };

  return (
    <Space source={bgImage}>
      <StyledSetting>Setting</StyledSetting>
      <GameSpeed
        onPress={changeGameSpeed}
        text={'Game speed:'}
        gameSpeed={4-gameSpeed/1000}
      />
      <VibroBtn onPress={changeVibro} vibro={vibration} text={'Vibration'} />
      <SoundBtn onPress={onMusic} music={music} text={'Music'} />
      <ResetBtn onPress={defaultOption} text={'Reset options'} />
    </Space>
  );
};

export default Setting;
