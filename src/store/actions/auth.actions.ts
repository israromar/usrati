import { authConstants, userConstants } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUser, createParent, login } from '../../services/api';

export const restoreToken = ({ token }: any) => (dispatch: any) => {
  dispatch({ type: authConstants.RESTORE_TOKEN, payload: token });
};

export const signUp = ({ username, email, password }) => async (
  dispatch,
  getState,
) => {
  // Initial action dispatched
  dispatch({ type: authConstants.SIGNUP_REQUEST });

  try {
    // const user = await createUser({ username, password, userType: 'parent' });
    // console.log('🚀 ~ file: auth.actions.ts ~ line 18 ~ user', user);
    // const parent = await createParent({ token: user?.token, email });
    // console.log('🚀 ~ file: auth.actions.ts ~ line 19 ~ parent', parent);
    // const userInfo = await login({ username, password });
    // console.log('🚀 ~ file: auth.actions.ts ~ line 20 ~ userInfo', userInfo);

    // if (userInfo) {
    //   dispatch({
    //     type: authConstants.SIGNUP_SUCCESS,
    //     payload: userInfo.token,
    //   });
    //   dispatch({
    //     type: userConstants.UPDATE_USER,
    //     payload: userInfo.data,
    //   });
    // } else {
    //   dispatch({
    //     type: authConstants.SIGNUP_FAIL,
    //     payload: 'Error',
    //   });
    // }

    createUser({ username, password, userType: 'parent' })
      .then((user) => {
        AsyncStorage.setItem('userToken', user.token);
        let { token } = user;
        createParent({ token, email })
          .then((res) => {
            login({ username, password })
              .then((userInfo) => {
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
            dispatch({
              type: authConstants.SIGNUP_FAIL,
              payload: error,
            });
          });
      })
      .catch(({ error }) => {
        dispatch({
          type: authConstants.SIGNUP_FAIL,
          payload: error,
        });
      });

    return Promise.resolve();
  } catch (err) {
    dispatch({
      type: authConstants.SIGNUP_FAIL,
      payload: err?.error ?? 'Something went wrong, try again!',
    });
  }
};

export const signIn = ({ username, password }: any) => (dispatch: any) => {
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
        payload: err?.error ?? 'Something went wrong, try again!',
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
