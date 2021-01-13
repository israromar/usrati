import { familySettingsConstants } from '../../constants';

const initialState = {
  family: {
    families: [],
    isAddFamilySuccess: false,
    isAddFamilyFail: false,
    addFamilyError: '',
  },
  guardian: {
    guardians: [],
    isAddGuardianSuccess: false,
    isAddGuardianFail: false,
    addGuardianError: '',
  },
  child: {
    children: [],
    isAddChildSuccess: false,
    isAddChildFail: false,
    addChildError: '',
  },
};

export default function (state = initialState, action) {
  // console.log('🚀 ~ file: family.reducer.js ~ line 25 ~ state', state, action);
  const { type, payload } = action;
  switch (type) {
    case familySettingsConstants.ADD_FAMILY_SETTINGS_REQUEST: {
      console.log(
        '🚀 ~ file: family.reducer.js ~ line 25 ~ state',
        state.family,
        action,
      );
      return {
        ...state,
        family: {
          families: [...state.family.families],
          isAddFamilySuccess: false,
          isAddFamilyFail: false,
          addFamilyError: '',
        },
      };
    }
    case familySettingsConstants.ADD_FAMILY_SETTINGS_SUCCESS: {
      return {
        ...state,
        family: {
          families: [...state.family.families, payload],
          isAddFamilySuccess: true,
          isAddFamilyFail: false,
          addFamilyError: '',
        },
      };
    }
    case familySettingsConstants.ADD_FAMILY_SETTINGS_FAIL: {
      return {
        ...state,
        family: {
          families: [...state.family.families],
          isAddFamilySuccess: false,
          isAddFamilyFail: true,
          addFamilyError: payload,
        },
      };
    }
    case familySettingsConstants.ADD_GUARDIAN_REQUEST: {
      return {
        ...state,
        guardian: {
          guardians: [...state.guardian.guardians],
          isAddGuardianSuccess: false,
          isAddGuardianFail: false,
          addGuardianError: '',
        },
      };
    }
    case familySettingsConstants.ADD_GUARDIAN_SUCCESS: {
      return {
        ...state,
        guardian: {
          guardians: [...state.guardian.guardians, payload],
          isAddGuardianSuccess: true,
          isAddGuardianFail: false,
          addGuardianError: '',
        },
      };
    }
    case familySettingsConstants.ADD_GUARDIAN_FAIL: {
      return {
        ...state,
        guardian: {
          guardians: [...state.guardian.guardians],
          isAddGuardianSuccess: false,
          isAddGuardianFail: true,
          addGuardianError: payload,
        },
      };
    }
    case familySettingsConstants.ADD_CHILD_REQUEST: {
      return {
        ...state,
        child: {
          children: [...state.child.children],
          isAddChildSuccess: false,
          isAddChildFail: false,
          addChildError: '',
        },
      };
    }
    case familySettingsConstants.ADD_CHILD_SUCCESS: {
      return {
        ...state,
        child: {
          children: [...state.child.children, payload],
          isAddChildSuccess: true,
          isAddChildFail: false,
          addChildError: '',
        },
      };
    }
    case familySettingsConstants.ADD_CHILD_FAIL: {
      return {
        ...state,
        child: {
          children: [...state.child.children],
          isAddChildSuccess: false,
          isAddChildFail: true,
          addChildError: payload,
        },
      };
    }
    default:
      return state;
  }
}
