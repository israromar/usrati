/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

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
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

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
  currentState: {
    auth: { isLoading: boolean; isSignUpFailed: boolean; error: string };
  };
}

export const SignUp = ({
  signUp,
  currentState: { auth },
}: ISignUp): React.ReactElement => {
  const { navigate, ...rest } = useNavigation();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [userNameErrorMsg, setUsernameErrorMsg] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  useEffect(() => {
    if (auth?.isSignUpFailed) {
      setUsernameError(true);
      setUsernameErrorMsg(auth.error);
    }
  }, [auth, auth.isSignUpFailed]);

  const onSignInButtonPress = (): void => {
    navigate(AppRoute.SIGN_IN);
  };

  const handleInput = (
    inputField: (v: React.SetStateAction<string>) => void,
    inputFieldError: (v: boolean) => void,
    value: React.SetStateAction<string>,
  ) => {
    inputField(value.trim());
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
      setUsernameError(true);
      setUsernameErrorMsg(validationResult?.username[0]);
      setEmailError(true);
      setEmailErrorMsg(validationResult?.email[0]);
      setPasswordError(true);
      setPasswordErrorMsg(validationResult?.password[0]);
    } else if (validationResult?.username) {
      setUsernameError(true);
      setUsernameErrorMsg(validationResult?.username[0]);
    } else if (validationResult?.email) {
      setEmailError(true);
      setEmailErrorMsg(validationResult?.email[0]);
    } else if (validationResult?.password) {
      setPasswordError(true);
      setPasswordErrorMsg(validationResult?.password[0]);
    } else if (!usernameError && !emailError && !passwordError) {
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
            Sign Up
          </Text>
        </View>
      </ImageOverlay>
      <Layout style={styles.mainContainer}>
        {/* <Header headerText={'Sign In'} onBackPress={hanldeBackPress} /> */}
        <Image style={styles.stretch} source={require('./assets/group.png')} />
        <Layout style={styles.formContainer}>
          <Input
            style={styles.input}
            value={username.trim()}
            caption={usernameError ? userNameErrorMsg : ''}
            status={usernameError ? 'danger' : 'basic'}
            placeholder="username"
            accessoryRight={PersonIcon}
            onChangeText={(nextValue) =>
              handleInput(setUsername, setUsernameError, nextValue)
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
              style={styles.signUpButton}
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
          <Swiper style={{ marginBottom: 10 }} position={3} />
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
  mainContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: wp2dp('100%'),
    height: hp2dp('70%'),
  },
  // bottomContainer: { flex: 1, top: 43, alignSelf: 'center' },
  bottomContainer: {
    flex: 1,
    marginTop: 40,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },

  bottomText: { flex: 1, top: 10, flexDirection: 'row', alignSelf: 'center' },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  signUpButton: {
    marginTop: 5,
    width: wp2dp('85%'),
    borderRadius: 5,
    backgroundColor: '#6F99EB',
    alignSelf: 'center',
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
