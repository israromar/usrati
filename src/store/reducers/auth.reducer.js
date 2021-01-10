import { userConstants } from '../../constants/user.constants';
const initialState = { isLoading: false, isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case userConstants.RESTORE_TOKEN: {
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
        isLoggedIn: true,
      };
    }
    case userConstants.SIGNUP_SUCCESS: {
      return {
        ...state,
        userToken: payload,
        isLoading: false,
        isLoggedIn: true,
      };
    }
    case userConstants.LOGIN_SUCCESS: {
      return {
        ...state,
        userToken: payload,
        isLoading: false,
        isLoggedIn: true,
      };
    }
    case userConstants.LOGOUT: {
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
