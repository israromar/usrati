import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { MatricCategoryScreen } from '../../layouts';

export interface ISignIn {
  email: string;
  password: string;
}

export const MatricCategoryContainer = () => {
  const { navigate } = useNavigation();

  const handlePress = (toScreen: string) => {
    navigate(toScreen);
  };

  return <MatricCategoryScreen onBackPress={handlePress} />;
};
