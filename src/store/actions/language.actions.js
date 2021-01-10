import { languageConstants } from '../../constants/lanugage.constants';

export const changeLanguage = ({ language }) => (dispatch) => {
  dispatch({ type: languageConstants.CHANGE_LANGUAGE, payload: language });
};
