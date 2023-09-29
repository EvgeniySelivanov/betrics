import React from 'react';
import { View, Text, ImageBackground,BackHandler} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { CONSTANTS } from '../constants';
import { AppStateContext } from '../helpers/AppStateContext';
import PlayBtn from '../components/Btns/PlayBtn';
import SettingBtn from '../components/Btns/SettingBtn';
import ExitBtn from '../components/Btns/ExitBtn';
import RecordsBtn from '../components/Btns/RecordsBtn';
const bgImage = require('../assets/bgMenu.png');
const Space = styled(ImageBackground)`
  flex: 1;
  margin-top: 25px;
  margin-bottom: 25px;
  overflow: hidden;
  justify-content: center;
  align: center;
`;

const StyledMenu = styled.Text`
  margin-top: 10px;
  color: #ffffff;
  font-size: 50px;
  font-weight: 700;
  text-align: center;
  padding: 7px;
`;

const Menu = () => {
  const navigation = useNavigation();
  const play = () => {
    navigation.navigate('Game');
  };
  const record = () => {
    navigation.navigate('Record');
  };
  const setting = () => {
    navigation.navigate('Setting');
  };
  const backAction=()=>{
    BackHandler.exitApp();
  }
  return (
    <Space source={bgImage}>
      <StyledMenu>Menu</StyledMenu>
      <PlayBtn onPress={play} text={'Play'} />
      <RecordsBtn onPress={record} text={'Records'} />
      <SettingBtn onPress={setting} text={'Setting'} />
      <ExitBtn onPress={backAction} text={'Exit'}/>
    </Space>
  );
};

export default Menu;
