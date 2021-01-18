/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Avatar,
  Layout,
  Icon,
  Button,
  Input,
  Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { validate } from 'validate.js';
import { useDispatch } from 'react-redux';

import { AppRoute } from '../../../navigation/app-routes';
import { ImageOverlay } from '../../../components';
import { AtIcon } from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// import { ISignIn as IPropsSignIn } from '../../../containers/sign-in';
// import { InputField } from '../../../components/inputs/input.component';
// import { Loading } from '../../loading';
import { constraints } from '../../../utils/constraints';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Swiper } from '../common/swiper';
import i18n from '../../../translations';
import { logout } from '../../../store/actions/auth.actions';

// interface ISignIn {
//   Parent(obj: IPropsSignIn): void;
// }

export const Parent = ({ }): React.ReactElement => {
  const { navigate, ...rest } = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const handleInput = (
    inputField: string,
    value: React.SetStateAction<string>,
  ) => {
    if (inputField === 'email') {
      setEmailError(false);
      setEmail(value.replace(/\s/g, ''));
    } else {
      setPasswordError(false);
      setPassword(value);
    }
  };

  const onSignInButtonPress = (): void => {
    const validationResult = validate({ email, password }, constraints);
    if (validationResult?.email && validationResult?.password) {
      setEmailError(true);
      setEmailErrorMsg(validationResult?.email[0]);
      setPasswordError(true);
      setPasswordErrorMsg(validationResult?.password[0]);
    } else if (validationResult?.email) {
      setEmailError(true);
      setEmailErrorMsg(validationResult?.email[0]);
    } else if (validationResult?.password) {
      setPasswordError(true);
      setPasswordErrorMsg(validationResult?.password[0]);
    } else {
      Parent({ email, password });
    }
  };

  const onAddParentButtonPress = (): void => {
    navigate(AppRoute.ADD_CHILD);
  };

  const onForgotPasswordButtonPress = (): void => {
    navigate(AppRoute.RESET_PASSWORD);
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

  console.log('hereeeeeeeee-09-9-09-0');

  const onSignOutPress = () => {
    dispatch(logout());
  };

  return (
    <KeyboardAvoidingView style={{ backgroundColor: '#fff' }}>
      <ImageOverlay
        style={styles.headerContainer}
        source={require('../../../assets/images/vector.png')}
      >
        <View style={styles.headerElements}>
          {/* <TouchableOpacity onPress={hanldeBackPress}>
            <Image source={require('./assets/backarrow.png')} />
          </TouchableOpacity> */}
          <Text category="h1" status="control">
            Guardian
          </Text>
        </View>
      </ImageOverlay>
      <Layout>
        <Avatar
          style={styles.avatar}
          size="giant"
          source={require('./assets/guardian-avatar.png')}
        />

        <Layout style={styles.formContainer}>
          <Input
            style={{ marginTop: 10 }}
            value={email.trim()}
            caption={emailError ? emailErrorMsg : ''}
            status={emailError ? 'danger' : 'basic'}
            placeholder="User Name"
            // accessoryRight={AtIcon}
            onChangeText={(nextValue) => handleInput('email', nextValue)}
          />
          <Input
            style={{ marginTop: 10 }}
            value={password.trim()}
            caption={passwordError ? passwordErrorMsg : ''}
            status={passwordError ? 'danger' : 'basic'}
            placeholder="Password"
            // accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={(nextValue) => handleInput('password', nextValue)}
          />
        </Layout>
        <Layout style={styles.bottomContainer}>
          <TouchableOpacity onPress={onAddParentButtonPress}>
            <Button
              style={styles.signInButton}
              status="control"
              size="giant"
              appearance="ghost"
            >
              Add
            </Button>
          </TouchableOpacity>

          <Layout style={{ top: 20 }}>
            <TouchableOpacity onPress={onSignOutPress}>
              <Button style={styles.singOutButton} appearance="outline">
                {i18n.t('home.signOut')}
              </Button>
            </TouchableOpacity>
          </Layout>
        </Layout>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  singOutButton: { top: 0, maxWidth: 100, minWidth: 50, alignSelf: 'center' },
  avatar: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    // margin: 8,
    top: -80,
  },
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
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: 15,
  },
  bottomContainer: { flex: 1, top: 102, alignSelf: 'center' },
  bottomText: { flex: 1, top: 10, flexDirection: 'row', alignSelf: 'center' },
  formContainer: {
    flex: 1,
    // position: 'relative',
    // zIndex: 10,
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
