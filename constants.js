import { Dimensions } from 'react-native';
export const CONSTANTS = {
  SCREEN_HEIGHT: Dimensions.get('window').height,
  SCREEN_WIDTH: Dimensions.get('window').width,
  BALL_POSITION: {
    x: Dimensions.get('window').width / 2 - 25,
    y: Dimensions.get('window').height / 1.3 - 25,
  },
  BALL_DIAMETER: 50,
  GAME_VIBRO: false,
  GAME_SPEED:2400,
};
