import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { restoreToken } from '../store/actions/auth.actions';
import AuthStackNavigator from './AuthNavigator';
import AppStackNavigator from './AppNavigator';

export interface IAppRooStack {
  auth: {
    isLoggedIn: boolean;
    userToken: string;
    user: { username: string; password: string };
  };
}

const AppRootStack = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user, userToken } = useSelector((state: IAppRooStack) => {
    console.log('AppRootStack -> state', state);
    return state?.auth;
  });

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;

      try {
        token = await AsyncStorage.getItem('userToken');
        console.log('bootstrapAsync -> userToken', userToken);
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      if (userToken !== null) dispatch(restoreToken({ token }));
    };
    bootstrapAsync();
  }, []);

  return isLoggedIn && userToken ? (
    <AppStackNavigator />
  ) : (
    <AuthStackNavigator />
  );
};

export default AppRootStack;
