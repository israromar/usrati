import React from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/actions/auth.actions';
import { SignUpScreen } from '../../layouts';

export interface ISignUp {
  firstName: string;
  lastName: string;
  dob: Date;
  email: string;
  password: string;
  termsAccepted: boolean;
}

const SignUp = () => {
  const dispatch = useDispatch();

  const handleSignUpPress = ({
    firstName,
    lastName,
    email,
    dob,
    password,
    termsAccepted,
  }: ISignUp) => {
    dispatch(
      signUp({ firstName, lastName, dob, email, password, termsAccepted }),
    );
  };

  return <SignUpScreen signUp={handleSignUpPress} />;
};

export default SignUp;
