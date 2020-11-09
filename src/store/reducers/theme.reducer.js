import { themeConstants } from '../../constants/theme.constants';

let initialState = {
  activeTheme: 'light',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log('type, payload', type, payload);
  switch (type) {
    case themeConstants.TOGGLE_THEME: {
      return {
        ...state,
        activeTheme: payload,
      };
    }
    default:
      //   console.log("activeTHeme:  ", state);
      return state;
  }
}
