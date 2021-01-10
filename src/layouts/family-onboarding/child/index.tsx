/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  Avatar,
  Layout,
  Button,
  Input,
  Text,
  Calendar,
  Modal,
  Card,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { validate } from 'validate.js';

import { AppRoute } from '../../../navigation/app-routes';
import { ImageOverlay } from '../../../components';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { constraints } from '../../../utils/constraints';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Child = ({}): React.ReactElement => {
  const { navigate, ...rest } = useNavigation();
  const [date, setDate] = useState(new Date('Jan 01, 2010 00:20:18'));
  const [showCalendar, toggleCalendar] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [isNext, setIsNext] = useState(false);

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

  const onButtonPress = (): void => {
    setIsNext(!isNext);
  };

  const onSignUpButtonPress = (): void => {
    navigate(AppRoute.SIGN_UP);
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

  return (
    <KeyboardAvoidingView style={{ backgroundColor: '#fff' }}>
      <ImageOverlay
        style={styles.headerContainer}
        source={require('../../../assets/images/vector.png')}
      >
        <View style={{ marginBottom: 'auto', top: 25 }}>
          <TouchableOpacity onPress={hanldeBackPress}>
            <Image source={require('./assets/backarrow.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerElements}>
          <Text category="h1" status="control">
            Child
          </Text>
        </View>
      </ImageOverlay>

      <Layout>
        <Avatar
          style={styles.avatar}
          size="giant"
          source={require('./assets/child-avatar.png')}
        />
        <Layout style={styles.formContainer}>
          {!isNext && (
            <>
              <Input
                style={{ marginTop: 10 }}
                value={email.trim()}
                caption={emailError ? emailErrorMsg : ''}
                status={emailError ? 'danger' : 'basic'}
                placeholder="Name"
                onChangeText={(nextValue) => handleInput('email', nextValue)}
              />
              <Modal
                visible={visible}
                onBackdropPress={() => setVisible(false)}
              >
                <Calendar
                  style={{ backgroundColor: '#fff' }}
                  min={new Date('January 01, 2000 00:20:18')}
                  date={date}
                  onSelect={(nextDate) => {
                    setDate(nextDate);
                    toggleCalendar(!showCalendar);
                    setVisible(false);
                  }}
                />
              </Modal>
              <TouchableOpacity
                style={{
                  backgroundColor: '#F7F9FC',
                  borderColor: '#E4E9F2',
                  borderRadius: 5,
                  borderWidth: 1,
                  minWidth: 337,
                  minHeight: 40,
                  marginTop: 10,
                  marginBottom: 5,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingHorizontal: 8,
                  paddingVertical: 7,
                }}
                onPress={() => {
                  toggleCalendar(!showCalendar);
                  setVisible(true);
                }}
              >
                <Text
                  category="h6"
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 10,
                    color: '#A9A9A9',
                    fontSize: 15,
                  }}
                >
                  Date of birth : {date && date?.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              <Input
                style={{ marginTop: 10 }}
                value={password.trim()}
                caption={passwordError ? passwordErrorMsg : ''}
                status={passwordError ? 'danger' : 'basic'}
                placeholder="School name"
                secureTextEntry={secureTextEntry}
                onChangeText={(nextValue) => handleInput('password', nextValue)}
              />
            </>
          )}
          {isNext && (
            <>
              <Input
                style={{ marginTop: 10 }}
                value={password.trim()}
                caption={passwordError ? passwordErrorMsg : ''}
                status={passwordError ? 'danger' : 'basic'}
                placeholder="Interest"
                secureTextEntry={secureTextEntry}
                onChangeText={(nextValue) => handleInput('password', nextValue)}
              />
              <Input
                style={{ marginTop: 10 }}
                value={password.trim()}
                caption={passwordError ? passwordErrorMsg : ''}
                status={passwordError ? 'danger' : 'basic'}
                placeholder="Username"
                secureTextEntry={secureTextEntry}
                onChangeText={(nextValue) => handleInput('password', nextValue)}
              />
              <Input
                style={{ marginTop: 10 }}
                value={password.trim()}
                caption={passwordError ? passwordErrorMsg : ''}
                status={passwordError ? 'danger' : 'basic'}
                placeholder="Password"
                secureTextEntry={secureTextEntry}
                onChangeText={(nextValue) => handleInput('password', nextValue)}
              />
            </>
          )}
        </Layout>
        <Layout style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => onButtonPress()}>
            <Button
              style={styles.signInButton}
              status="control"
              size="giant"
              appearance="ghost"
            >
              {isNext ? 'Next' : 'Add'}
            </Button>
          </TouchableOpacity>
        </Layout>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    top: -80,
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
    bottom: 100,
  },
  bottomContainer: { flex: 1, top: 102, alignSelf: 'center' },
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
