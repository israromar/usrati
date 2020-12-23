import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import { AppRoute } from '../../../navigation/app-routes';
// import { ImageOverlay } from './extra/image-overlay.component';
import { Header } from '../../../components/header/header.component';
import { EyeIcon, EyeOffIcon, PersonIcon } from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { ISignIn as IPropsSignIn } from '../../../containers/sign-in';
import { InputField } from '../../../components/inputs/input.component';
import { placeholder } from 'i18n-js';

interface ISignIn {
  signIn(obj: IPropsSignIn): void;
}

export const SignIn = ({ signIn }: ISignIn): React.ReactElement => {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  // const LoadingIndicator = (props: any) => (
  //   <View style={[props.style, styles.indicator]}>
  //     <Spinner size="medium" />
  //   </View>
  // );

  const onSignInButtonPress = (): void => {
    signIn({ email, password });
  };

  const onSignUpButtonPress = (): void => {
    navigate(AppRoute.SIGN_UP);
  };

  const onForgotPasswordButtonPress = (): void => {
    navigate(AppRoute.RESET_PASSWORD);
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <Header headerText={'Sign In'} />
        <View style={styles.formContainer}>
          <InputField
            status={'control'}
            placeholder="Email"
            accessoryLeft={PersonIcon}
            value={email}
            onChange={setEmail}
          />

          <InputField
            status="control"
            placeholder="Password"
            accessoryLeft={passwordVisible ? EyeIcon : EyeOffIcon}
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
            onIconPress={onPasswordIconPress}
          />
        </View>
        <Button
          style={styles.signInButton}
          status="control"
          size="giant"
          onPress={onSignInButtonPress}
          // accessoryLeft={LoadingIndicator}
        >
          SIGN IN
        </Button>
        <Button
          style={styles.signUpButton}
          appearance="ghost"
          status="control"
          onPress={onSignUpButtonPress}
        >
          Don't have an account? Sign Up
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },

  headerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: 192,
    paddingHorizontal: 28,
  },
  formContainer: {
    flex: 1,
    marginTop: 0,
    position: 'relative',
    zIndex: 10,
    paddingTop: 50,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },

  signInButton: {
    marginHorizontal: 28,
    backgroundColor: '#6F99EB',
    color: 'white',
  },
  signUpButton: {
    marginVertical: 0,
    marginHorizontal: 16,
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
