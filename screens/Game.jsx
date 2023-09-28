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
import Goal from '../components/Goal';
const bgImage = require('../assets/bgGame.png');
const Space = styled(ImageBackground)`
  flex: 1;
  margin-top: 25px;
  margin-bottom: 25px;
  overflow: hidden;
`;
const ScoreText = styled.Text`
  position: absolute;
  bottom: 23px;
  right: 50px;
  color: #ffffff;
  font-size: 50px;
  font-weight: 700;
`;

const Game = () => {
  const contextValue = useContext(AppStateContext);
  const { level, updateLevel, isGameRun, updateGame } = contextValue;
  const [rad, setRad] = useState(0);
  const [deg, setDeg] = useState(0);
  const ballPosition = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;

  const getTanDeg = (value) => {
    setRad((value * Math.PI) / 180);
    setDeg(value);
  };

  const calculateEndPosition = (y, currentBounce) => {
    let endX = 0;
    // Расчет конечных координат
    // Мяч достигнет правого края экрана
    if (deg > 0) {
      endX = CONSTANTS.SCREEN_WIDTH / 2 - 25;
    } else if (deg < 0) {
      endX = -CONSTANTS.SCREEN_WIDTH / 2 + 25;
    } else if (deg === 0) {
      endX = 0;
    }
    const endY = y - CONSTANTS.BALL_POSITION.y - 25 + endX * Math.tan(rad);
    return { x: endX, y: endY };
  };

  const moveBall = () => {
    if (isGameRun&&ballPosition.y._value>-504) {
      const endPosition = calculateEndPosition(ballPosition.y._value);
      Animated.timing(ballPosition, {
        toValue: endPosition,
        duration: CONSTANTS.GAME_SPEED, // Длительность анимации в миллисекундах
        useNativeDriver: false, // Используем JavaScript анимацию
        easing: Easing.linear,
      }).start(() => {
        if (isGameRun) {
          moveBallBounce();
        }
      });
    }
  };
  const moveBallBounce = () => {
    if (isGameRun&&ballPosition.y._value>-504) {
      const endPosition = calculateEndPosition(ballPosition.y._value);
      Animated.timing(ballPosition, {
        toValue: { x: endPosition.x * -1, y: endPosition.y },
        duration: CONSTANTS.GAME_SPEED, // Длительность анимации в миллисекундах
        useNativeDriver: false, // Используем JavaScript анимацию
        easing: Easing.linear,
      }).start(() => {
        if (isGameRun) {
          moveBall();
        }
      });
    }
  };
  
  //check colisions
  useEffect(() => {
    ballPosition.addListener((value) => {
      const xPositionBall = value.x;
      const yPositionBall = value.y;
      console.log(value.y);
      if (
        xPositionBall >= -CONSTANTS.GOAL_WIDTH / 2 &&
        xPositionBall <= CONSTANTS.GOAL_WIDTH / 2 &&
        yPositionBall <= -504&&yPositionBall >= -550
      ) {
        resetGame(); // Вызывайте resetGame после попадания мяча в ворота
        updateLevel((level) => level + 1);
      }
    });
    return () => {
      ballPosition.removeAllListeners();
      
    };
  }, [ballPosition,level]);


  const resetGame = async () => {
    ballPosition.removeAllListeners();
    ballPosition.stopAnimation();
    await ballPosition.setValue({ x: 0, y: 0 });
    updateGame(true);
    // moveBall();
  };
  const gameOver = async () => {
    await updateGame(false);
    console.log('game over');
    ballPosition.stopAnimation();
    ballPosition.setValue({
      x: 0,
      y: 0,
    });
  };
  const startGame = async () => {
    await updateGame(true);
    console.log('start game');
    await ballPosition.setValue({
      x: 0,
      y: 0,
    });
    moveBall();
  };
  return (
    <TouchableWithoutFeedback onPress={startGame}>
      <Space source={bgImage}>
        <ScoreText>Level: {level}</ScoreText>
        <StartMessage isGameRun={isGameRun} />
        <RangeSlider getTanDeg={getTanDeg} />
        <Goal />
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
