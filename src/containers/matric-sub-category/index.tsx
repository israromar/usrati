/* eslint-disable no-undef */
import React from 'react';
import { MatricSubCategoryScreen } from '../../layouts';
import {
  getAllSubMatrics,
  addSubMatric,
  editSubMatric,
  deleteSubMatric,
  updateAllSubMatrics,
} from '../../store/actions/sub-matric.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export interface ISignIn {
  email: string;
  password: string;
}

export const MatricSubCategoryContainer = ({ ...rest }) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state);

  let parentID: null = null;
  if (currentState?.user?.userInfo?.data) {
    parentID = currentState?.user?.userInfo?.data?.parent[0]?.id;
  } else if (currentState?.user?.userInfo?.parent) {
    parentID = currentState?.user?.userInfo?.parent[0]?.id;
  }

  const handleAddSubMatric = ({
    matricPhoto,
    matricTitle,
    matricWeightage,
    matricDescription,
  }: any) => {
    dispatch(
      addSubMatric({
        parentCategoryID: rest?.route?.params?.matricId ?? 0,
        matricPhoto,
        matricTitle,
        matricWeightage,
        matricDescription,
      }),
    );
  };

  const handleEditSubMatric = ({
    matricId,
    matricPhoto,
    matricTitle,
    matricWeightage,
    matricDescription,
  }: any) => {
    dispatch(
      editSubMatric({
        matricId,
        parentID,
        matricPhoto,
        matricTitle,
        matricWeightage,
        matricDescription,
      }),
    );
  };

  const handleDeleteSubMatric = ({ matricId }: any) => {
    dispatch(
      deleteSubMatric({
        matricId,
      }),
    );
  };

  const handlePress = (toScreen: string) => {
    navigate(toScreen);
  };

  const handleGetSubMatrices = () => {
    dispatch(
      getAllSubMatrics({
        parentCategoryID: rest?.route?.params?.matricId ?? 0,
      }),
    );
  };

  const handleUpdateSubMatrics = (matrics: Array<{}>) => {
    dispatch(updateAllSubMatrics({ matrics }));
  };

  return (
    <MatricSubCategoryScreen
      currentState={currentState}
      onAddSubMatric={handleAddSubMatric}
      onEditSubMatric={handleEditSubMatric}
      onDeleteSubMatric={handleDeleteSubMatric}
      getAllSubMatrics={handleGetSubMatrices}
      updateSubMatrics={handleUpdateSubMatrics}
      onBackPress={handlePress}
    />
  );
};
