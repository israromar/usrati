import React from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

// import { forgotPassword } from '../../store/actions/auth.actions';
import { AppRoute } from '../../navigation/app-routes';
import { ForgotPasswordScreen } from '../../layouts';

export interface IForgotPassword {
  email: string;
}

const SignUp = () => {
  // const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const handleSubmit = ({ email }: IForgotPassword) => {
    console.log('handleSubmit -> email', email);
    // dispatch(forgotPassword({ email }));
    navigate(AppRoute.SIGN_IN);
  };

  return <ForgotPasswordScreen onSubmit={handleSubmit} />;
};

export default SignUp;
