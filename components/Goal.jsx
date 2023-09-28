import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { CONSTANTS } from '../constants';

const Container = styled.View`
  position: absolute;
  top: ${CONSTANTS.GOAL_POSITION.y}px;
  left: ${CONSTANTS.GOAL_POSITION.x}px;
  width: ${CONSTANTS.GOAL_WIDTH}px;
  height: ${CONSTANTS.GOAL_HEIGHT}px;
  border: 2px solid white;
  overflow: hidden;
`;
const TextGoal = styled.Text`
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  color: white;
`;
const GoalImage = styled.Image`
  width: 100%;
  height: 100%;
`;
const Goal = () => {
  return (
    <Container>
      <TextGoal>GOAL</TextGoal>
    </Container>
  );
};

export default Goal;
