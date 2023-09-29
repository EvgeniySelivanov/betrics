import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {styles} from './styles';
import styled from 'styled-components/native';
const Span = styled.Text`
  
  color: #0890f0;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  padding: 7px;
`;
const GameSpeed = ({ onPress, text,gameSpeed }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
      <Span>{gameSpeed}</Span>
      <Ionicons name="speedometer-outline" size={30} color="#0890f0" />
    </TouchableOpacity>
  );
};

export default GameSpeed;