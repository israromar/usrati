import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../containers/sign-in';
import SignUp from '../containers/sign-up';
import ForgotPassword from '../containers/forgot-password';

import { AppRoute } from './app-routes';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={AppRoute.SIGN_IN} component={SignIn} />
      <Stack.Screen name={AppRoute.SIGN_UP} component={SignUp} />
      <Stack.Screen name={AppRoute.RESET_PASSWORD} component={ForgotPassword} />
    </Stack.Navigator>
  );
};
