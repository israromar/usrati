import React, { useEffect, useState } from 'react';
import {
  addFamilySettings,
  addGuardian,
  addChild,
  updateChild,
} from '../../store/actions/family.actions';
import { FamilySetupScreen } from '../../layouts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
export interface IAddFamilySetup {
  id: number;
  familyName: string;
  familyPhoto: null;
  isFamilyPhotoDeleted: boolean;
  flag: string;
}
export interface IAddGuardian {
  id: number;
  photo: null;
  email: string;
  username: string;
  password: string;
  flag: string;
  isGuardianPhotoDeleted: boolean;
}
export interface IAddChild {
  id: number;
  photo: null;
  childName: string;
  dob: Date;
  schoolName: string;
  interest: string;
  username: string;
  password: string;
}

export const FamilySetupContainer = ({ ...rest }) => {
  console.log(
    '🚀 ~ file: index.tsx ~ line 31 ~ FamilySetupContainer ~ props',
    rest,
  );
  const { navigate, goBack } = useNavigation();
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state);
  const [currentPosition, setCurrentPosition] = useState(0);
  // let currentPosition = 0;
  // if (rest?.route?.params) {
  //   currentPosition = rest?.route?.params?.currentPosition;
  // }
  useEffect(() => {
    if (currentPosition !== rest?.route?.params?.currentPosition) {
      setCurrentPosition(rest?.route?.params?.currentPosition);
    }
  }, [rest]);

  const handleAddFamilySettings = ({
    id,
    familyName,
    familyPhoto,
    isFamilyPhotoDeleted,
    flag,
  }: IAddFamilySetup) => {
    dispatch(
      addFamilySettings({
        id,
        familyName,
        familyPhoto,
        isFamilyPhotoDeleted,
        flag,
      }),
    );
  };

  const handleAddGuardian = ({
    id,
    photo,
    email,
    username,
    password,
    isGuardianPhotoDeleted,
    flag,
  }: IAddGuardian) => {
    console.log(
      '123123123123123',
      id,
      photo,
      email,
      username,
      password,
      isGuardianPhotoDeleted,
      flag,
    );
    dispatch(
      addGuardian({
        id,
        photo,
        email,
        username,
        password,
        isGuardianPhotoDeleted,
        flag,
      }),
    );
  };

  const handleAddChild = ({
    photo,
    childName,
    dob,
    schoolName,
    interest,
    username,
    password,
  }: IAddChild) => {
    dispatch(
      addChild({
        photo,
        childName,
        dob,
        schoolName,
        interest,
        username,
        password,
      }),
    );
  };

  const handleUpdateChild = ({
    id,
    photo,
    childName,
    dob,
    schoolName,
    interest,
    username,
    password,
  }: IAddChild) => {
    dispatch(
      updateChild({
        id,
        photo,
        childName,
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

  const handleGoBack = (): void => {
    goBack();
  };

  console.log('08023480234', currentPosition);

  return (
    <FamilySetupScreen
      onAddFamilySettings={handleAddFamilySettings}
      onAddGuardian={handleAddGuardian}
      // onUpdateGuardian={handleUpdateGuardian}
      onAddChild={handleAddChild}
      onUpdateChild={handleUpdateChild}
      onSkipNow={handleSkipNow}
      onSubmit={handleSubmit}
      onGoBack={handleGoBack}
      currentState={currentState}
      currentPosition={currentPosition}
      rest={rest}
    />
  );
};
