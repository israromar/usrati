import { familySettingsConstants } from '../../constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { addFamily, addNewGuardian, addNewChild } from '../../services/api';

export const addFamilySettings = ({ familyId, familyName, familyPhoto }) => (
  dispatch,
) => {
  console.log('asdqweqweqweqweqwe', { familyId, familyName, familyPhoto });
  // AsyncStorage.removeItem('userToken');
  dispatch({
    type: familySettingsConstants.ADD_FAMILY_SETTINGS_REQUEST,
  });

  let formData = new FormData();
  if (familyPhoto) {
    const { uri, type, fileName: name } = familyPhoto;
    var photo = {
      uri,
      type,
      name,
    };
    formData.append('photo', photo);
  }

  formData.append('name', familyName);

  addFamily(formData)
    .then((res) => {
      dispatch({
        type: familySettingsConstants.ADD_FAMILY_SETTINGS_SUCCESS,
        payload: res.SUCCESS,
      });
    })
    .catch((error) => {
      console.error('error in addFamily', JSON.parse(error));
      dispatch({
        type: familySettingsConstants.ADD_FAMILY_SETTINGS_FAIL,
        payload: error,
      });
    });
};

export const addGuardian = ({
  photo: guardianPhoto,
  email,
  username,
  password,
}) => (dispatch) => {
  // AsyncStorage.removeItem('userToken');
  dispatch({
    type: familySettingsConstants.ADD_GUARDIAN_REQUEST,
  });
  console.log({ guardianPhoto, email, username, password });

  // const { uri, type, fileName: name } = guardianPhoto;
  // var photo = {
  //   uri,
  //   type,
  //   name,
  // };

  // var formData = new FormData();
  // formData.append('photo', photo);
  // formData.append('email', email);
  // formData.append('username', username);
  // formData.append('password', password);

  addNewGuardian({ email, username, password })
    .then((res) => {
      console.log('🚀 ~ file: family.actions.js ~ line 40 ~ .then ~ res', res);
      dispatch({
        type: familySettingsConstants.ADD_GUARDIAN_SUCCESS,
        payload: res.SUCCESS,
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: familySettingsConstants.ADD_GUARDIAN_FAIL,
        payload: error.ERROR,
      });
    });
};

export const addChild = ({
  photo: childPhoto,
  name,
  dob,
  schoolName,
  interest,
  username,
  password,
}) => (dispatch) => {
  // AsyncStorage.removeItem('userToken');
  console.log({
    photo: childPhoto,
    name,
    dob,
    schoolName,
    interest,
    username,
    password,
  });
  dispatch({
    type: familySettingsConstants.ADD_CHILD_REQUEST,
  });

  // const { uri, type, fileName: name } = childPhoto;
  // var photo = {
  //   uri,
  //   type,
  //   name,
  // };

  // var formData = new FormData();
  // formData.append('photo', photo);
  // formData.append('name', name);
  // formData.append('dob', dob);
  // formData.append('schoolName', schoolName);
  // formData.append('interest', interest);
  // formData.append('username', username);
  // formData.append('password', password);

  addNewChild({ username, password, dob })
    .then((res) => {
      console.log('🚀 ~ file: family.actions.js ~ line 112 ~ .then ~ res', res);
      dispatch({
        type: familySettingsConstants.ADD_CHILD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.error('error: ', error);
      dispatch({
        type: familySettingsConstants.ADD_CHILD_FAIL,
        payload: error.ERROR,
      });
    });
};
