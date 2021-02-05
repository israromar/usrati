import object from 'react-native-ui-lib/generatedTypes/style/colorName';
import { familySettingsConstants } from '../../constants';

const initialState = {
  family: {
    families: [],
    isAddingFamily: false,
    isAddFamilySuccess: false,
    isAddFamilyFail: false,
    addFamilyError: '',

    isUpdatingFamily: false,
    isUpdateFamilySuccess: false,
    isUpdateFamilyFail: false,
    updateFamilyError: '',
  },
  guardian: {
    guardians: [],
    isAddingGuardian: false,
    isAddGuardianSuccess: false,
    isAddGuardianFail: false,
    addGuardianError: '',

    isUpdatingGuardian: false,
    isUpdateGuardianSuccess: false,
    isUpdateGuardianFail: false,
    updateGuardianError: '',

    isDeletingGuardian: false,
    isDeleteGuardianSuccess: false,
    isDeleteGuardianFail: false,
    deleteGuardianError: '',
  },
  child: {
    children: [],
    isAddingChild: false,
    isAddChildSuccess: false,
    isAddChildFail: false,

    isUpdatingChild: false,
    isUpdateChildSuccess: false,
    isUpdateChildFail: false,

    isDeletingChild: false,
    isDeleteChildSuccess: false,
    isDeleteChildFail: false,

    addChildError: '',
    getChildrenError: '',
    updateChildError: '',
    deleteChildError: '',
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
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
    case familySettingsConstants.UPDATE_FAMILY_SETTINGS_REQUEST: {
      return {
        ...state,
        family: {
          families: [...state.family.families],
          isUpdatingFamily: true,
          isUpdateFamilySuccess: false,
          isUpdateFamilyFail: false,
          updateFamilyError: '',
        },
      };
    }
    case familySettingsConstants.UPDATE_FAMILY_SETTINGS_SUCCESS: {
      return {
        ...state,
        family: {
          families: [payload[0]],
          isUpdatingFamily: false,
          isUpdateFamilySuccess: true,
          isUpdateFamilyFail: false,
          updateFamilyError: '',
        },
      };
    }
    case familySettingsConstants.UPDATE_FAMILY_SETTINGS_FAIL: {
      return {
        ...state,
        family: {
          families: [...state.family.families],
          isUpdatingFamily: false,
          isUpdateFamilySuccess: false,
          isUpdateFamilyFail: true,
          updateFamilyError: payload,
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

    case familySettingsConstants.UPDATE_CHILD_REQUEST: {
      return {
        ...state,
        child: {
          children: [...state.child.children],
          isUpdatingChild: true,
          isUpdateChildSuccess: false,
          isUpdateChildFail: false,
          updateChildError: '',
        },
      };
    }
    case familySettingsConstants.UPDATE_CHILD_SUCCESS: {
      console.log('1239412809813049823', state.child.children, payload);
      let index = state.child.children.findIndex(
        (a: { id: number }) => a.id === payload.parentId,
      );

      return {
        ...state,
        child: {
          children: [...state.child.children.splice(index, 1, payload)],
          isUpdatingChild: false,
          isUpdateChildSuccess: true,
          isUpdateChildFail: false,
          updateChildError: '',
        },
      };
    }
    case familySettingsConstants.UPDATE_CHILD_FAIL: {
      return {
        ...state,
        child: {
          children: [...state.child.children],
          isUpdatingChild: false,
          isUpdateChildSuccess: false,
          isUpdateChildFail: true,
          updateChildError: payload,
        },
      };
    }

    case familySettingsConstants.DELETE_CHILD_REQUEST: {
      return {
        ...state,
        child: {
          children: [...state.child.children],
          isAddingChild: false,
          isAddChildSuccess: false,
          isAddChildFail: false,
          addChildError: '',
          isDeletingChild: true,
          isDeleteChildSuccess: false,
          isDeleteChildFail: false,
          deleteChildError: '',
        },
      };
    }
    case familySettingsConstants.DELETE_CHILD_SUCCESS: {
      console.log('1239412809813049823', state.child.children, payload);

      return {
        ...state,
        child: {
          children: [
            ...state.child.children.filter((a) => a?.id !== payload.childId),
          ],
          isAddingChild: false,
          isAddChildSuccess: false,
          isAddChildFail: false,
          addChildError: '',
          isDeletingChild: false,
          isDeleteChildSuccess: true,
          isDeleteChildFail: false,
          deleteChildError: '',
        },
      };
    }
    case familySettingsConstants.DELETE_CHILD_FAIL: {
      return {
        ...state,
        child: {
          children: [...state.child.children],
          isAddingChild: false,
          isAddChildSuccess: false,
          isAddChildFail: false,
          addChildError: '',
          isDeletingChild: false,
          isDeleteChildSuccess: false,
          isDeleteChildFail: true,
          deleteChildError: payload,
        },
      };
    }

    //Update Delete Guardian

    case familySettingsConstants.UPDATE_GUARDIAN_REQUEST: {
      return {
        ...state,
        guardian: {
          guardians: [...state.guardian.guardians],
          isUpdatingGuardian: true,
          isUpdateGuardianSuccess: false,
          isUpdateGuardianFail: false,
          updateGuardianError: '',
        },
      };
    }
    case familySettingsConstants.UPDATE_GUARDIAN_SUCCESS: {
      console.log(
        'payloadpayloadpayload',
        // index,
        state.guardian.guardians,
        payload,
      );

      let index = state.guardian.guardians.findIndex(
        (a: { id: number }) => a.id === payload?.data?.id,
      );

      state.guardian.guardians.splice(index, 1, payload.data);

      return {
        ...state,
        guardian: {
          guardians: [...state.guardian.guardians],
          isUpdatingGuardian: false,
          isUpdateGuardianSuccess: true,
          isUpdateGuardianFail: false,
          updateGuardianError: '',
        },
      };
    }
    case familySettingsConstants.UPDATE_GUARDIAN_FAIL: {
      return {
        ...state,
        guardian: {
          guardians: [...state.guardian.guardians],
          isUpdatingGuardian: false,
          isUpdateGuardianSuccess: false,
          isUpdateGuardianFail: true,
          updateGuardianError: payload,
        },
      };
    }

    case familySettingsConstants.DELETE_GUARDIAN_REQUEST: {
      return {
        ...state,
        guardian: {
          guardians: [...state.guardian.guardians],
          isDeletingGuardian: true,
          iDeleteGuardianSuccess: false,
          isDeleteGuardianFail: false,
          deleteGuardianError: payload,
        },
      };
    }
    case familySettingsConstants.DELETE_GUARDIAN_SUCCESS: {
      return {
        ...state,
        guardian: {
          guardians: [
            ...state.guardian.guardians.filter(
              (a) => a?.id !== payload.parentId,
            ),
          ],
          isDeletingGuardian: false,
          iDeleteGuardianSuccess: true,
          isDeleteGuardianFail: false,
          deleteGuardianError: '',
        },
      };
    }
    case familySettingsConstants.DELETE_GUARDIAN_FAIL: {
      return {
        ...state,
        guardian: {
          guardians: [...state.guardian.guardians],
          isDeletingGuardian: false,
          iDeleteGuardianSuccess: false,
          isDeleteGuardianFail: true,
          deleteGuardianError: payload,
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
