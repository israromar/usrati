import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../store/actions/auth.actions';
import { SignInScreen } from '../../layouts';

export interface ISignIn {
  username: string;
  password: string;
}

export const SignInContainer = () => {
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state);

  const handleSignInPress = ({ username, password }: ISignIn) => {
    dispatch(signIn({ username, password }));
  };

  return (
    <SignInScreen signIn={handleSignInPress} currentState={currentState} />
  );
};
