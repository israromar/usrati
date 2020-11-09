import React, { useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
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
  theme: { activeTheme: string };
}

const AppRootStack = () => {
  const dispatch = useDispatch();
  const {
    auth: { isLoggedIn, user, userToken },
    theme: { activeTheme },
  } = useSelector((state: IAppRooStack) => {
    return state;
  });

  useEffect(() => {
    // AsyncStorage.clear();
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;

      try {
        token = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      if (token !== null) {
        dispatch(restoreToken({ token }));
      }
    };
    bootstrapAsync();
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={activeTheme === 'Light' ? eva.light : eva.dark}
      >
        {isLoggedIn && userToken ? (
          <AppStackNavigator />
        ) : (
          <AuthStackNavigator />
        )}
      </ApplicationProvider>
    </>
  );
};

export default AppRootStack;
