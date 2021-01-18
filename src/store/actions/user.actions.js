import {
  authConstants,
  familySettingsConstants,
  userConstants,
} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addFamily } from '../../services/api';

export const updateUser = (user) => ({
  type: userConstants.UPDATE_USER,
  payload: user,
});

// export const getUser = (user) => ({
//   type: userConstants,
//   payload: user,
// });

export const addFamilySettings = ({ familyName, familyId, familyPhoto }) => (
  dispatch,
) => {
  // AsyncStorage.removeItem('userToken');
  dispatch({
    type: familySettingsConstants.ADD_FAMILY_SETTINGS_REQUEST,
  });
  addFamily({ familyName, familyId, familyPhoto })
    .then((res) => {
      dispatch({
        type: familySettingsConstants.ADD_FAMILY_SETTINGS_SUCCESS,
        payload: res,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: familySettingsConstants.ADD_FAMILY_SETTINGS_FAIL,
        payload: error,
      });
    });
};
