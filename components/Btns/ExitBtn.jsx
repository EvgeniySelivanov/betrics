import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {styles} from './styles';
const ExitBtn = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <MaterialCommunityIcons name="exit-to-app" size={30} color="#0890f0" />
      <Text style={styles.buttonText}>{text}</Text>
      
    </TouchableOpacity>
  );
};
export default ExitBtn;