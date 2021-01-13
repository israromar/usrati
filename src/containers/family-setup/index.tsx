import React from 'react';
// import { useDispatch } from 'react-redux';
// import { signIn } from '../../store/actions/auth.actions';
import {
  addFamilySettings,
  addGuardian,
} from '../../store/actions/family.actions';
import { FamilySetupScreen } from '../../layouts';
import { useDispatch, useSelector } from 'react-redux';
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
    console.log({ email, username, password });
    dispatch(addGuardian({ email, username, password }));
  };

  return (
    <FamilySetupScreen
      onAddFamilySettings={handleAddFamilySettings}
      onAddGuardian={handleAddGuardian}
      currentState={currentState}
    />
  );
};
