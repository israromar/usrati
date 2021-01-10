import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ChildScreen } from '../../../layouts';

export interface ISignIn {
  email: string;
  password: string;
}

export const AddChildContainer = () => {
  const { navigate } = useNavigation();

  const handlePress = (toScreen: string) => {
    navigate(toScreen);
  };

  return <ChildScreen onPress={handlePress} />;
};
