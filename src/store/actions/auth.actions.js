import axios from 'axios';
import { userConstants } from '../../constants/user.constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const restoreToken = ({ token }) => (dispatch) => {
  dispatch({ type: userConstants.RESTORE_TOKEN, payload: token });
};

export const signUp = ({
  firstName,
  lastName,
  dob,
  email,
  password,
  termsAccepted,
}) => (dispatch, getState) => {
  console.log('getState', getState());
  // Initial action dispatched
  dispatch({ type: userConstants.SIGNUP_REQUEST });
  dispatch({
    type: userConstants.SIGNUP_SUCCESS,
    payload: 'dummy-auth-token',
  });

  // axios.post('/api/auth/regitser').then(
  //   (user) =>
  //     dispatch({
  //       type: userConstants.SIGNUP_SUCCESS,
  //       payload: 'dummy-auth-token',
  //     }),
  //   (err) => dispatch({ type: userConstants.SIGNUP_FAIL, err }),
  // );
  return Promise.resolve();
};

export const login = ({ email, password }) => (dispatch) => {
  AsyncStorage.setItem('userToken', 'dummy-auth-token');
  dispatch({
    type: userConstants.LOGIN_SUCCESS,
    payload: 'dummy-auth-token',
    // payload: { email, password },
  });

  return Promise.resolve();
};

export const logout = () => (dispatch) => {
  AsyncStorage.removeItem('userToken');
  dispatch({
    type: userConstants.LOGOUT,
  });
};
