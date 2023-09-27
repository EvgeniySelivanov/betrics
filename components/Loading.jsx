import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
export const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c7f531',
        marginTop:25,
        marginBottom:24
      }}
    >
      <ActivityIndicator size="large" color="white" />
      <Text style={{ marginTop: 15, color: 'white',fontSize:30 }}>Loading...</Text>
    </View>
  );
};
