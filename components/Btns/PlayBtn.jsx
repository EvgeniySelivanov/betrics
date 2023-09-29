import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import {styles} from './styles';
const PlayBtn = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <AntDesign name="playcircleo" size={30} color="white" />
      <Text style={styles.buttonText}>{text}</Text>
      
    </TouchableOpacity>
  );
};

export default PlayBtn;