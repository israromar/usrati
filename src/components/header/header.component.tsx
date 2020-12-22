import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { ImageBackground, View, StyleSheet } from 'react-native';

import { colors, fonts } from '../styles';

const borderRadius = 40;

export const Header = ({ headerText }) => {
  return (
    <ImageBackground
      source={require('../../../assets/Vector.png')}
      resizeMode={'cover'}
      style={styles.imageBackground}
    >
      <View style={styles.headerContainer}>
        <Text category="h1" status="control">
          {headerText}
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    maxHeight: 217,
    width: '100%',
  },
  headerContainer: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
});
0;
