import { userConstants, childConstants } from '../../constants';

const initialState = {
  userInfo: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log('🚀 ~ file: user.reducer.ts ~ line 9 ~ payload', payload);
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
