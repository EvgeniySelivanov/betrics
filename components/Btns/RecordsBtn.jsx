import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import {styles} from './styles';

const RecordsBtn = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <FontAwesome5 name="clipboard-list" size={30} color="white" />
      <Text style={styles.buttonText}>{text}</Text>
      
    </TouchableOpacity>
  );
}
export default RecordsBtn;
