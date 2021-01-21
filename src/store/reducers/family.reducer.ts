import { familySettingsConstants } from '../../constants';

const initialState = {
  family: {
    families: [],
    isAddingFamily: false,
    isAddFamilySuccess: false,
    isAddFamilyFail: false,
    addFamilyError: '',
  },
  guardian: {
    guardians: [],
    isAddingGuardian: false,
    isAddGuardianSuccess: false,
    isAddGuardianFail: false,
    addGuardianError: '',
  },
  child: {
    children: [],
    isAddingChild: false,
    isAddChildSuccess: false,
    isAddChildFail: false,
    addChildError: '',
    getChildrenError: '',
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(
    '🚀 ~ file: family.reducer.js ~ line 29 ~ type, payload ',
    type,
    payload,
  );
  switch (type) {
    case familySettingsConstants.ADD_FAMILY_SETTINGS_REQUEST: {
      return {
        ...state,
        family: {
          families: [...state.family.families],
          isAddingFamily: true,
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
          isAddingFamily: false,
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
          isAddingFamily: false,
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
          isAddingGuardian: true,
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
          isAddingGuardian: false,
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
          isAddingGuardian: false,
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
          isAddingChild: true,
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
          isAddingChild: false,
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
          isAddingChild: false,
          isAddChildSuccess: false,
          isAddChildFail: true,
          addChildError: payload,
        },
      };
    }
    case familySettingsConstants.GET_CHILDREN_REQUEST: {
      return {
        ...state,
      };
    }
    case familySettingsConstants.GET_CHILDREN_SUCCESS: {
      return {
        ...state,
        child: {
          children: [...payload.children],
        },
        guardian: {
          guardians: [...payload.parents],
        },
      };
    }
    case familySettingsConstants.GET_CHILDREN_FAIL: {
      return {
        ...state,
        child: {
          children: [...state.child.children],
          getChildrenError: payload,
        },
      };
    }
    default:
      return state;
  }
}
