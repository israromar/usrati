import React from 'react';
// import { useDispatch } from 'react-redux';
// import { signIn } from '../../store/actions/auth.actions';
import { addFamilySettings } from '../../store/actions/family.actions';
import { FamilySetupScreen } from '../../layouts';
import { useDispatch } from 'react-redux';
export interface IFamilySetup {
  familyId: string;
  familyName: string;
  familyPhoto: string;
}
export const FamilySetupContainer = () => {
  const dispatch = useDispatch();

  const handleAddFamilySettings = ({
    familyId,
    familyName,
    familyPhoto,
  }: IFamilySetup) => {
    dispatch(addFamilySettings({ familyId, familyName, familyPhoto }));
  };

  return <FamilySetupScreen onAddFamilySettings={handleAddFamilySettings} />;
};
