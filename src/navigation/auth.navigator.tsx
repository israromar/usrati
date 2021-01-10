import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  AuthWelcomeScreen,
  OnboardingScreen,
  SignInScreen,
  SignUpScreen,
  ForgotPasswordScreen,
} from '../containers';

import { AppRoute } from './app-routes';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => {
  return (
<<<<<<< HEAD
    <Stack.Navigator headerMode="none" initialRouteName={AppRoute.ONBOARDING}>
=======
    <Stack.Navigator headerMode="none" initialRouteName={AppRoute.AUTH_WELCOME}>
>>>>>>> 1e659b0e0b279806bdc0e5e89e9f78c4463a1b25
      <Stack.Screen
        name={AppRoute.AUTH_WELCOME}
        component={AuthWelcomeScreen}
      />
      <Stack.Screen name={AppRoute.SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={AppRoute.ONBOARDING} component={OnboardingScreen} />
      <Stack.Screen name={AppRoute.SIGN_UP} component={SignUpScreen} />
      <Stack.Screen
        name={AppRoute.RESET_PASSWORD}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};
