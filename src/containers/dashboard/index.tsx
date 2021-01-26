import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { getChildren } from '../../store/actions/family.actions';
import { DashboardScreen } from '../../layouts';
import { useDispatch, useSelector } from 'react-redux';

export interface ISignIn {
  email: string;
  password: string;
}

export const DashboardContainer = () => {
  const currentState = useSelector((state) => state);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const handlePress = (toScreen: string) => {
    navigate(toScreen);
  };

  let familyID: null = null;

  console.log('currentState', currentState);

  if (currentState?.auth?.user?.familyID) {
    familyID = currentState?.auth?.user?.familyID?.id;
  } else if (currentState?.family?.family?.families.length > 0) {
    familyID = currentState?.family?.family?.families[0].id;
  }

  const handleGetChild = () => {
    dispatch(getChildren({ familyID: familyID ?? 0 }));
  };

  return (
    <DashboardScreen
      onChildPress={handlePress}
      getAllChildren={handleGetChild}
      currentState={currentState}
    />
  );
};
