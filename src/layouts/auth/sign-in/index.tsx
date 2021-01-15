/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { Layout, Icon, Button, Input, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { validate } from 'validate.js';

import { AppRoute } from '../../../navigation/app-routes';
import { ImageOverlay } from '../../../components';
import { AtIcon } from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { ISignIn as IPropsSignIn } from '../../../containers/sign-in';
import { constraints } from '../../../utils/constraints';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LoadingIndicator } from '../sign-up';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

import { Swiper } from '../common/swiper';

interface ISignIn {
  signIn(obj: IPropsSignIn): void;
  currentState: {
    auth: { isLoading: boolean; isSignInFailed: boolean; error: string };
  };
}

export const SignIn = ({
  signIn,
  currentState: { auth },
}: ISignIn): React.ReactElement => {
  const { navigate, ...rest } = useNavigation();
  const [username, setUsername] = useState<string>('');
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  useEffect(() => {
    if (auth?.isSignInFailed) {
      setUsernameError(true);
      setPasswordError(true);
      setPasswordErrorMsg(auth.error);
    }
  }, [auth, auth.isSignInFailed]);

  const handleInput = (
    inputField: string,
    value: React.SetStateAction<string>,
  ) => {
    if (inputField === 'username') {
      setUsernameError(false);
      setUsernameErrorMsg('');
      setUsername(value.trim());
      if (auth.isSignInFailed) {
        setPasswordError(false);
        setPasswordErrorMsg('');
      }
    } else {
      // setUsernameError(false);
      // setUsernameErrorMsg('');
      setPasswordError(false);
      setPasswordErrorMsg('');
      setPassword(value);
    }
  };

  const onSignInButtonPress = async () => {
    const validationResult = await validate(
      { username, password },
      constraints,
    );
    if (validationResult?.username && validationResult?.password) {
      setUsernameError(true);
      setUsernameErrorMsg(validationResult?.username[0]);
      setPasswordError(true);
      setPasswordErrorMsg(validationResult?.password[0]);
    } else if (validationResult?.username) {
      setUsernameError(true);
      setUsernameErrorMsg(validationResult?.username[0]);
    } else if (validationResult?.password) {
      setPasswordError(true);
      setPasswordErrorMsg(validationResult?.password[0]);
    } else {
      signIn({ username, password });
    }
  };

  const onSignUpButtonPress = (): void => {
    navigate(AppRoute.SIGN_UP);
  };

  const hanldeBackPress = () => {
    rest.goBack();
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView style={{ backgroundColor: '#fff' }}>
      <ImageOverlay
        style={styles.headerContainer}
        source={require('../../../assets/images/vector.png')}
      >
        <View style={styles.headerElements}>
          <TouchableOpacity onPress={hanldeBackPress}>
            <Image source={require('./assets/backarrow.png')} />
          </TouchableOpacity>
          <Text category="h1" status="control">
            Sign In
          </Text>
        </View>
      </ImageOverlay>
      <Layout style={styles.mainContainer}>
        <Image style={styles.stretch} source={require('./assets/group.png')} />
        <Layout style={styles.formContainer}>
          <Input
            style={{ marginTop: 10 }}
            value={username.trim()}
            caption={usernameError ? usernameErrorMsg : ''}
            status={usernameError ? 'danger' : 'basic'}
            placeholder="Username"
            accessoryRight={AtIcon}
            onChangeText={(nextValue) => handleInput('username', nextValue)}
          />
          <Input
            style={{ marginTop: 10 }}
            value={password.trim()}
            caption={passwordError ? passwordErrorMsg : ''}
            status={passwordError ? 'danger' : 'basic'}
            placeholder="Password"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={(nextValue) => handleInput('password', nextValue)}
          />
        </Layout>
        <Layout style={styles.bottomContainer}>
          <TouchableOpacity onPress={onSignInButtonPress}>
            <Button
              style={styles.signInButton}
              status="control"
              size="giant"
              appearance="ghost"
              accessoryLeft={auth.isLoading && LoadingIndicator}
            >
              {auth.isLoading ? '' : 'Sign In'}
            </Button>
          </TouchableOpacity>
          <Layout style={styles.bottomText}>
            <Text style={{ color: '#B5AFAF' }}>Don't have an account? </Text>
            <TouchableOpacity onPress={onSignUpButtonPress}>
              <Text style={{ color: '#6F99EB' }}>Sign Up</Text>
            </TouchableOpacity>
          </Layout>
          <Swiper style={{ marginBottom: 10 }} position={2} />
        </Layout>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stretch: {
    height: 200,
    top: -80,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    // minHeight: 210,
    paddingHorizontal: 28,
    width: wp2dp('100%'),
    height: hp2dp('30%'),
  },
  headerElements: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: 75,
    marginBottom: 100,
  },
  mainContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: wp2dp('100%'),
    height: hp2dp('70%'),
  },
  bottomContainer: { flex: 1, marginTop: 10, alignSelf: 'center', backgroundColor: 'transparent' },
  bottomText: { flex: 1, top: 10, flexDirection: 'row', alignSelf: 'center' },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    backgroundColor: 'transparent'
  },
  signInButton: {
    // marginTop: 'auto',
    width: wp2dp('85%'),
    borderRadius: 5,
    backgroundColor: '#6F99EB',
    alignSelf: 'center'
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
