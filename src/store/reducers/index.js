import { combineReducers } from 'redux';

import theme from './theme.reducer';
import auth from './auth.reducer';
import user from './user.reducer';

export default combineReducers({
  theme,
  auth,
  user,
});
