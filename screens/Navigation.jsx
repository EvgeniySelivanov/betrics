import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import  {AppStateProvider}  from '../helpers/AppStateContext';
import { StartScreen } from './StartScreen';
import WebViewScreen from './WebViewScreen';
import Game from './Game';
import Menu from './Menu';
import Record from './Record';
const Stack = createNativeStackNavigator();

 const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={StartScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="WebViewScreen" component={WebViewScreen}/>
        <Stack.Screen name="Game" component={Game} options={{ headerShown: false }}/>
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>
        <Stack.Screen name="Record" component={Record} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};
export default Navigation;