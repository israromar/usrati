import { matricsConstants } from '../../constants';
import { addMatricCategory, getMatrics } from '../../services/api';

export const addMatric = ({
  parentID,
  matricPhoto,
  matricTitle,
  matricWeightage,
  matricDescription,
}) => (dispatch) => {
  dispatch({
    type: matricsConstants.ADD_MATRIC_REQUEST,
  });

  let formData = new FormData();
  if (matricPhoto) {
    const { uri, type, fileName: name } = matricPhoto;
    var photo = {
      uri,
      type,
      name,
    };
    formData.append('photo', photo);
  }

  formData.append('parentID', parentID);
  formData.append('title', matricTitle);
  formData.append('weightage', matricWeightage);
  formData.append('description', matricDescription);

  addMatricCategory(formData)
    .then((res) => {
      dispatch({
        type: matricsConstants.ADD_MATRIC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: matricsConstants.ADD_MATRIC_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};

export const getAllMatrics = ({ parentID }) => (dispatch) => {
  dispatch({
    type: matricsConstants.GET_MATRICS_REQUEST,
  });

  getMatrics({ parentID })
    .then((res) => {
      dispatch({
        type: matricsConstants.GET_MATRICS_SUCCESS,
        payload: res,
      });
    })
    .catch((error) => {
      dispatch({
        type: matricsConstants.GET_MATRICS_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};
