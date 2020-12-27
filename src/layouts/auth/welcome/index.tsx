/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Layout, Button, Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
        source={require('../../../../assets/images/vector.png')}
      >
        <View style={styles.headerElements}>
          <Text category="h5" status="control">
            Welcome To
          </Text>
          <Text style={styles.title} category="h1" status="control">
            Usrati
          </Text>
        </View>
      </ImageOverlay>
      <Layout>
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
          <TouchableOpacity onPress={() => onButtonPress(AppRoute.ONBOARDING)}>
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
    flex: 1,
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
    top: -115,
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
    minHeight: 360,
  },
  headerElements: {
    top: -50,
    alignSelf: 'center',
    alignItems: 'center',
  },
  bottomContainer: { flex: 1, top: 60, alignSelf: 'center' },
  bottomText: { flex: 1, top: 10, flexDirection: 'row', alignSelf: 'center' },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  signInButton: {
    width: 338,
    borderRadius: 5,
    marginHorizontal: 28,
    backgroundColor: '#6F99EB',
  },
  signUpButton: {
    width: 338,
    borderRadius: 5,
    marginHorizontal: 28,
    color: colors.primaryBlue,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
