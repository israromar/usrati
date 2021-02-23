import { childConstants } from '../../constants';
import { getChildInfo } from '../../services/api';

export const getChildData = ({ childId }: any) => (dispatch: any) => {
  dispatch({
    type: childConstants.GET_CHILD_DATA_REQUEST,
  });

  getChildInfo({ childId })
    .then((res: any) => {
      dispatch({
        type: childConstants.GET_CHILD_DATA_SUCCESS,
        payload: res?.child,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: childConstants.GET_CHILD_DATA_FAIL,
        payload: error?.ERROR
          ? error?.ERROR
          : 'Something went wrong, please try again.',
      });
    });
};
