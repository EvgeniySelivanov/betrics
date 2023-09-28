import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RangeSlider = ({ getTanDeg }) => {
  const [value, setValue] = useState(0); // Изначальное значение в центре (0)
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
    getTanDeg(value);
  }, [value]);

  useEffect(() => {
    let interval;
    if (isButtonPressed) {
      interval = setInterval(() => {
        if (value > -90) {
          setValue((value) => value - 2);
        }
      }, 40); // Интервал в миллисекундах для увеличения значения
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isButtonPressed, value]);

  useEffect(() => {
    let interval;
    if (isButtonPressed2) {
      interval = setInterval(() => {
        if (value < 90) setValue((value) => value + 2);
      }, 40); // Интервал в миллисекундах для увеличения значения
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isButtonPressed2, value]);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <TouchableOpacity
          onPressIn={decreaseValue}
          onPressOut={handleButtonRelease}
          style={styles.button}
        >
          <Text>Left</Text>
        </TouchableOpacity>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity
          onPressIn={increaseValue}
          onPressOut={handleButtonRelease2}
          style={styles.button}
        >
          <Text>Right</Text>
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
    width: 60,
    paddingHorizontal: 10,
    textAlign:'center',
    paddingVertical: 10,
    borderColor: 'green',
    borderWidth: 3,
    borderRadius: 5,
  },
  value: {
    fontSize: 20,
    marginHorizontal: 10,
  },
});

export default RangeSlider;
