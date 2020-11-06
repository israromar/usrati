import {
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  RESTORE_TOKEN,
} from '../actions/types';

const initialState = { isLoading: false, isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case RESTORE_TOKEN: {
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
        isLoggedIn: false,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        userToken: payload,
        isLoading: false,
        isLoggedIn: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        userToken: payload,
        isLoading: false,
        isLoggedIn: true,
      };
    }
    case LOGOUT: {
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
