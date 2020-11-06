import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../containers/signIn';
import SignUp from '../containers/signUp';

const Stack = createStackNavigator();

export default function AuthNavigatorView() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        options={{
          headerShown: false,
        }}
        component={SignUp}
      />
    </Stack.Navigator>
  );
}
