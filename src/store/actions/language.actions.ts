import { languageConstants } from '../../constants/language.constants';

export const changeLanguage = ({ language }: any) => (dispatch: any) => {
  dispatch({ type: languageConstants.CHANGE_LANGUAGE, payload: language });
};
