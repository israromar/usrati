import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../containers/signIn';
import SignUpScreen from '../containers/signUp';

const Stack = createStackNavigator();

export default function AuthNavigatorView() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          // title: 'Sign In',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        options={{
          // title: 'Sign In',
          headerShown: false,
        }}
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
}
