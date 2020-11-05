import {LOGIN_SUCCESS, LOGOUT} from './types';

export const login = (username, password) => (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: {user: {username, password}},
  });

  return Promise.resolve();
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
