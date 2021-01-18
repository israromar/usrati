import axios from 'axios';
// import Realm from 'realm';
// import UserSchema from "../schemas/UserSchema";
import { getUser } from '../helpers';

// const getRealmUser = async () => {
// 	return Realm.open({ path: 'BikoApp.realm', schema: [ UserSchema ] })
// 		.then(realm => {
// 			return realm.objects('User')[0]
// 		})
// 		.catch(error => { throw error })
// };

/**
 * Usrati
 * @type {AxiosInstance}
 */
const usrati = axios.create({
  baseURL: 'http://157.230.254.77/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

usrati.interceptors.request.use(
  (config) => {
    return getUser().then((token) => {
      console.log(
        '🚀 ~ file: usrati.js ~ line 29 ~ returngetUser ~ user',
        token,
      );
      // user = JSON.parse(token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log(config);
      return Promise.resolve(config);
    });
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default usrati;
