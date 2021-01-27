/* eslint-disable no-undef */
import React from 'react';
import { MatricCategoryScreen } from '../../layouts';
import {
  getAllMatrics,
  addMatric,
  editMatric,
  updateAllMatrics,
} from '../../store/actions/matric.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export interface ISignIn {
  email: string;
  password: string;
}

export const MatricCategoryContainer = () => {
  const { navigate } = useNavigation();

  const dispatch = useDispatch();
  const currentState = useSelector((state) => state);

  console.log('currentStatecurrentState', currentState);

  let parentID: null = null;
  if (currentState?.user?.userInfo?.data) {
    parentID = currentState?.user?.userInfo?.data?.parent[0]?.id;
  } else if (currentState?.user?.userInfo?.parent) {
    parentID = currentState?.user?.userInfo?.parent[0]?.id;
  }

  const handleAddMatric = ({
    matricPhoto,
    matricTitle,
    matricWeightage,
    matricDescription,
  }: any) => {
    dispatch(
      addMatric({
        parentID,
        matricPhoto,
        matricTitle,
        matricWeightage,
        matricDescription,
      }),
    );
  };

  const handleEditMatric = ({
    matricId,
    matricPhoto,
    matricTitle,
    matricWeightage,
    matricDescription,
  }: any) => {
    dispatch(
      editMatric({
        matricId,
        parentID,
        matricPhoto,
        matricTitle,
        matricWeightage,
        matricDescription,
      }),
    );
  };

  const handlePress = (toScreen: string) => {
    navigate(toScreen);
  };

  const handleGetMatrices = () => {
    dispatch(getAllMatrics({ parentID: parentID ?? 0 }));
  };

  const handleupdateMatrics = (matrics: Array<{}>) => {
    console.log(
      '🚀 ~ file: index.tsx ~ line 58 ~ handleupdateMatrics ~ matrics',
      matrics,
    );
    dispatch(updateAllMatrics({ matrics }));
  };

  return (
    <MatricCategoryScreen
      currentState={currentState}
      onAddMatric={handleAddMatric}
      onEditMatric={handleEditMatric}
      getAllMatrics={handleGetMatrices}
      updateMatrics={handleupdateMatrics}
      onBackPress={handlePress}
    />
  );
};
