import { languageConstants } from '../../constants/lanugage.constants';

let initialState = {
  activeLanguage: 'en',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case languageConstants.CHANGE_LANGUAGE: {
      return {
        ...state,
        activeLanguage: payload,
      };
    }
    default:
      return state;
  }
}
