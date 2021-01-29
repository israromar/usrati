/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { restoreToken } from '../store/actions/auth.actions';
import { AuthNavigator as AuthStackNavigator } from './auth.navigator';
import { AppNavigator as AppStackNavigator } from './app.navigator';

export interface IAppRooStack {
  auth: {
    isLoggedIn: boolean;
    userToken: string;
    user: { familyID: { id: number } }
  };
  family: { family: { families: [] } };
  theme: { activeTheme: string };
  language: { activeLanguage: string };
}

const AppRootStack = () => {
  const dispatch = useDispatch();
  const {
    auth: { isLoggedIn, userToken, user },
    family: {
      family: { families },
    },
  } = useSelector((state: IAppRooStack) => {
    return state;
  });

  console.log('2123123families', families, user?.familyID?.id);


  let isFamilyAdded = false;
  if (families?.length > 0 || user?.familyID?.id) {
    isFamilyAdded = true;
  }

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
    <NavigationContainer>
      {isLoggedIn && userToken ? (
        <AppStackNavigator isFamilyAdded={isFamilyAdded} />
      ) : (
          <AuthStackNavigator />
        )}
    </NavigationContainer>
  );
};

export default AppRootStack;
