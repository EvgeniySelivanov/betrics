import React from 'react';
import { TouchableOpacity,Text } from 'react-native';
import { SimpleLineIcons,Fontisto } from '@expo/vector-icons';

import {styles} from './styles';
const SoundBtn = ({ onPress, music ,text}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
       <Text style={styles.buttonText}>{text}</Text>
      {music ? (
        <Fontisto name="soundcloud" size={30} color="green" />
      ) : (
        <SimpleLineIcons name="social-soundcloud" size={30} color="red" />
      )}
     
    </TouchableOpacity>
  );
};

export default SoundBtn;
