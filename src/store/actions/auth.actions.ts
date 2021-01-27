import { authConstants, userConstants } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUser, createParent, login } from '../../services/api';

export const restoreToken = ({ token }: any) => (dispatch: any) => {
  dispatch({ type: authConstants.RESTORE_TOKEN, payload: token });
};

export const signUp = ({ username, email, password }) => (
  dispatch,
  getState,
) => {
  // Initial action dispatched
  dispatch({ type: authConstants.SIGNUP_REQUEST });

  try {
    createUser({ username, password, userType: 'parent' })
      .then((user) => {
        AsyncStorage.setItem('userToken', user.token);
        let { token } = user;
        createParent({ token, email })
          .then((res) => {
            console.log(
              '🚀 ~ file: auth.actions.js ~ line 23 ~ .then ~ res',
              res,
            );
            login({ username, password })
              .then((userInfo) => {
                console.log(
                  '🚀 ~ file: auth.actions.ts ~ line 29 ~ .then ~ userInfo',
                  userInfo,
                );
                dispatch({
                  type: authConstants.SIGNUP_SUCCESS,
                  payload: userInfo.token,
                });
                dispatch({
                  type: userConstants.UPDATE_USER,
                  payload: userInfo.data,
                });
              })
              .catch((error) => {
                dispatch({
                  type: authConstants.SIGNIN_FAIL,
                  payload: error,
                });
              });
          })
          .catch((error) => {
            console.log(
              '🚀 ~ file: auth.actions.js ~ line 37 ~ .then ~ error',
              error,
            );
            dispatch({
              type: authConstants.SIGNUP_FAIL,
              payload: error,
            });
          });
      })
      .catch(({ error }) => {
        console.log('🚀 ~ file: auth.actions.js ~ line 45 ~ error', error);
        dispatch({
          type: authConstants.SIGNUP_FAIL,
          payload: error,
        });
      });

    return Promise.resolve();
  } catch (e) {
    console.log('error creation: ', e);
  }
};

export const signIn = ({ username, password }: any) => (dispatch: any) => {
  dispatch({ type: authConstants.SIGNIN_REQUEST });

  login({ username, password })
    .then((user) => {
      console.log('🚀 ~ file: auth.actions.ts ~ line 66 ~ .then ~ user', user);
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
  AsyncStorage.clear();
  dispatch({
    type: authConstants.LOGOUT,
  });
};
