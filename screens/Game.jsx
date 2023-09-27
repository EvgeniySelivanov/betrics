import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Animated,
  View,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
  Easing,
} from 'react-native';
import { CONSTANTS } from '../constants';
import { AppStateContext } from '../helpers/AppStateContext';
import { Audio } from 'expo-av';
import styled from 'styled-components/native';
import StartMessage from '../components/StartMessage';
import Ball from '../components/Ball';
import RangeSlider from '../components/RangeSlider';
const bgImage = require('../assets/bgGame.png');
const Space = styled(ImageBackground)`
  flex: 1;
  margin-top: 25px;
  margin-bottom: 25px;
  overflow: hidden;
`;
const ScoreText = styled.Text`
  position: absolute;
  top: 43px;
  left: 110px;
  color: #ffffff;
  font-size: 50px;
  font-weight: 700;
`;

const Game = () => {
  const [isGameRun, setIsGameRun] = useState(false);
  const [rad, setRad] = useState(0);
  const [deg, setDeg] = useState(0);

  const ballPosition = useRef(new Animated.ValueXY(0)).current;

  const getRandom = () => {
    let random = Math.floor(Math.random() * (300 - 1 + 1)) + 1;
    return random;
  };

  const getTanDeg = (value) => {
    setRad((value * Math.PI) / 180);
    setDeg(value);
  };

  useEffect(() => {
    calculateEndPosition();
  }, [rad]);

  const calculateEndPosition = () => {
    let endX=0;
    // Расчет конечных координат
    // Мяч достигнет правого края экрана
    if (deg > 0) {
       endX = CONSTANTS.SCREEN_WIDTH / 2 - 25;
    }else if(deg < 0){
       endX = -CONSTANTS.SCREEN_WIDTH / 2 +25;
    }
    else if(deg === 0){
       endX = 0;
    }

    const endY = -CONSTANTS.BALL_POSITION.y - 25 + endX * Math.tan(rad);
    return { x: endX, y: endY };
  };

  const endPosition = calculateEndPosition();
  console.log('rad>>>>', rad);
  console.log('Math.tan(rad)>>> ', Math.tan(rad));
  console.log('endPosition>>> ', endPosition);

  const moveBall = () => {
    if (isGameRun) {
      Animated.timing(ballPosition, {
        toValue: endPosition,
        duration: CONSTANTS.GAME_SPEED, // Длительность анимации в миллисекундах
        useNativeDriver: false, // Используем JavaScript анимацию
        easing: Easing.linear,
      }).start(setIsGameRun(false));
    }
  };

  const startGame = () => {
    setIsGameRun(true);
    moveBall();
    console.log(isGameRun);
  };
  return (
    <TouchableWithoutFeedback onPress={startGame}>
      <Space source={bgImage}>
        <ScoreText>Level</ScoreText>
        <StartMessage isGameRun={isGameRun} />
        <RangeSlider getTanDeg={getTanDeg} />
        <Animated.View
          style={[
            { position: 'absolute' },
            { transform: ballPosition.getTranslateTransform() },
          ]}
        >
          <Ball />
        </Animated.View>
      </Space>
    </TouchableWithoutFeedback>
  );
};

export default Game;
