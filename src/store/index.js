import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CombinedReducers from './reducers';
// Redux Debugger
let composeEnhancer = compose;
if (__DEV__) {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
// const CombinedReducers = {
//   appData: Reducers,
// };
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['navigation'], // navigation will not be persisted
  // stateReconciler: autoMergeLevel2,
  // timeout: 100000,
};
const loggerMiddlleware = createLogger();
const persistedReducer = persistReducer(persistConfig, CombinedReducers);
export const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk, loggerMiddlleware)),
);
export const persistor = persistStore(store);
