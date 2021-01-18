/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Layout, Button, Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

import { ImageOverlay } from '../../../components';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { AppRoute } from '../../../navigation/app-routes';
import { colors, fonts } from '../../../styles';

import { Swiper } from '../common/swiper';
// import { ISignIn as IPropsSignIn } from '../../../containers/sign-in';

// interface ISignIn {
//   onPress(obj: IPropsSignIn): void;
// }

export const Welcome = ({ onPress }: any): React.ReactElement => {
  const onButtonPress = (screen: string) => {
    onPress(screen);
  };

  return (
    <KeyboardAvoidingView style={{ backgroundColor: '#fff' }}>
      <ImageOverlay
        style={styles.headerContainer}
        source={require('../../../assets/images/vector.png')}
      >
        <Layout style={styles.headerElements}>
          <Text category="h5" status="control">
            Welcome To
          </Text>
          <Text style={styles.title} category="h1" status="control">
            Usrati
          </Text>
        </Layout>
      </ImageOverlay>
      <Layout style={styles.mainContainer}>
        <Image style={styles.stretch} source={require('./assets/group.png')} />
        <Layout style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => onButtonPress(AppRoute.SIGN_IN)}>
            <Button
              style={styles.signInButton}
              status="control"
              size="giant"
              appearance="ghost"
            >
              Sign In
            </Button>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onButtonPress(AppRoute.SIGN_UP)}>
            <Button style={styles.signUpButton} size="giant" appearance="ghost">
              Sign Up
            </Button>
          </TouchableOpacity>
          <Swiper position={1} />
        </Layout>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  swiper: {
    // flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    minWidth: 70,
    // backgroundColor: 'grey',
  },
  active: {
    margin: 1,
    height: 8,
    width: 8,
    borderRadius: 50,
    borderColor: '#6F99EB',
    borderWidth: 1,
    justifyContent: 'center',
  },
  inActive: {
    width: 4,
    height: 4,
    borderRadius: 50,
    borderColor: '#C9EDF8',
    borderWidth: 1,
  },
  activeDot: {
    alignSelf: 'center',
    width: 4,
    height: 4,
    backgroundColor: '#6F99EB',
    borderRadius: 50,
  },
  stretch: {
    marginTop: -100,
    alignSelf: 'center',
  },
  title: {
    fontSize: 64,
    fontFamily: fonts.primaryBold,
    fontStyle: 'normal',
    lineHeight: 78,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: wp2dp('100%'),
    height: hp2dp('40%'),
  },
  mainContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: wp2dp('100%'),
    height: hp2dp('55%'),
  },
  headerElements: {
    top: -50,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  bottomContainer: { marginTop: 'auto', alignSelf: 'center', backgroundColor: 'transparent' },
  signInButton: {
    marginTop: 'auto',
    width: wp2dp('85%'),
    borderRadius: 5,
    backgroundColor: '#6F99EB',
    alignSelf: 'center'
  },
  signUpButton: {
    width: wp2dp('85%'),
    borderRadius: 5,
    marginHorizontal: 28,
    color: colors.primaryBlue,
    alignSelf: 'center'
  },
});
