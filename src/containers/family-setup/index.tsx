import React from 'react';
// import { useDispatch } from 'react-redux';
// import { signIn } from '../../store/actions/auth.actions';
import {
  addFamilySettings,
  addGuardian,
} from '../../store/actions/family.actions';
import { FamilySetupScreen } from '../../layouts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
export interface IFamilySetup {
  familyId: string;
  familyName: string;
  familyPhoto: string;
}
export interface IGuardian {
  email: string;
  username: string;
  password: string;
}
export const FamilySetupContainer = () => {
  const { navigate } = useNavigation();

  const dispatch = useDispatch();
  const currentState = useSelector((state) => state);

  const handleAddFamilySettings = ({
    familyId,
    familyName,
    familyPhoto,
  }: IFamilySetup) => {
    dispatch(addFamilySettings({ familyId, familyName, familyPhoto }));
  };

  const handleAddGuardian = ({ email, username, password }: IGuardian) => {
    dispatch(addGuardian({ email, username, password }));
  };

  const handleSkipNow = (navigateTo: string): void => {
    navigate(navigateTo);
  };

  return (
    <FamilySetupScreen
      onAddFamilySettings={handleAddFamilySettings}
      onAddGuardian={handleAddGuardian}
      onSkipNow={handleSkipNow}
      currentState={currentState}
    />
  );
};
