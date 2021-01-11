/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';

import {
  Layout,
  Icon,
  Button,
  Input,
  Text,
  Spinner,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { validate } from 'validate.js';

import { ImageOverlay } from '../../../components';
import { AppRoute } from '../../../navigation/app-routes';
import { AtIcon, PersonIcon } from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { ISignUp as IPropsSignUp } from '../../../containers/sign-up';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Swiper } from '../common/swiper';
import { constraints } from '../../../utils/constraints';

export const LoadingIndicator = (props: any) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

interface ISignUp {
  signUp(obj: IPropsSignUp): void;
  currentState: { auth: { isLoading: boolean } };
}

export const SignUp = ({
  signUp,
  currentState: { auth },
}: ISignUp): React.ReactElement => {
  const { navigate, ...rest } = useNavigation();
  console.log('auth', auth);

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [userNameErrorMsg, setUserNameErrorMsg] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const onSignInButtonPress = (): void => {
    navigate(AppRoute.SIGN_IN);
  };

  const handleInput = (
    inputField: (v: React.SetStateAction<string>) => void,
    inputFieldError: (v: boolean) => void,
    value: React.SetStateAction<string>,
  ) => {
    inputField(value);
    inputFieldError(false);
  };

  const onSignUpButtonPress = (): void => {
    const validationResult = validate(
      { username, email, password },
      constraints,
    );
    if (
      validationResult?.username &&
      validationResult?.email &&
      validationResult?.password
    ) {
      setUserNameError(true);
      setUserNameErrorMsg(validationResult?.username[0]);
      setEmailError(true);
      setEmailErrorMsg(validationResult?.email[0]);
      setPasswordError(true);
      setPasswordErrorMsg(validationResult?.password[0]);
    } else if (validationResult?.username) {
      setUserNameError(true);
      setUserNameErrorMsg(validationResult?.username[0]);
    } else if (validationResult?.email) {
      setEmailError(true);
      setEmailErrorMsg(validationResult?.email[0]);
    } else if (validationResult?.password) {
      setPasswordError(true);
      setPasswordErrorMsg(validationResult?.password[0]);
    } else {
      signUp({ username, email, password });
    }
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

  console.log('currentState', auth);

  return (
    <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>
      <ImageOverlay
        style={styles.headerContainer}
        source={require('../../../assets/images/vector.png')}
      >
        <View style={styles.headerElements}>
          <TouchableOpacity onPress={hanldeBackPress}>
            <Image source={require('./assets/backarrow.png')} />
          </TouchableOpacity>
          <Text category="h1" status="control">
            Sign Up
          </Text>
        </View>
      </ImageOverlay>
      <Layout>
        {/* <Header headerText={'Sign In'} onBackPress={hanldeBackPress} /> */}
        <Image style={styles.stretch} source={require('./assets/group.png')} />
        <Layout style={styles.formContainer}>
          <Input
            style={styles.input}
            value={username.trim()}
            caption={userNameError ? userNameErrorMsg : ''}
            status={userNameError ? 'danger' : 'basic'}
            placeholder="username"
            accessoryRight={PersonIcon}
            onChangeText={(nextValue) =>
              handleInput(setUsername, setUserNameError, nextValue)
            }
          />
          <Input
            style={styles.input}
            value={email.trim()}
            caption={emailError ? emailErrorMsg : ''}
            status={emailError ? 'danger' : 'basic'}
            placeholder="Email"
            accessoryRight={AtIcon}
            onChangeText={(nextValue) =>
              handleInput(setEmail, setEmailError, nextValue)
            }
          />
          <Input
            style={styles.input}
            value={password.trim()}
            caption={passwordError ? passwordErrorMsg : ''}
            status={passwordError ? 'danger' : 'basic'}
            placeholder="Password"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={(nextValue) =>
              handleInput(setPassword, setPasswordError, nextValue)
            }
          />
        </Layout>
        <Layout style={styles.bottomContainer}>
          <TouchableOpacity onPress={onSignUpButtonPress}>
            <Button
              style={styles.signInButton}
              status="control"
              size="giant"
              appearance="ghost"
              accessoryLeft={auth?.isLoading && LoadingIndicator}
            >
              {auth.isLoading ? '' : 'Sign Up'}
            </Button>
          </TouchableOpacity>
          <Layout style={styles.bottomText}>
            <Text style={{ color: '#B5AFAF' }}>Already have an account? </Text>
            <TouchableOpacity onPress={onSignInButtonPress}>
              <Text style={{ color: '#6F99EB' }}>Sign In</Text>
            </TouchableOpacity>
          </Layout>
          <Swiper style={{ top: 25 }} position={3} />
        </Layout>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: { marginTop: 10 },
  socialAuthContainer: {
    // marginTop: 24,
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
    minHeight: 210,
    paddingHorizontal: 28,
  },
  headerElements: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: 75,
    bottom: 40,
  },
  bottomContainer: { flex: 1, top: 43, alignSelf: 'center' },
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
    fontFamily: 'Verdana',
  },
  signUpButton: {
    marginVertical: 0,
    marginHorizontal: 16,
    borderRadius: 5,
    fontFamily: 'Verdana',
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
