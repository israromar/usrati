import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { getChildData } from '../../store/actions/child.actions';
import { ChildDashboardScreen } from '../../layouts';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoute } from '../../navigation/app-routes';

export interface ISignIn {
  email: string;
  password: string;
}

export const ChildDashboardContainer = () => {
  const currentState = useSelector((state) => state);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const handlePress = (toScreen: string) => {
    navigate(toScreen, { currentPosition: 2 });
  };

  let childId: null = null;

  console.log('ChildDashboardScreen currentState', currentState);

  if (currentState?.auth?.user?.child) {
    childId = currentState?.auth?.user?.child[0]?.id;
  } else if (currentState?.user?.userInfo?.child[0]) {
    childId = currentState?.user?.userInfo?.child[0].id;
  }

  const handleGetChild = () => {
    dispatch(getChildData({ childId: childId ?? 0 }));
  };

  return (
    <ChildDashboardScreen
      onPress={handlePress}
      getChild={handleGetChild}
      currentState={currentState}
    />
  );
};
