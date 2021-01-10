import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ParentScreen } from '../../../layouts';

export interface ISignIn {
  email: string;
  password: string;
}

export const AddParentContainer = () => {
  const { navigate } = useNavigation();

  const handlePress = (toScreen: string) => {
    navigate(toScreen);
  };

  return <ParentScreen onPress={handlePress} />;
};
