import { subMatricsConstants } from '../../constants';

const initialState = {
  subMatrics: [],
  isAddingSubMatric: false,
  isAddMatricSubSuccess: false,
  isAddMatricSubFail: false,
  isEditingSubMatric: false,
  isEditingSubMatricSuccess: false,
  isEditingSubMatricFail: false,
  isGetSubMatricsLoading: false,
  isGetSubMatricsSuccess: false,
  isGetSubMatricsFail: false,
  isUpdatingSubMatrics: false,
  isUpdateSubMatricsSuccess: false,
  isUpdateSubMatricsFail: false,
  isDeletingSubMatric: false,
  isDeletingSubMatricSuccess: false,
  isDeletingSubMatricFail: false,
  addSubMatricError: '',
  editSubMatricError: '',
  getSubMatricsError: '',
  updateSubMatricsError: '',
  deleteSubMatricError: '',
  assignTaskStatus: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case subMatricsConstants.ADD_SUB_MATRIC_REQUEST: {
      return {
        ...state,
        subMatrics: [...state.subMatrics],
        isAddingSubMatric: true,
        isAddSubMatricSuccess: false,
        isAddSubMatricFail: false,
        addSubMatricError: '',
      };
    }
    case subMatricsConstants.ADD_SUB_MATRIC_SUCCESS: {
      return {
        ...state,
        subMatrics: [...payload],
        isAddingSubMatric: false,
        isAddSubMatricSuccess: true,
        isAddSubMatricFail: false,
        addSubMatricError: '',
      };
    }
    case subMatricsConstants.ADD_SUB_MATRIC_FAIL: {
      return {
        ...state,
        subMatrics: [...state.subMatrics],
        isAddingSubMatric: false,
        isAddSubMatricSuccess: false,
        isAddSubMatricFail: true,
        addSubMatricError: payload,
      };
    }
    case subMatricsConstants.EDIT_SUB_MATRIC_REQUEST: {
      return {
        ...state,
        subMatrics: [...state.subMatrics],
        isEditingSubMatric: true,
        isEditingSubMatricSuccess: false,
        isEditingSubMatricFail: false,
        editSubMatricError: '',
      };
    }
    case subMatricsConstants.EDIT_SUB_MATRIC_SUCCESS: {
      return {
        ...state,
        // subMatrics: [...state.subMatrics, ...state.subMatrics[index][payload]],
        isEditingSubMatric: false,
        isEditingSubMatricSuccess: true,
        isEditingSubMatricFail: false,
        editSubMatricError: '',
      };
    }
    case subMatricsConstants.EDIT_SUB_MATRIC_FAIL: {
      return {
        ...state,
        subMatrics: [...state.subMatrics],
        isEditingSubMatric: false,
        isEditingSubMatricSuccess: false,
        isEditingSubMatricFail: true,
        editSubMatricError: payload,
      };
    }
    case subMatricsConstants.DELETE_SUB_MATRIC_REQUEST: {
      return {
        ...state,
        subMatrics: [...state.subMatrics],
        isDeletingSubMatric: true,
        isDeletingSubMatricSuccess: false,
        isDeletingSubMatricFail: false,
        deleteSubMatricError: '',
      };
    }
    case subMatricsConstants.DELETE_SUB_MATRIC_SUCCESS: {
      // let;
      return {
        ...state,
        subMatrics: [
          ...state.subMatrics.filter((m) => m?.id !== payload?.data.id),
        ],
        isDeletingSubMatric: false,
        isDeletingSubMatricSuccess: true,
        isDeletingSubMatricFail: false,
        deleteSubMatricError: '',
      };
    }
    case subMatricsConstants.DELETE_SUB_MATRIC_FAIL: {
      return {
        ...state,
        subMatrics: [...state.subMatrics],
        isDeletingSubMatric: false,
        isDeletingSubMatricSuccess: false,
        isDeletingSubMatricFail: true,
        deleteSubMatricError: payload,
      };
    }
    case subMatricsConstants.GET_SUB_MATRICS_REQUEST: {
      return {
        ...state,
        subMatrics: [],
        isGetSubMatricsLoading: true,
        isGetSubMatricsSuccess: false,
        isGetSubMatricsFail: false,
        getSubMatricsError: '',
      };
    }
    case subMatricsConstants.GET_SUB_MATRICS_SUCCESS: {
      return {
        ...state,
        subMatrics: [...payload],
        isGetSubMatricsLoading: false,
        isGetSubMatricsSuccess: true,
        isGetSubMatricsFail: false,
        getSubMatricsError: '',
      };
    }
    case subMatricsConstants.GET_SUB_MATRICS_FAIL: {
      return {
        ...state,
        subMatrics: [...state.subMatrics],
        isGetSubMatricsLoading: false,
        isGetSubMatricsSuccess: false,
        isGetSubMatricsFail: true,
        getSubMatricsError: payload,
      };
    }
    case subMatricsConstants.UPDATE_SUB_MATRICS_REQUEST: {
      return {
        ...state,
        // subMatrics: [...state.subMatrics],
        isUpdatingSubMatrics: true,
        isUpdateSubMatricsFail: false,
        isUpdateSubMatricsSuccess: false,
        updateSubMatricsError: '',
      };
    }
    case subMatricsConstants.UPDATE_SUB_MATRICS_SUCCESS: {
      return {
        ...state,
        // subMatrics: [...payload],
        isUpdatingSubMatrics: false,
        isUpdateSubMatricsSuccess: true,
        isUpdateSubMatricsFail: false,
        updateSubMatricsError: '',
      };
    }
    case subMatricsConstants.UPDATE_SUB_MATRICS_FAIL: {
      return {
        ...state,
        subMatrics: [...state.subMatrics],
        isUpdatingSubMatrics: false,
        isUpdateSubMatricsSuccess: false,
        isUpdateSubMatricsFail: true,
        updateSubMatricsError: '',
      };
    }

    case subMatricsConstants.ASSIGN_TASK_REQUEST: {
      return {
        ...state,
        assignTaskStatus: subMatricsConstants.ASSIGN_TASK_REQUEST,
      };
    }
    case subMatricsConstants.ASSIGN_TASK_SUCCESS: {
      return {
        ...state,
        assignTaskStatus: subMatricsConstants.ASSIGN_TASK_SUCCESS,
      };
    }
    case subMatricsConstants.ASSIGN_TASK_FAIL: {
      return {
        ...state,
        assignTaskStatus: subMatricsConstants.ASSIGN_TASK_FAIL,
      };
    }

    default:
      return state;
  }
}
