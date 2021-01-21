import { languageConstants } from '../../constants/language.constants';

export const changeLanguage = ({ language }) => (dispatch) => {
  dispatch({ type: languageConstants.CHANGE_LANGUAGE, payload: language });
};
