import { matricsConstants } from '../../constants';

const initialState = {
  matrics: [],
  isAddingMatric: false,
  isAddMatricSuccess: false,
  isAddMatricFail: false,
  isGetMatricsLoading: false,
  isGetMatricsSuccess: false,
  isGetMatricsFail: false,
  isUpdatingMatrics: false,
  isUpdateMatricsSuccess: false,
  isUpdateMatricsFail: false,
  addMatricError: '',
  getMatricsError: '',
  updateMatricsError: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case matricsConstants.ADD_MATRIC_REQUEST: {
      return {
        ...state,
        matrics: [...state.matrics],
        isAddingMatric: true,
        isAddMatricSuccess: false,
        isAddMatricFail: false,
        addMatricError: '',
      };
    }
    case matricsConstants.ADD_MATRIC_SUCCESS: {
      return {
        ...state,
        matrics: [...state.matrics, ...payload],
        isAddingMatric: false,
        isAddMatricSuccess: true,
        isAddMatricFail: false,
        addMatricError: '',
      };
    }
    case matricsConstants.ADD_MATRIC_FAIL: {
      return {
        ...state,
        matrics: [...state.matrics],
        isAddingMatric: false,
        isAddMatricSuccess: false,
        isAddMatricFail: true,
        addMatricError: payload,
      };
    }
    case matricsConstants.GET_MATRICS_REQUEST: {
      return {
        ...state,
        // matrics: [...state.matrics],
        isGetMatricsLoading: true,
        isGetMatricsSuccess: false,
        isGetMatricsFail: false,
        getMatricsError: '',
      };
    }
    case matricsConstants.GET_MATRICS_SUCCESS: {
      return {
        ...state,
        matrics: [...payload],
        isGetMatricsLoading: false,
        isGetMatricsSuccess: true,
        isGetMatricsFail: false,
        getMatricsError: '',
      };
    }
    case matricsConstants.GET_MATRICS_FAIL: {
      return {
        ...state,
        matrics: [...state.matrics],
        isGetMatricsLoading: false,
        isGetMatricsSuccess: false,
        isGetMatricsFail: true,
        getMatricsError: payload,
      };
    }
    case matricsConstants.UPDATE_MATRICS_REQUEST: {
      return {
        ...state,
        // matrics: [...state.matrics],
        isUpdatingMatrics: true,
        isUpdateMatricsFail: false,
        isUpdateMatricsSuccess: false,
        updateMatricsError: '',
      };
    }
    case matricsConstants.UPDATE_MATRICS_SUCCESS: {
      return {
        ...state,
        // matrics: [...payload],
        isUpdatingMatrics: false,
        isUpdateMatricsSuccess: true,
        isUpdateMatricsFail: false,
        updateMatricsError: '',
      };
    }
    case matricsConstants.UPDATE_MATRICS_FAIL: {
      return {
        ...state,
        matrics: [...state.matrics],
        isUpdatingMatrics: false,
        isUpdateMatricsSuccess: false,
        isUpdateMatricsFail: true,
        updateMatricsError: '',
      };
    }

    default:
      return state;
  }
}
