/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ImageOverlay } from '../../../components';
import { AppRoute } from '../../../navigation/app-routes';
import { fonts } from '../../../styles';

export const Onboarding = ({ onPress }: any): React.ReactElement => {
  const onButtonPress = (screen: string) => {
    onPress(screen);
  };

  return (
    <>
      <ImageOverlay
        style={styles.headerContainer}
<<<<<<< HEAD
        source={require('../../../assets/images/vector.png')}
=======
        source={require('../../../../assets/images/vector.png')}
>>>>>>> 1e659b0e0b279806bdc0e5e89e9f78c4463a1b25
      >
        <View style={styles.headerElements}>
          <Text style={styles.title} category="h1" status="control">
            Are You
          </Text>
          <Layout style={{ backgroundColor: 'none', top: 30 }}>
<<<<<<< HEAD
            <TouchableOpacity
              onPress={() => onButtonPress(AppRoute.AUTH_WELCOME)}
            >
              <Image
                source={require('../../../assets/images/parent-group.png')}
=======
            <TouchableOpacity onPress={() => onButtonPress(AppRoute.SIGN_UP)}>
              <Image
                source={require('../../../../assets/images/parent-group.png')}
>>>>>>> 1e659b0e0b279806bdc0e5e89e9f78c4463a1b25
              />
              <Text style={styles.innerText} category="h5" status="control">
                A Parent
              </Text>
            </TouchableOpacity>
          </Layout>
          <Layout style={{ backgroundColor: 'none', top: 50 }}>
<<<<<<< HEAD
            <TouchableOpacity onPress={() => onButtonPress(AppRoute.SIGN_IN)}>
              <Image
                source={require('../../../assets/images/child-group.png')}
=======
            <TouchableOpacity onPress={() => onButtonPress(AppRoute.SIGN_UP)}>
              <Image
                source={require('../../../../assets/images/child-group.png')}
>>>>>>> 1e659b0e0b279806bdc0e5e89e9f78c4463a1b25
              />
              <Text style={styles.innerText} category="h5" status="control">
                A Child
              </Text>
            </TouchableOpacity>
          </Layout>
        </View>
      </ImageOverlay>
      <Layout>
        <Image style={styles.stretch} source={require('./assets/group.png')} />
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  stretch: {
    top: -115,
    alignSelf: 'center',
  },
  title: {
    fontFamily: fonts.primaryBold,
    fontStyle: 'normal',
    // fontWeight: 'bold',
    fontSize: 64,
    lineHeight: 78,
    // color: '#FFFFFF',
  },
  innerText: { alignSelf: 'center', fontWeight: 'bold', top: 5 },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: 650,
    backgroundColor: '#fff',
  },
  headerElements: {
    top: -100,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
