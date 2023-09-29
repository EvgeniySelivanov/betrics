import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {styles} from './styles';
const VibroBtn = ({ onPress, text, vibro }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
      {vibro ? (
        <MaterialCommunityIcons name="toggle-switch" size={50} color="green" />
      ) : (
        <MaterialCommunityIcons
          name="toggle-switch-off"
          size={50}
          color="red"
        />
      )}
    </TouchableOpacity>
  );
};

export default VibroBtn;
