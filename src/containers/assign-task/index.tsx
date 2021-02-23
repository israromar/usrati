import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { getChildren, getMatrics } from '../../store/actions/family.actions';
import { assignTask } from '../../store/actions/sub-matric.actions';
import { AssignTaskScreen } from '../../layouts';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoute } from '../../navigation/app-routes';
import { getAllMatrics } from '../../store/actions/matric.actions';

export interface ISignIn {
  email: string;
  password: string;
}

export const AssignTaskContainer = () => {
  const currentState = useSelector((state) => state);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const handlePress = (toScreen: string) => {
    navigate(toScreen, { currentPosition: 2 });
  };

  let familyID: null = null;
  let parentID: number = 0;

  if (currentState?.auth?.user?.familyID) {
    familyID = currentState?.auth?.user?.familyID?.id;
  } else if (currentState?.family?.family?.families.length > 0) {
    familyID = currentState?.family?.family?.families[0].id;
  }

  if (currentState?.auth?.user?.parent) {
    parentID = currentState?.auth?.user?.parent[0]?.id;
  }

  const handleGetChild = () => {
    dispatch(getChildren({ familyID: familyID ?? 0 }));
  };

  const handleGetMatrics = () => {
    dispatch(getAllMatrics({ parentID }));
  };

  const handleAssignTask = ({ selectedTask, selectedChildren, rule }: any) => {
    dispatch(assignTask({ selectedTask, selectedChildren, rule }));
  };

  return (
    <AssignTaskScreen
      onPress={handlePress}
      getAllChildren={handleGetChild}
      getAllMatrics={handleGetMatrics}
      onAssignTask={handleAssignTask}
      currentState={currentState}
    />
  );
};
