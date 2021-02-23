import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  getChildren,
  deleteChild,
  deleteGuardian,
} from '../../store/actions/family.actions';
import { ParentProfileScreen } from '../../layouts';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoute } from '../../navigation/app-routes';

export interface ISignIn {
  email: string;
  password: string;
}

export const ParentProfileContainer = () => {
  const currentState = useSelector((state) => state);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const handlePress = (toScreen: string) => {
    if (toScreen === AppRoute.FAMILY_SETUP) {
      navigate(toScreen, { currentPosition: 2 });
    } else {
      navigate(toScreen);
    }
  };

  let familyID: null = null;

  if (currentState?.auth?.user?.familyID) {
    familyID = currentState?.auth?.user?.familyID?.id;
  } else if (currentState?.family?.family?.families.length > 0) {
    familyID = currentState?.family?.family?.families[0].id;
  }

  const handleGetChild = () => {
    dispatch(getChildren({ familyID: familyID ?? 0 }));
  };

  const handleDeleteChild = ({ childId }: any) => {
    dispatch(deleteChild({ childId }));
  };

  const handleDeleteGuardian = ({ parentId }: any) => {
    dispatch(deleteGuardian({ parentId }));
  };

  return (
    <ParentProfileScreen
      onPress={handlePress}
      getAllChildren={handleGetChild}
      onDeleteChild={handleDeleteChild}
      onDeleteGuardian={handleDeleteGuardian}
      currentState={currentState}
    />
  );
};
