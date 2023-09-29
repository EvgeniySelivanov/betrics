import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppStateContext } from '../helpers/AppStateContext';
const RangeSlider = () => {
  const contextValue = useContext(AppStateContext);
  const { deg,updateDeg} = contextValue;
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isButtonPressed2, setIsButtonPressed2] = useState(false);
  const [angleInRadians, setAngle] = useState(0);

  const decreaseValue = () => {
    setIsButtonPressed(true);
  };
  const increaseValue = () => {
    setIsButtonPressed2(true);
  };

  const handleButtonRelease = () => {
    setIsButtonPressed(false);
  };

  const handleButtonRelease2 = () => {
    setIsButtonPressed2(false);
  };
 

  useEffect(() => {
    let interval;
    if (isButtonPressed) {
      interval = setInterval(() => {
        if (deg > -71) {
          updateDeg((deg) => deg - 2);
        }
      }, 40); // Интервал в миллисекундах для увеличения значения
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isButtonPressed, deg]);

  useEffect(() => {
    let interval;
    if (isButtonPressed2) {
      interval = setInterval(() => {
        if (deg < 71) updateDeg((deg) => deg + 2);
      }, 40); // Интервал в миллисекундах для увеличения значения
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isButtonPressed2, deg]);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <TouchableOpacity
          onPressIn={decreaseValue}
          onPressOut={handleButtonRelease}
          style={styles.button}
        >
          <Text style={styles.text}>LEFT</Text>
        </TouchableOpacity>
        <Text style={styles.deg}>{deg}</Text>
        <TouchableOpacity
          onPressIn={increaseValue}
          onPressOut={handleButtonRelease2}
          style={styles.button}
        >
          <Text style={styles.text}>RIGHT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main:{
    position:'absolute',
    bottom:30,
    left:30
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    width: 70,
    paddingHorizontal: 10,
    textAlign:'center',
    paddingVertical: 10,
    borderColor: 'black',
    backgroundColor: '#f6fc55',
    
    borderWidth: 3,
    borderRadius: 5,
  },
  text:{
    color:'green',
    fontSize:14,
  },
  deg: {
    fontSize: 20,
    marginHorizontal: 10,
    color: 'white',
  },
});

export default RangeSlider;
