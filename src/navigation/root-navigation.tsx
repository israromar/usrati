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
        console.log('🚀 ~ file: root-navigation.tsx ~ line 49 ~ bootstrapAsync ~ token', token);
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


// To,

// Manager Human Resources
// iPlex Private Limited.
// Rawalpindi.

// Subject: Prior Notice for Job Resignation

// I would like to inform you of my intention to resign from Full Stack developer at iPlex Private Limited. Please accept this message as a prior notice of my formal resignation effective from the 1st January, 2021.

// Thank you so much for all of the opportunities this company has provided me. I have learned so much these past two years, and appreciate the kindness of all of my colleagues.

// Especially, I would like to thanks my project manager Mr. Waseem Khan, Ahsan Naseer and Gerrard Barrows.

// Thank you again, and I look forward to staying in touch.

// Sincerely,
