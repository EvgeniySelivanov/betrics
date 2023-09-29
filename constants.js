import { Dimensions } from 'react-native';
export const CONSTANTS = {
  SCREEN_HEIGHT: Dimensions.get('window').height,
  SCREEN_WIDTH: Dimensions.get('window').width,
  GOAL_WIDTH:Dimensions.get('window').width/2,
  GOAL_HEIGHT:Dimensions.get('window').height*0.15,
  GOAL_POSITION:{x:Dimensions.get('window').width/2-Dimensions.get('window').width/4,y:0},
  BALL_POSITION: {
    x: Dimensions.get('window').width / 2 - 25,
    y: Dimensions.get('window').height / 1.4 - 25,
  },
  BALL_DIAMETER: 50,
  GAME_VIBRO: false,
  GAME_SPEED:3000,
};
