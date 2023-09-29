import React,{useEffect} from 'react';
import { View, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { CONSTANTS } from '../constants';
const withRandom=Math.floor(Math.random() * (CONSTANTS.SCREEN_WIDTH/3 - CONSTANTS.SCREEN_WIDTH/5 + 1)) + CONSTANTS.SCREEN_WIDTH/5;

const Obtacles = ({xPositionObtacles,yPositionObtacles}) => {
  
  
 const Object=styled(ImageBackground)`
  position: absolute;
  width:${withRandom}px;
  left:${xPositionObtacles}px;
  top:${yPositionObtacles}px;
  height:30px;
  background-color:#562f21;

`
  return (
    <Object>
      
    </Object>
  );
}


export default Obtacles;
