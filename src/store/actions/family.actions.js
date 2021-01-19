import { familySettingsConstants } from '../../constants';
import { addFamily, addNewGuardian, addNewChild } from '../../services/api';

export const addFamilySettings = ({ familyName, familyPhoto }) => (
  dispatch,
) => {
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
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: familySettingsConstants.ADD_FAMILY_SETTINGS_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};

export const addGuardian = ({
  photo: guardianPhoto,
  email,
  username,
  password,
}) => (dispatch) => {
  dispatch({
    type: familySettingsConstants.ADD_GUARDIAN_REQUEST,
  });

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
      dispatch({
        type: familySettingsConstants.ADD_GUARDIAN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: familySettingsConstants.ADD_GUARDIAN_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
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
      dispatch({
        type: familySettingsConstants.ADD_CHILD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: familySettingsConstants.ADD_CHILD_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};
