import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  AuthWelcomeScreen,
  SignInScreen,
  SignUpScreen,
  ForgotPasswordScreen,
} from '../containers';

import { AppRoute } from './app-routes';
// import { ForgotPasswordScreen } from '../layouts';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={AppRoute.AUTH_WELCOME}>
      <Stack.Screen
        name={AppRoute.AUTH_WELCOME}
        component={AuthWelcomeScreen}
      />
      <Stack.Screen name={AppRoute.SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={AppRoute.SIGN_UP} component={SignUpScreen} />
      <Stack.Screen
        name={AppRoute.RESET_PASSWORD}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};
