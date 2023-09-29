import React, { useContext } from 'react';
import { View, StyleSheet, Text ,ImageBackground} from 'react-native';
import { AppStateContext } from '../helpers/AppStateContext';
import styled from 'styled-components/native';

const bgImage = require('../assets/bgMenu.png');
const Space = styled(ImageBackground)`
  flex: 1;
  margin-top: 25px;
  margin-bottom: 25px;
  overflow: hidden;

`;
const Container = styled(View)`
  padding: 20px;
`;
const MyText = styled(Text)`
  margin-top: 10px;
  color: #83f30b;
  font-size: 50px;
  font-weight: 700;
  text-align: center;
  padding: 7px;
`;
const Record = () => {
  const contextValue = useContext(AppStateContext);
  const { records } = contextValue;
  console.log(records.length);
  return (
    <Space source={bgImage}>
      <Container>
        <MyText>Records list:</MyText>
        {records.length>0 ? (
          records.map((record, key) => (
            <MyText key={key}>
              {key+1}. {record} level
            </MyText>
          ))
        ) : (
          <MyText>No records</MyText>
        )}
      </Container>
    </Space>
  );
};

export default Record;
