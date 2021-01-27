import { matricsConstants } from '../../constants';
import {
  addMatric as addMatricCat,
  editMatric as editMatricCat,
  deleteMatric as deleteMatricCat,
  getMatrics,
  updateMatrics,
} from '../../services/api';

export const addMatric = ({
  parentID,
  matricPhoto,
  matricTitle,
  matricWeightage,
  matricDescription,
}: any) => (dispatch: any) => {
  dispatch({
    type: matricsConstants.ADD_MATRIC_REQUEST,
  });

  let formData = new FormData();
  formData.append('parentID', parentID);
  formData.append('title', matricTitle);
  formData.append('weightage', matricWeightage);
  formData.append('description', matricDescription);

  if (matricPhoto) {
    const { uri, type, fileName: name } = matricPhoto;
    var photo = {
      uri,
      type,
      name,
    };
    formData.append('photo', photo);
  }

  addMatricCat(formData)
    .then((res: any) => {
      console.log('🚀 ~ file: matric.actions.ts ~ line 38 ~ .then ~ res', res);
      dispatch({
        type: matricsConstants.ADD_MATRIC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error: any) => {
      console.log('🚀 ~ file: matric.actions.ts ~ line 45 ~ error', error);
      dispatch({
        type: matricsConstants.ADD_MATRIC_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};

export const editMatric = ({
  matricId,
  matricPhoto,
  matricTitle,
  matricWeightage,
  matricDescription,
}: any) => (dispatch: any) => {
  dispatch({
    type: matricsConstants.EDIT_MATRIC_REQUEST,
  });

  let formData = new FormData();
  // formData.append('parentID', parentID);
  formData.append('title', matricTitle);
  formData.append('weightage', matricWeightage);
  formData.append('description', matricDescription);

  if (matricPhoto) {
    const { uri, type, fileName: name } = matricPhoto;
    var photo = {
      uri,
      type,
      name,
    };
    formData.append('photo', photo);
  }

  editMatricCat(matricId, formData)
    .then((res: any) => {
      dispatch({
        type: matricsConstants.EDIT_MATRIC_SUCCESS,
        payload: res,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: matricsConstants.EDIT_MATRIC_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};

export const deleteMatric = ({ matricId }: any) => (dispatch: any) => {
  dispatch({
    type: matricsConstants.DELETE_MATRICS_REQUEST,
  });

  deleteMatricCat(matricId)
    .then((res: any) => {
      dispatch({
        type: matricsConstants.DELETE_MATRICS_SUCCESS,
        payload: res,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: matricsConstants.DELETE_MATRICS_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};

export const getAllMatrics = ({ parentID }: any) => (dispatch: any) => {
  dispatch({
    type: matricsConstants.GET_MATRICS_REQUEST,
  });

  getMatrics({ parentID })
    .then((res: any) => {
      dispatch({
        type: matricsConstants.GET_MATRICS_SUCCESS,
        payload: res,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: matricsConstants.GET_MATRICS_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};

export const updateAllMatrics = ({ matrics }: any) => (dispatch: any) => {
  dispatch({
    type: matricsConstants.UPDATE_MATRICS_REQUEST,
  });
  const stringyFiedMatrics = JSON.stringify(matrics);
  let formData = new FormData();
  formData.append('categories', stringyFiedMatrics);

  updateMatrics(formData)
    .then((res: any) => {
      dispatch({
        type: matricsConstants.UPDATE_MATRICS_SUCCESS,
        payload: res,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: matricsConstants.UPDATE_MATRICS_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};
