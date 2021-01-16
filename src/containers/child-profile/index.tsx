import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ChildProfileScreen } from '../../layouts';

export interface ISignIn {
  email: string;
  password: string;
}

export const ChildProfileContainer = () => {
  const { navigate } = useNavigation();

  const handlePress = (toScreen: string) => {
    navigate(toScreen);
  };

  return <ChildProfileScreen onBackPress={handlePress} />;
};
