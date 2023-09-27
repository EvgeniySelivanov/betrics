import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { CONSTANTS } from '../constants';

const Ball = () => {
  const bgBall = require('../assets/ball.png');
  const BallStyle = styled(ImageBackground)`
    position: absolute;
    left: ${CONSTANTS.BALL_POSITION.x}px;
    top: ${CONSTANTS.BALL_POSITION.y}px;
    width: ${CONSTANTS.BALL_DIAMETER}px;
    height: ${CONSTANTS.BALL_DIAMETER}px;
    z-index: 90;
  `;
  return <BallStyle source={bgBall}>{/* Контент компонента */}</BallStyle>;
};

export default Ball;
