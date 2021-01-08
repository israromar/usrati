import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { ImageBackground, Image, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { colors, fonts } from '../styles';

export const Header = ({ headerText, onBackPress }: any) => {
  return (
    <ImageBackground
      source={require('../../assets/images/vector.png')}
      resizeMode={'cover'}
      style={styles.imageBackground}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBackPress}>
          <Image source={require('../../assets/images/backarrow.png')} />
        </TouchableOpacity>
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
    top: 10,
    justifyContent: 'space-around',
    minHeight: 100,
    paddingHorizontal: 28,
  },
});
