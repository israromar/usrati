import React from 'react';
import axios from 'axios';
import { userConstants } from '../../constants/user.constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUser, login } from '../../services/api';
export const restoreToken = ({ token }) => (dispatch) => {
  dispatch({ type: userConstants.RESTORE_TOKEN, payload: token });
};

export const signUp = ({ username, email, password }) => (
  dispatch,
  getState,
) => {
  console.log('getState', getState());
  // Initial action dispatched
  dispatch({ type: userConstants.SIGNUP_REQUEST });

  createUser({ username, password, userType: 'parent' })
    .then((res) => {
      console.log('res: ', res);
      // return;
      dispatch({
        type: userConstants.SIGNUP_SUCCESS,
        payload: res?.token,
      });
    })
    .catch((err) => {
      console.log('errordasda: ', err);
      dispatch({
        type: userConstants.SIGNUP_FAIL,
        payload: err.error,
      });
    });
  return Promise.resolve();
};

export const signIn = ({ username, password }) => (dispatch) => {
  login({ username, password })
    .then((res) => {
      console.log('res: ', res);
      AsyncStorage.setItem('userToken', 'dummy-auth-token');
      dispatch({
        type: userConstants.LOGIN_SUCCESS,
        payload: res?.token,
      });
    })
    .catch((err) => {
      console.log('errordasda: ', err);
      dispatch({
        type: userConstants.LOGIN_SUCCESS,
        payload: err.error,
      });
    });

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
