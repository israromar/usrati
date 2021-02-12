import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ChildProfileScreen } from '../../layouts';

export interface ISignIn {
  email: string;
  password: string;
}

export const ChildProfileContainer = () => {
  const navigation = useNavigation();
  console.log(
    '🚀 ~ file: index.tsx ~ line 12 ~ ChildProfileContainer ~ navigate',
    navigation,
  );

  const handlePress = () => {
    // navigation.navigate();
    navigation.goBack();
  };

  return <ChildProfileScreen onBackPress={handlePress} />;
};
