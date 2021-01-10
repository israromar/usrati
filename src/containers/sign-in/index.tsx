import React from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../../store/actions/auth.actions';
import { SignInScreen } from '../../layouts';

export interface ISignIn {
  username: string;
  password: string;
}

export const SignInContainer = () => {
  const dispatch = useDispatch();

  const handleSignInPress = ({ username, password }: ISignIn) => {
    dispatch(signIn({ username, password }));
  };

  return <SignInScreen signIn={handleSignInPress} />;
};
