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
}) => (dispatch) => {
  dispatch({
    type: userConstants.SIGNUP_SUCCESS,
    payload: 'dummy-auth-token',
    // payload: { email, password },
  });

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
