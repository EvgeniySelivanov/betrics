import React,{useState} from 'react';
import { View, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { CONSTANTS } from '../constants';


const Obtacles = ({xPositionObtacles,yPositionObtacles,withObtaclesRandom}) => {
  
  
 const Object=styled(ImageBackground)`
  position: absolute;
  width:${withObtaclesRandom}px;
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
