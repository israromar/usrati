import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/actions/auth.actions';
import { toggleTheme } from '../../store/actions/theme.actions';
import { SignInScreen } from '../../screens';
// import { event } from 'react-native-reanimated';

export interface ISignIn {
  email: string;
  password: string;
}

const SignIn = () => {
  const dispatch = useDispatch();

  const handleSignInPress = ({ email, password }: ISignIn) => {
    dispatch(login({ email, password }));
  };

  return <SignInScreen signIn={handleSignInPress} />;
};

export default SignIn;
