import { themeConstants } from '../../constants/theme.constants';

export const toggleTheme = ({ theme }: any) => (dispatch: any) => {
  dispatch({ type: themeConstants.TOGGLE_THEME, payload: theme });
};
