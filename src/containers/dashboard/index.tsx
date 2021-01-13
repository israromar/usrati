import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { DashboardScreen } from '../../layouts';

export interface ISignIn {
  email: string;
  password: string;
}

export const DashboardContainer = () => {
  const { navigate } = useNavigation();

  const handlePress = (toScreen: string) => {
    navigate(toScreen);
  };

  return <DashboardScreen onPress={handlePress} />;
};
