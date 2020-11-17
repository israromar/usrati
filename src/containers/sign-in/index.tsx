import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/auth.actions';
import { SignInScreen } from '../../layouts';

export interface ISignIn {
  email: string;
  password: string;
}

export const SignInContainer = () => {
  const dispatch = useDispatch();

  const handleSignInPress = ({ email, password }: ISignIn) => {
    dispatch(login({ email, password }));
  };

  return <SignInScreen signIn={handleSignInPress} />;
};
