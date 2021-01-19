import React from 'react';
import {
  addFamilySettings,
  addGuardian,
  addChild,
} from '../../store/actions/family.actions';
import { FamilySetupScreen } from '../../layouts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
export interface IAddFamilySetup {
  familyName: string;
  familyPhoto: string;
}
export interface IAddGuardian {
  photo: null;
  email: string;
  username: string;
  password: string;
}

export interface IAddChild {
  photo: null;
  name: string;
  dob: Date;
  schoolName: string;
  interest: string;
  username: string;
  password: string;
}

export const FamilySetupContainer = () => {
  const { navigate } = useNavigation();

  const dispatch = useDispatch();
  const currentState = useSelector((state) => state);

  const handleAddFamilySettings = ({
    familyName,
    familyPhoto,
  }: IAddFamilySetup) => {
    dispatch(addFamilySettings({ familyName, familyPhoto }));
  };

  const handleAddGuardian = ({
    photo,
    email,
    username,
    password,
  }: IAddGuardian) => {
    dispatch(addGuardian({ photo, email, username, password }));
  };

  const handleAddChild = ({
    photo,
    name,
    dob,
    schoolName,
    interest,
    username,
    password,
  }: IAddChild) => {
    dispatch(
      addChild({
        photo,
        name,
        dob,
        schoolName,
        interest,
        username,
        password,
      }),
    );
  };

  const handleSkipNow = (navigateTo: string): void => {
    navigate(navigateTo);
  };

  const handleSubmit = (navigateTo: string): void => {
    navigate(navigateTo);
  };

  return (
    <FamilySetupScreen
      onAddFamilySettings={handleAddFamilySettings}
      onAddGuardian={handleAddGuardian}
      onAddChild={handleAddChild}
      onSkipNow={handleSkipNow}
      onSubmit={handleSubmit}
      currentState={currentState}
    />
  );
};
