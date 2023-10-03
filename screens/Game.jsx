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
let withObtaclesRandom =
  Math.floor(
    Math.random() *
      (CONSTANTS.SCREEN_WIDTH / 2.5 - CONSTANTS.SCREEN_WIDTH / 5 + 1)
  ) +
  CONSTANTS.SCREEN_WIDTH / 5;
const Game = () => {
  const contextValue = useContext(AppStateContext);
  const {
    records,
    gameSpeed,
    deg,
    level,
    updateLevel,
    isGameRun,
    updateGame,
    updateDeg,
    updateRec,
  } = contextValue;
  const ballPosition = useRef(
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

  const moveBall = () => {
    if (isGameRun && ballPosition.y._value > -504) {
      const endPosition = calculateEndPosition(ballPosition.y._value);
      Animated.timing(ballPosition, {
        toValue: endPosition,
        duration: gameSpeed, // Длительность анимации в миллисекундах
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
        duration: gameSpeed, // Длительность анимации в миллисекундах
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
      let xFactBallPosition = CONSTANTS.BALL_POSITION.x + value.x;
      let yFactBallPosition = CONSTANTS.BALL_POSITION.y + value.y;
      //  console.log('value.x:',xFactBallPosition,'value.y:',yFactBallPosition);
      if (
        (xPositionBall <= -CONSTANTS.GOAL_WIDTH / 2 &&
          yPositionBall <= -504 &&
          yPositionBall >= -550) ||
        (xPositionBall >= CONSTANTS.GOAL_WIDTH / 2 &&
          yPositionBall <= -504 &&
          yPositionBall >= -550) ||
        (xFactBallPosition >= xPositionObtacles &&
          xFactBallPosition <= xPositionObtacles + withObtaclesRandom &&
          yFactBallPosition <= yPositionObtacles &&
          yFactBallPosition >= yPositionObtacles - CONSTANTS.BALL_DIAMETER)
      ) {
        gameOver();
      }
      if (
        xPositionBall >= -CONSTANTS.GOAL_WIDTH / 2 &&
        xPositionBall <= CONSTANTS.GOAL_WIDTH / 2 &&
        yPositionBall <= -504 &&
        yPositionBall >= -550 &&
        isGameRun
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
    withObtaclesRandom =
      Math.floor(
        Math.random() *
          (CONSTANTS.SCREEN_WIDTH / 2.5 - CONSTANTS.SCREEN_WIDTH / 5 + 1)
      ) +
      CONSTANTS.SCREEN_WIDTH / 5;
    await ballPosition.setValue({ x: 0, y: 0 });
    updateGame(true);
    console.log('reset game');
  };
  const gameOver = async () => {
    await updateGame(false);
    ballPosition.removeAllListeners();
    ballPosition.stopAnimation();
    ballPosition.setValue({
      x: 0,
      y: 0,
    });

    xPositionObtacles = Math.floor(Math.random() * (190 - 90 + 1)) + 90;
    yPositionObtacles = Math.floor(Math.random() * (400 - 200 + 1)) + 200;
    withObtaclesRandom =
      Math.floor(
        Math.random() *
          (CONSTANTS.SCREEN_WIDTH / 2.5 - CONSTANTS.SCREEN_WIDTH / 5 + 1)
      ) +
      CONSTANTS.SCREEN_WIDTH / 5;

    if (level > 1) {
      updateRec([...records, level]);
    }

    updateLevel(0);
    updateDeg(0);
    console.log('game over');
  };
  const startGame = async () => {
    await updateGame(true);

    if (ballPosition.y._value === 0 || ballPosition.y._value < -510) {
      ballPosition.setValue({
        x: 0,
        y: 0,
      });
      moveBall();
    }
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
        <Obtacles
          yPositionObtacles={yPositionObtacles}
          xPositionObtacles={xPositionObtacles}
          withObtaclesRandom={withObtaclesRandom}
        />
      </Space>
    </TouchableWithoutFeedback>
  );
};

export default Game;
