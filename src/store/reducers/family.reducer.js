import { familySettingsConstants } from '../../constants';

const initialState = {
  families: [],
  isAddFamilySuccess: false,
  isAddFamilyFail: false,
  addFamilyError: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case familySettingsConstants.ADD_FAMILY_SETTINGS_REQUEST: {
      return {
        ...state,
        isAddFamilySuccess: false,
        isAddFamilyFail: false,
        addFamilyError: '',
      };
    }
    case familySettingsConstants.ADD_FAMILY_SETTINGS_SUCCESS: {
      return {
        ...state,
        families: [...state.families, payload],
        isAddFamilySuccess: true,
      };
    }
    case familySettingsConstants.ADD_FAMILY_SETTINGS_FAIL: {
      return {
        ...state,
        isAddFamilySuccess: false,
        isAddFamilyFail: false,
        AddFamilyError: payload,
      };
    }
    default:
      return state;
  }
}
