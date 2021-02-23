import { userConstants, childConstants } from '../../constants';

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
    case childConstants.GET_CHILD_DATA_SUCCESS: {
      return {
        userInfo: payload,
      };
    }
    default:
      return state;
  }
}
