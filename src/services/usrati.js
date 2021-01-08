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
  baseURL: 'http://usrati-app.herokuapp.com/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

usrati.interceptors.request.use(
  (config) => {
    return getUser().then((user) => {
      user = JSON.parse(user);
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
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
