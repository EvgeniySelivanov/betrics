import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import {styles} from './styles';
const PlayBtn = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
      <AntDesign name="playcircleo" size={30} color="white" />
    </TouchableOpacity>
  );
};

export default PlayBtn;