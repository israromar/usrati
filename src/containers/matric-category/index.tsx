/* eslint-disable no-undef */
import React from 'react';
import { MatricCategoryScreen } from '../../layouts';
import {
  getAllMatrics,
  addMatric,
  editMatric,
  deleteMatric,
  updateAllMatrics,
} from '../../store/actions/matric.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AppRoute } from '../../navigation/app-routes';

export interface ISignIn {
  email: string;
  password: string;
}

export const MatricCategoryContainer = () => {
  const { navigate } = useNavigation();

  const dispatch = useDispatch();
  const currentState = useSelector((state) => state);

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

  const handleDeleteMatric = ({ matricId }: any) => {
    dispatch(
      deleteMatric({
        matricId,
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
    dispatch(updateAllMatrics({ matrics }));
  };

  const handleMatricPress = (matricId: number) => {
    // dispatch(getAllSubMatrics({ matricId }));
    navigate(AppRoute.MATRIC_SUB_CATEGORY, { matricId });
  };

  return (
    <MatricCategoryScreen
      currentState={currentState}
      onAddMatric={handleAddMatric}
      onEditMatric={handleEditMatric}
      onDeleteMatric={handleDeleteMatric}
      getAllMatrics={handleGetMatrices}
      updateMatrics={handleupdateMatrics}
      onMatricPress={handleMatricPress}
      onBackPress={handlePress}
    />
  );
};
