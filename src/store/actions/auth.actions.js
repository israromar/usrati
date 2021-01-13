import { authConstants, userConstants } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUser, login } from '../../services/api';

export const restoreToken = ({ token }) => (dispatch) => {
  dispatch({ type: authConstants.RESTORE_TOKEN, payload: token });
};

export const signUp = ({ username, email, password }) => (
  dispatch,
  getState,
) => {
  // Initial action dispatched
  dispatch({ type: authConstants.SIGNUP_REQUEST });

  createUser({ username, password, userType: 'parent' })
    .then((user) => {
      AsyncStorage.setItem('userToken', user.token);

      dispatch({
        type: authConstants.SIGNUP_SUCCESS,
        payload: user.token,
      });
      dispatch({
        type: userConstants.UPDATE_USER,
        payload: user,
      });
    })
    .catch(({ error }) => {
      dispatch({
        type: authConstants.SIGNUP_FAIL,
        payload: error,
      });
    });

  return Promise.resolve();
};

export const signIn = ({ username, password }) => (dispatch) => {
  dispatch({ type: authConstants.SIGNIN_REQUEST });

  login({ username, password })
    .then((user) => {
      if (user.token) {
        AsyncStorage.setItem('userToken', user.token);

        dispatch({
          type: authConstants.SIGNIN_SUCCESS,
          payload: user,
        });
        dispatch({
          type: userConstants.UPDATE_USER,
          payload: user.data,
        });
      } else {
        dispatch({
          type: authConstants.SIGNIN_FAIL,
          payload: 'Incorrect username or password!',
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: authConstants.SIGNIN_FAIL,
        payload: err.error,
      });
    });

  return Promise.resolve();
};

export const logout = () => (dispatch) => {
  AsyncStorage.removeItem('userToken');
  dispatch({
    type: authConstants.LOGOUT,
  });
};
