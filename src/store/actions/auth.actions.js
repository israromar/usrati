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
  console.log('getState', getState());
  // Initial action dispatched
  dispatch({ type: authConstants.SIGNUP_REQUEST });
  return;
  createUser({ username, password, userType: 'parent' })
    .then((user) => {
      console.log('res: ', user);
      dispatch({
        type: authConstants.SIGNUP_SUCCESS,
        payload: user.token,
      });
      dispatch({
        type: userConstants.UPDATE_USER,
        payload: user,
      });
    })
    .catch((err) => {
      console.log('errordasda: ', err);
      dispatch({
        type: authConstants.SIGNUP_FAIL,
        payload: err.error,
      });
    });
  return Promise.resolve();
};

export const signIn = ({ username, password }) => (dispatch) => {
  dispatch({ type: authConstants.SIGNIN_REQUEST });

  login({ username, password })
    .then((user) => {
      console.log('login success: ', user);
      if (user.token) {
        console.log(
          '🚀 ~ file: auth.actions.js ~ line 46 ~ .then ~ user',
          user,
        );
        AsyncStorage.setItem('userToken', user.token);

        setTimeout(() => {
          dispatch({
            type: authConstants.SIGNIN_SUCCESS,
            payload: user.token,
          });
          dispatch({
            type: userConstants.UPDATE_USER,
            payload: user.data,
          });
        }, 5000);
      } else {
        dispatch({
          type: authConstants.SIGNIN_FAIL,
          payload: 'Incorrect username or password!',
        });
      }
    })
    .catch((err) => {
      console.log('errordasda: ', err);
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
