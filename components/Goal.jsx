import React from 'react';
import {View,ImageBackground} from 'react-native';
import styled from 'styled-components/native';
import { CONSTANTS } from '../constants';
const bgImage = require('../assets/bgMenu.png');
const GoalImage = styled(ImageBackground)`
 position:absolute;
 top:${CONSTANTS.GOAL_POSITION.y}px;
 left:${CONSTANTS.GOAL_POSITION.x}px;
 width:${CONSTANTS.GOAL_WIDTH}px;
 height:${CONSTANTS.GOAL_HEIGHT}px;
 overflow: hidden;
`;
const Goal = () => {
  return (
    <GoalImage source={bgImage}>
      
    </GoalImage>
  );
}



export default Goal;
