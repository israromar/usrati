import {LOGIN_SUCCESS} from '../actions/types';

const initialState = {isLoggedIn: false, user: null};

export default function (state = initialState, action) {
  const {type, payload} = action;
  console.log('type, payload', type, payload);
  switch (type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    }
    default:
      return state;
  }
}
