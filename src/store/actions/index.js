import {SAVE_TOKEN} from './types';
export const saveToken = (key) => ({
  type: SAVE_TOKEN,
  payload: key,
});
