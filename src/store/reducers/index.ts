import { combineReducers } from 'redux';

import theme from './theme.reducer';
import language from './language.reducer';
import auth from './auth.reducer';
import user from './user.reducer';
import family from './family.reducer';
import matrics from './matric.reducer';
import subMatrics from './sub-matric.reducer';
import { authConstants } from '../../constants';

const appReducer = combineReducers({
  /* app’s top-level reducers */
  theme,
  language,
  auth,
  user,
  family,
  matrics,
  subMatrics,
});

export const rootReducer = (state: any, action: { type: string }) => {
  if (action.type === authConstants.LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};
