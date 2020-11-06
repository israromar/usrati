import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/auth.actions';
import { SignInScreen } from '../../screens';
// import { event } from 'react-native-reanimated';

const SignIn = () => {
  const dispatch = useDispatch();
  const handleSignInPress = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(login({ email, password }));
  };

  return <SignInScreen onSignInPress={handleSignInPress} />;
};

export default SignIn;
