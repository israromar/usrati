import { authConstants, userConstants } from '../../constants';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  isSignUpFailed: false,
  isSignInFailed: false,
  userToken: null,
  user: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case authConstants.RESTORE_TOKEN: {
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
        isLoggedIn: true,
      };
    }
    case authConstants.SIGNUP_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isLoggedIn: false,
        isSignInFailed: false,
        isSignUpFailed: false,
      };
    }
    case authConstants.SIGNIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isLoggedIn: false,
        isSignInFailed: false,
        isSignUpFailed: false,
        error: null,
      };
    }
    case authConstants.SIGNUP_SUCCESS: {
      return {
        ...state,
        userToken: payload,
        isLoading: false,
        isLoggedIn: true,
        isSignInFailed: false,
        isSignUpFailed: false,
        error: null,
      };
    }
    case authConstants.SIGNIN_SUCCESS: {
      return {
        ...state,
        userToken: payload,
        isLoading: false,
        isLoggedIn: true,
        isSignInFailed: false,
        isSignUpFailed: false,
        error: null,
      };
    }
    case authConstants.SIGNUP_FAIL: {
      return {
        ...state,
        isLoading: false,
        isSignUpFailed: true,
        isSignInFailed: false,
        error: payload,
      };
    }
    case authConstants.SIGNIN_FAIL: {
      return {
        ...state,
        isLoading: false,
        isSignInFailed: true,
        isSignUpFailed: false,
        error: payload,
      };
    }
    case authConstants.LOGOUT: {
      return {
        usertToken: null,
        isLoading: false,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
}
