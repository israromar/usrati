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
    console.log(
      '🚀 ~ file: index.tsx ~ line 14 ~ handlePress ~ toScreen',
      toScreen,
    );
    navigate(toScreen);
  };

  return <DashboardScreen onChildPress={handlePress} />;
};
