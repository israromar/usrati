import { familySettingsConstants } from '../../constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { addFamily, addNewGuardian, addNewChild } from '../../services/api';

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

export const addGuardian = ({ email, username, password }) => (dispatch) => {
  // AsyncStorage.removeItem('userToken');
  dispatch({
    type: familySettingsConstants.ADD_GUARDIAN_REQUEST,
  });
  addNewGuardian({ email, username, password })
    .then((res) => {
      console.log('🚀 ~ file: family.actions.js ~ line 40 ~ .then ~ res', res);
      dispatch({
        type: familySettingsConstants.ADD_GUARDIAN_SUCCESS,
        payload: res.SUCCESS,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: familySettingsConstants.ADD_GUARDIAN_FAIL,
        payload: error,
      });
    });
};

export const addChild = ({ email, username, dob }) => (dispatch) => {
  // AsyncStorage.removeItem('userToken');
  dispatch({
    type: familySettingsConstants.ADD_CHILD_REQUEST,
  });
  addNewChild({ email, username, dob })
    .then((res) => {
      console.log('🚀 ~ file: family.actions.js ~ line 63 ~ .then ~ res', res);
      dispatch({
        type: familySettingsConstants.ADD_CHILD_SUCCESS,
        payload: res.SUCCESS,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: familySettingsConstants.ADD_CHILD_FAIL,
        payload: error,
      });
    });
};
