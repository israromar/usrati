import React from 'react';
// import { useDispatch } from 'react-redux';
// import { signIn } from '../../store/actions/auth.actions';
import { FamilySetupScreen } from '../../layouts';

export interface ISignIn {
  username: string;
  password: string;
}

export const FamilySetupContainer = () => {
  // const dispatch = useDispatch();

  // const handleSignInPress = ({ username, password }: ISignIn) => {
  //   dispatch(signIn({ username, password }));
  // };

  return <FamilySetupScreen />;
};
