import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';  
import {styles} from './styles';
const SettingBtn = ({ onPress, text }) => {
  return (
    <TouchableOpacity  style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
      <Feather name="settings" size={30} color="white" />
    </TouchableOpacity>
  );
};

export default SettingBtn;