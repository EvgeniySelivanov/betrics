import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';  
import {styles} from './styles';
const SettingBtn = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Feather name="settings" size={30} color="#0890f0" />
      <Text style={styles.buttonText}>{text}</Text>
      
    </TouchableOpacity>
  );
};

export default SettingBtn;