import { familySettingsConstants } from '../../constants';
import {
  addFamily,
  addNewGuardian,
  addNewChild,
  updateChildData,
  getAllChildren,
  updateGuardianData,
  deleteGuardianData,
  deleteChildData,
} from '../../services/api';

export const addFamilySettings = ({
  id,
  familyName,
  familyPhoto,
  isFamilyPhotoDeleted: photoDeleted,
  flag,
}) => (dispatch) => {
  dispatch({
    type:
      flag === 'add'
        ? familySettingsConstants.ADD_FAMILY_SETTINGS_REQUEST
        : familySettingsConstants.UPDATE_FAMILY_SETTINGS_REQUEST,
  });

  let formData = new FormData();
  formData.append('name', familyName);
  formData.append('photoDelete', photoDeleted);

  if (familyPhoto) {
    const { uri, type, fileName: name } = familyPhoto;
    var photo = {
      uri,
      type,
      name,
    };
    formData.append('photo', photo);
  } else {
    formData.append('photo', '');
  }

  addFamily(id, formData, flag)
    .then((res) => {
      console.log('🚀 ~ file: family.actions.ts ~ line 49 ~ .then ~ res', res);
      dispatch({
        type:
          flag === 'add'
            ? familySettingsConstants.ADD_FAMILY_SETTINGS_SUCCESS
            : familySettingsConstants.UPDATE_FAMILY_SETTINGS_SUCCESS,
        payload: flag === 'add' ? res.data : res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type:
          flag === 'add'
            ? familySettingsConstants.ADD_FAMILY_SETTINGS_FAIL
            : familySettingsConstants.UPDATE_FAMILY_SETTINGS_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};

export const addGuardian = ({
  id,
  photo: guardianPhoto,
  email,
  username,
  password,
  isGuardianPhotoDeleted: photoDeleted,
  flag,
}) => (dispatch) => {
  dispatch({
    type:
      flag === 'add'
        ? familySettingsConstants.ADD_GUARDIAN_REQUEST
        : familySettingsConstants.UPDATE_GUARDIAN_REQUEST,
  });

  var formData = new FormData();
  formData.append('email', email);
  formData.append('username', username);
  formData.append('password', password);
  formData.append('photoDelete', photoDeleted);

  if (guardianPhoto) {
    const { uri, type, fileName: name } = guardianPhoto;
    var photo = {
      uri,
      type,
      name,
    };
    formData.append('photo', photo);
  }

  // addNewGuardian({ email, username, password })
  addNewGuardian(id, formData, flag)
    .then((res) => {
      dispatch({
        type:
          flag === 'add'
            ? familySettingsConstants.ADD_GUARDIAN_SUCCESS
            : familySettingsConstants.UPDATE_GUARDIAN_SUCCESS,
        payload: flag === 'add' ? res.data : res,
      });
    })
    .catch((error) => {
      dispatch({
        type:
          flag === 'add'
            ? familySettingsConstants.ADD_GUARDIAN_FAIL
            : familySettingsConstants.UPDATE_GUARDIAN_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};

export const editGuardian = ({
  parentId,
  photo: guardianPhoto,
  email,
  username,
  password,
}) => (dispatch) => {
  dispatch({
    type: familySettingsConstants.DELETE_GUARDIAN_REQUEST,
  });

  var formData = new FormData();
  formData.append('email', email);
  formData.append('username', username);
  formData.append('password', password);

  if (guardianPhoto) {
    const { uri, type, fileName: name } = guardianPhoto;
    var photo = {
      uri,
      type,
      name,
    };
    formData.append('photo', photo);
  }

  updateGuardianData(parentId, formData)
    .then((res) => {
      console.log('🚀 ~ file: family.actions.ts ~ line 164 ~ .then ~ res', res);
      dispatch({
        type: familySettingsConstants.DELETE_GUARDIAN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log('🚀 ~ file: family.actions.ts ~ line 171 ~ error', error);
      dispatch({
        type: familySettingsConstants.DELETE_GUARDIAN_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};

export const deleteGuardian = ({ parentId }: any) => (dispatch: any) => {
  dispatch({
    type: familySettingsConstants.DELETE_GUARDIAN_REQUEST,
  });

  deleteGuardianData(parentId)
    .then((res) => {
      dispatch({
        type: familySettingsConstants.DELETE_GUARDIAN_SUCCESS,
        payload: { parentId },
      });
    })
    .catch((error) => {
      dispatch({
        type: familySettingsConstants.DELETE_GUARDIAN_FAIL,
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

  console.log(
    'addChildaddChild',
    childPhoto,
    // childName,
    // dob,
    schoolName,
    interest,
    // username,
    // password,
  );

  let bd = dob.toString();

  var formData = new FormData();
  formData.append('name', childName);
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
      dispatch({
        type: familySettingsConstants.ADD_CHILD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log('🚀 ~ file: family.actions.ts ~ line 243 ~ error', error);
      dispatch({
        type: familySettingsConstants.ADD_CHILD_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};

export const updateChild = ({
  id,
  photo: childPhoto,
  childName,
  dob,
  schoolName,
  interest,
  username,
  password,
  isChildPhotoDeleted,
}) => (dispatch) => {
  dispatch({
    type: familySettingsConstants.UPDATE_CHILD_REQUEST,
  });

  let bd = dob.toString();

  var formData = new FormData();
  // formData.append('name', childName);
  // formData.append('username', username);
  // formData.append('password', password);
  // formData.append('dob', bd);
  formData.append('interest', interest);
  formData.append('schoolname', schoolName);
  formData.append('photoDeleted', isChildPhotoDeleted);

  if (childPhoto) {
    console.log(
      '11111111',
      id,
      childPhoto,
      // childName,
      // dob,
      schoolName,
      interest,
      // username,
      // password,
    );
    const { uri, type, fileName: name } = childPhoto;
    var photo = {
      uri,
      type,
      name,
    };
    formData.append('photo', photo);
  } else {
    console.log(
      '22222222',
      id,
      childPhoto,
      // childName,
      // dob,
      schoolName,
      interest,
      // username,
      // password,
    );
    formData.append('photo', '');
  }

  updateChildData(id, formData)
    .then((res: any) => {
      console.log('🚀 ~ file: family.actions.ts ~ line 289 ~ .then ~ res', res);
      dispatch({
        type: familySettingsConstants.UPDATE_CHILD_SUCCESS,
        payload: res?.data,
      });
    })
    .catch((error: any) => {
      console.log('🚀 ~ file: family.actions.ts ~ line 296 ~ error', error);
      dispatch({
        type: familySettingsConstants.UPDATE_CHILD_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};

export const deleteChild = ({ childId }: any) => (dispatch: any) => {
  dispatch({
    type: familySettingsConstants.DELETE_CHILD_REQUEST,
  });

  deleteChildData(childId)
    .then((res) => {
      dispatch({
        type: familySettingsConstants.DELETE_CHILD_SUCCESS,
        payload: { childId },
      });
    })
    .catch((error) => {
      dispatch({
        type: familySettingsConstants.DELETE_CHILD_FAIL,
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
