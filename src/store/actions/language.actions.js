import { languageConstants } from '../../constants/lanugage.constants';

export const changeLanguage = ({ language }) => (dispatch) => {
  console.log('toggleTheme -> theme', language);
  dispatch({ type: languageConstants.CHANGE_LANGUAGE, payload: language });
};
