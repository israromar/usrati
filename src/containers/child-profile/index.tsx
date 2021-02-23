import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ChildProfileScreen } from '../../layouts';

export interface ISignIn {
  email: string;
  password: string;
}

export const ChildProfileContainer = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    // navigation.navigate();
    navigation.goBack();
  };

  return <ChildProfileScreen onBackPress={handlePress} />;
};
