import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {styles} from './styles';
const ExitBtn = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
      <MaterialCommunityIcons name="exit-to-app" size={30} color="white" />
    </TouchableOpacity>
  );
};
export default ExitBtn;