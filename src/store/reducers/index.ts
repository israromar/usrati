import { combineReducers } from 'redux';

import theme from './theme.reducer';
import language from './language.reducer';
import auth from './auth.reducer';
import user from './user.reducer';

export default combineReducers({
  theme,
  language,
  auth,
  user,
});
