import { subMatricsConstants, childConstants } from '../../constants';
import {
  addSubMatric as addSubMatricCat,
  editSubMatric as editSubMatricCat,
  deleteSubMatric as deleteSubMatricCat,
  getSubMatrics,
  updateSubMatrics,
  taskAssign,
} from '../../services/api';

export const addSubMatric = ({
  parentCategoryID,
  matricPhoto,
  matricTitle,
  matricWeightage,
  matricDescription,
}: any) => (dispatch: any) => {
  dispatch({
    type: subMatricsConstants.ADD_SUB_MATRIC_REQUEST,
  });

  let formData = new FormData();
  formData.append('parentCategoryID', parentCategoryID);
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

  addSubMatricCat(formData)
    .then((res: any) => {
      dispatch({
        type: subMatricsConstants.ADD_SUB_MATRIC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: subMatricsConstants.ADD_SUB_MATRIC_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};

export const editSubMatric = ({
  matricId,
  matricPhoto,
  matricTitle,
  matricWeightage,
  matricDescription,
}: any) => (dispatch: any) => {
  dispatch({
    type: subMatricsConstants.EDIT_SUB_MATRIC_REQUEST,
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

  editSubMatricCat(matricId, formData)
    .then((res: any) => {
      dispatch({
        type: subMatricsConstants.EDIT_SUB_MATRIC_SUCCESS,
        payload: res,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: subMatricsConstants.EDIT_SUB_MATRIC_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};

export const deleteSubMatric = ({ matricId }: any) => (dispatch: any) => {
  dispatch({
    type: subMatricsConstants.DELETE_SUB_MATRIC_REQUEST,
  });

  deleteSubMatricCat(matricId)
    .then((res: any) => {
      dispatch({
        type: subMatricsConstants.DELETE_SUB_MATRIC_SUCCESS,
        payload: res,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: subMatricsConstants.DELETE_SUB_MATRIC_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};

export const getAllSubMatrics = ({ parentCategoryID }: any) => (
  dispatch: any,
) => {
  dispatch({
    type: subMatricsConstants.GET_SUB_MATRICS_REQUEST,
  });

  getSubMatrics({ parentCategoryID })
    .then((res: any) => {
      dispatch({
        type: subMatricsConstants.GET_SUB_MATRICS_SUCCESS,
        payload: res,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: subMatricsConstants.GET_SUB_MATRICS_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};

export const updateAllSubMatrics = ({ matrics }: any) => (dispatch: any) => {
  dispatch({
    type: subMatricsConstants.UPDATE_SUB_MATRICS_REQUEST,
  });
  const stringyFiedMatrics = JSON.stringify(matrics);
  let formData = new FormData();
  formData.append('subcategories', stringyFiedMatrics);

  updateSubMatrics(formData)
    .then((res: any) => {
      dispatch({
        type: subMatricsConstants.UPDATE_SUB_MATRICS_SUCCESS,
        payload: res,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: subMatricsConstants.UPDATE_SUB_MATRICS_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};

export const assignTask = ({ selectedTask, selectedChildren, rule }: any) => (
  dispatch: any,
) => {
  dispatch({
    type: subMatricsConstants.ASSIGN_TASK_REQUEST,
  });
  let formData = new FormData();
  formData.append('RecurrenceRule', rule);
  formData.append('childrenIDs', JSON.stringify(selectedChildren));
  formData.append('subCategoryID', JSON.stringify(selectedTask));

  taskAssign(formData)
    .then((res: any) => {
      dispatch({
        type: subMatricsConstants.ASSIGN_TASK_SUCCESS,
        payload: res,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: subMatricsConstants.ASSIGN_TASK_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};
