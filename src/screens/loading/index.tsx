import React from 'react';
import { View, Text } from 'react-native';

const Loading = () => (
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        flex: 1,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Loading Screen</Text>
    </View>
    {/* <View style={{ width: 50, height: 50, backgroundColor: 'powderblue' }} /> */}
    {/* <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} /> */}
    {/* <View style={{ width: 50, height: 50, backgroundColor: 'steelblue' }} /> */}
  </View>
);

export default Loading;
