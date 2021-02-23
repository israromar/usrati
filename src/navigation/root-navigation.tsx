/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { restoreToken } from '../store/actions/auth.actions';
import { AuthNavigator as AuthStackNavigator } from './auth.navigator';
import { AppNavigator as AppStackNavigator } from './app.navigator';
import { changeLanguage } from '../store/actions/language.actions';
import i18n from '../translations';

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

  let isFamilyAdded = false;
  if (families?.length > 0 || user?.familyID?.id) {
    isFamilyAdded = true;
  }

  useEffect(() => {
    // AsyncStorage.clear();
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token, language;

      try {
        token = await AsyncStorage.getItem('userToken');
        language = await AsyncStorage.getItem('activeLanguage');
        console.log('🚀 ~ file: root-navigation.tsx ~ line 47 ~ bootstrapAsync ~ lang', language);
        if (language) {
          dispatch(changeLanguage({ language }));
          i18n.locale = language;
        } else {
          dispatch(changeLanguage({ language:'en' }));
          i18n.locale = 'en';
         }
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      if (token !== null) {
        // dispatch(restoreToken({ token }));
      } else {

      }
    };
    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn && userToken ? (
        <AppStackNavigator user={user ?? {}} isFamilyAdded={isFamilyAdded} navigation={useNavigation}/>
      ) : (
          <AuthStackNavigator />
        )}
    </NavigationContainer>
  );
};

export default AppRootStack;
