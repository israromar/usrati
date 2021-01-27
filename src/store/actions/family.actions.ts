import { familySettingsConstants } from '../../constants';
import {
  addFamily,
  addNewGuardian,
  addNewChild,
  getAllChildren,
} from '../../services/api';

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
  childName,
  dob,
  schoolName,
  interest,
  username,
  password,
}) => (dispatch) => {
  dispatch({
    type: familySettingsConstants.ADD_CHILD_REQUEST,
  });

  console.log('data child: ', {
    childPhoto,
    childName,
    dob,
    schoolName,
    interest,
    username,
    password,
  });

  let bd = dob.toString();

  console.log('-00-120398109238', typeof bd, bd);
  var formData = new FormData();
  // formData.append('name', childName);
  formData.append('username', username);
  formData.append('password', password);
  formData.append('dob', bd);
  formData.append('interest', interest);
  formData.append('schoolname', schoolName);

  if (childPhoto) {
    const { uri, type, fileName: name } = childPhoto;
    var photo = {
      uri,
      type,
      name,
    };
    formData.append('photo', photo);
  }

  addNewChild(formData)
    .then((res) => {
      console.log('🚀 ~ file: family.actions.ts ~ line 119 ~ .then ~ res', res);
      dispatch({
        type: familySettingsConstants.ADD_CHILD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log('🚀 ~ file: family.actions.ts ~ line 123 ~ error', error);
      dispatch({
        type: familySettingsConstants.ADD_CHILD_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};

export const getChildren = ({ familyID }: any) => (dispatch: any) => {
  dispatch({
    type: familySettingsConstants.GET_CHILDREN_REQUEST,
  });

  getAllChildren({ familyID })
    .then((res) => {
      console.log('🚀 ~ file: family.actions.ts ~ line 139 ~ .then ~ res', res);
      dispatch({
        type: familySettingsConstants.GET_CHILDREN_SUCCESS,
        payload: res,
      });
    })
    .catch((error) => {
      dispatch({
        type: familySettingsConstants.GET_CHILDREN_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};
