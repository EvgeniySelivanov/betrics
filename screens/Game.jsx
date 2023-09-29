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
import Obtacles from '../components/Obtacles';
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
  right: 30px;
  color: #ffffff;
  font-size: 40px;
  font-weight: 700;
`;
let xPositionObtacles = Math.floor(Math.random() * (190 - 90 + 1)) + 90;
let yPositionObtacles = Math.floor(Math.random() * (400 - 200 + 1)) + 200;

const Game = () => {
  const contextValue = useContext(AppStateContext);
  const { deg, level, updateLevel, isGameRun, updateGame,updateDeg } = contextValue;
  const ballPosition = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;
  const obtaclesPosition = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;

  const calculateEndPosition = (y, currentBounce) => {
    const rad = (deg * Math.PI) / 180;
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
  const moveObtacles = () => {
    if (isGameRun) {
      Animated.timing(obtaclesPosition, {
        toValue: { x: 0, y: 0 },
        duration: CONSTANTS.GAME_SPEED, // Длительность анимации в миллисекундах
        useNativeDriver: false, // Используем JavaScript анимацию
        easing: Easing.linear,
      }).start();
    }
  };
  const moveBall = () => {
    if (isGameRun && ballPosition.y._value > -504) {
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
    if (isGameRun && ballPosition.y._value > -504) {
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
      console.log('CONSTANTS.GOAL_WIDTH / 2', CONSTANTS.GOAL_WIDTH / 2);
      console.log('value.y>>', value.y);
      console.log('value.x>>', value.x);

      if (
        (xPositionBall <= -CONSTANTS.GOAL_WIDTH / 2 &&
          yPositionBall <= -504 &&
          yPositionBall >= -550) ||
        (xPositionBall >= CONSTANTS.GOAL_WIDTH / 2 &&
          yPositionBall <= -504 &&
          yPositionBall >= -550)
      ) {
        gameOver();
      } else if (
        xPositionBall >= -CONSTANTS.GOAL_WIDTH / 2 &&
        xPositionBall <= CONSTANTS.GOAL_WIDTH / 2 &&
        yPositionBall <= -504 &&
        yPositionBall >= -550
      ) {
        resetGame();
        updateLevel((level) => level + 1);
      }
    });
    return () => {
      ballPosition.removeAllListeners();
    };
  }, [ballPosition, level, isGameRun]);

  const resetGame = async () => {
    ballPosition.removeAllListeners();
    ballPosition.stopAnimation();
    xPositionObtacles = Math.floor(Math.random() * (190 - 90 + 1)) + 90;
    yPositionObtacles = Math.floor(Math.random() * (400 - 200 + 1)) + 200;
    await ballPosition.setValue({ x: 0, y: 0 });
    
    updateGame(true);
    console.log('reset game');
  };
  const gameOver = async () => {
    ballPosition.removeAllListeners();
    ballPosition.stopAnimation();
    await ballPosition.setValue({
      x: 0,
      y: 0,
    });
    xPositionObtacles = Math.floor(Math.random() * (190 - 90 + 1)) + 90;
    yPositionObtacles = Math.floor(Math.random() * (400 - 200 + 1)) + 200;
    updateGame(false);
    updateLevel(0);
    updateDeg(0);
    console.log('game over');
  };
  const startGame = async () => {
    await updateGame(true);
    ballPosition.setValue({
      x: 0,
      y: 0,
    });
    moveBall();
    console.log('start game');
  };
  return (
    <TouchableWithoutFeedback onPress={startGame}>
      <Space source={bgImage}>
        <ScoreText>Level: {level}</ScoreText>
        <StartMessage isGameRun={isGameRun} />
        <RangeSlider />
        <Goal />
        <Animated.View
          style={[
            { position: 'absolute' },
            { transform: ballPosition.getTranslateTransform() },
          ]}
        >
          <Ball />
        </Animated.View>
        <Animated.View
          style={[
            { position: 'absolute' },
            { transform: obtaclesPosition.getTranslateTransform() },
          ]}
        >
          <Obtacles
            yPositionObtacles={yPositionObtacles}
            xPositionObtacles={xPositionObtacles}
          />
        </Animated.View>
      </Space>
    </TouchableWithoutFeedback>
  );
};

export default Game;
