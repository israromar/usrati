import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import { AppRoute } from '../../../navigation/app-routes';
import { ImageOverlay } from './extra/image-overlay.component';
import { EyeIcon, EyeOffIcon, PersonIcon } from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { ISignIn as IPropsSignIn } from '../../../containers/sign-in';

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
      <ImageOverlay
        style={styles.container}
        source={require('./assets/image-background.jpg')}
      >
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            Hello
          </Text>
          <Text style={styles.signInLabel} category="s1" status="control">
            Sign in to your account
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Input
            status="control"
            placeholder="Email"
            accessoryLeft={PersonIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.passwordInput}
            status="control"
            placeholder="Password"
            accessoryLeft={passwordVisible ? EyeIcon : EyeOffIcon}
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
            onIconPress={onPasswordIconPress}
          />
          <View style={styles.forgotPasswordContainer}>
            <Button
              style={styles.forgotPasswordButton}
              appearance="ghost"
              status="control"
              onPress={onForgotPasswordButtonPress}
            >
              Forgot your password?
            </Button>
          </View>
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
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  formContainer: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
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