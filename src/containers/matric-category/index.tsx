/* eslint-disable no-undef */
import React from 'react';
import { MatricCategoryScreen } from '../../layouts';
import { getAllMatrics, addMatric } from '../../store/actions/matric.actions';
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

  const handleAddMatric = ({
    matricPhoto,
    matricTitle,
    matricWeightage,
    matricDescription,
  }: any) => {
    dispatch(
      addMatric({
        parentID: currentState?.auth?.user?.parent[0]?.id,
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
    dispatch(
      getAllMatrics({ parentID: currentState?.auth?.user?.parent[0].id }),
    );
  };

  return (
    <MatricCategoryScreen
      currentState={currentState}
      onAddMatric={handleAddMatric}
      getAllMatrics={handleGetMatrices}
      onBackPress={handlePress}
    />
  );
};
