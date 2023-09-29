import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {styles} from './styles';
const ResetBtn = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
      <MaterialCommunityIcons name="restart" size={30} color="#0890f0" />
    </TouchableOpacity>
  );
};

export default ResetBtn;