import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { WelcomeScreen } from '../../layouts';

export interface ISignIn {
  email: string;
  password: string;
}

export const WelcomeContainer = () => {
  const { navigate } = useNavigation();

  const handlePress = (toScreen: string) => {
    navigate(toScreen);
  };

  return <WelcomeScreen onPress={handlePress} />;
};
