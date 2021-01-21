import { themeConstants } from '../../constants/theme.constants';

let initialState = {
  activeTheme: 'light',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case themeConstants.TOGGLE_THEME: {
      return {
        ...state,
        activeTheme: payload,
      };
    }
    default:
      return state;
  }
}
