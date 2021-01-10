import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { OnboardingScreen } from '../../layouts';

export interface ISignIn {
  email: string;
  password: string;
}

export const OnboardingContainer = () => {
  const { navigate } = useNavigation();

  const handlePress = (toScreen: string) => {
    navigate(toScreen);
  };

  return <OnboardingScreen onPress={handlePress} />;
};
