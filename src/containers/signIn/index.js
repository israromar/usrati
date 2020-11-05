import React from 'react';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {login} from '../../store/actions/auth.actions';

import SignInScreen from '../../screens/signIn';

const SignIn = ({user, onLogin}) => {
  console.log('props', user, onLogin);
  const navigation = useNavigation();

  const handleSignInPress = (email, pass) => {
    console.log('handleSignInPress -> val', email, pass);
    // return;
    onLogin(email, pass);
  };
  return <SignInScreen onSignInPress={handleSignInPress} />;
};

const mapStateToProps = (state) => {
  console.log('mapStateToProps -> state', state);
  return {user: state.user};
};

const mapDispatchToProps = (dispatch) => ({
  onLogin: (email, pass) => {
    dispatch(login(email, pass));
  },
});

const SignInContainer = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignInContainer;
