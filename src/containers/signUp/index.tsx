import React from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/actions/auth.actions';
import { SignUpScreen } from '../../screens';

const SignOut = () => {
  const dispatch = useDispatch();
  const handleSignUpPress = ({
    fullName,
    userName,
    email,
    password,
  }: {
    fullName: string;
    userName: string;
    email: string;
    password: string;
  }) => {
    dispatch(signUp({ fullName, userName, email, password }));
  };

  return <SignUpScreen onSignUpPress={handleSignUpPress} />;
};

export default SignOut;
