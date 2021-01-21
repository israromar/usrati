import { themeConstants } from '../../constants/theme.constants';

export const toggleTheme = ({ theme }) => (dispatch) => {
  console.log('toggleTheme -> theme', theme);
  dispatch({ type: themeConstants.TOGGLE_THEME, payload: theme });
};
