import { userConstants } from '../../constants';

const initialState = {
  userInfo: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case userConstants.UPDATE_USER: {
      return {
        userInfo: payload,
      };
    }
    default:
      return state;
  }
}
