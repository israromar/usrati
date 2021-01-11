import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../store/actions/auth.actions';
import { SignUpScreen } from '../../layouts';

export interface ISignUp {
  username: string;
  email: string;
  password: string;
}

export const SignUpContainer = () => {
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state);

  const handleSignUpPress = ({ username, email, password }: ISignUp) => {
    dispatch(signUp({ username, email, password }));
  };

  return (
    <SignUpScreen signUp={handleSignUpPress} currentState={currentState} />
  );
};
