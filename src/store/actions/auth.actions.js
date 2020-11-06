import { SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGOUT, RESTORE_TOKEN } from './types';

export const restoreToken = ({ token }) => (dispatch) => {
  dispatch({ type: RESTORE_TOKEN, payload: token });
};

export const signUp = ({ fullName, userName, email, password }) => (
  dispatch,
) => {
  dispatch({
    type: SIGNUP_SUCCESS,
    payload: 'dummy-auth-token',
    // payload: { email, password },
  });

  return Promise.resolve();
};

export const login = ({ email, password }) => (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: 'dummy-auth-token',
    // payload: { email, password },
  });

  return Promise.resolve();
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
