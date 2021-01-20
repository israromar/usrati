import { combineReducers } from 'redux';

import theme from './theme.reducer';
import language from './language.reducer';
import auth from './auth.reducer';
import user from './user.reducer';
import family from './family.reducer';
import matrics from './matric.reducer';

export default combineReducers({
  theme,
  language,
  auth,
  user,
  family,
  matrics,
});
