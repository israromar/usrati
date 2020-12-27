import React from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/actions/auth.actions';
import { SignUpScreen } from '../../layouts';

export interface ISignUp {
  userName: string;
  email: string;
  password: string;
}

export const SignUpContainer = () => {
  const dispatch = useDispatch();

  const handleSignUpPress = ({ userName, email, password }: ISignUp) => {
    dispatch(signUp({ userName, email, password }));
  };

  return <SignUpScreen signUp={handleSignUpPress} />;
};
