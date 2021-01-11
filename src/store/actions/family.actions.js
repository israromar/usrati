import { familySettingsConstants } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addFamily } from '../../services/api';

export const addFamilySettings = ({ familyId, familyName, familyPhoto }) => (
  dispatch,
) => {
  console.log('here-------------', familyId, familyName, familyPhoto);
  // AsyncStorage.removeItem('userToken');
  dispatch({
    type: familySettingsConstants.ADD_FAMILY_SETTINGS_REQUEST,
  });
  addFamily({ name: familyName, photo: familyPhoto })
    .then((res) => {
      console.log(
        '🚀 ~ file: family.actions.js ~ line 15 ~ .then ~ res',
        res.SUCCESS,
      );
      dispatch({
        type: familySettingsConstants.ADD_FAMILY_SETTINGS_SUCCESS,
        payload: res.SUCCESS,
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
