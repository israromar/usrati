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
  familyName: string;
  familyPhoto: null;
  flag: string;
}
export interface IAddGuardian {
  photo: null;
  email: string;
  username: string;
  password: string;
}
export interface IAddChild {
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
    familyName,
    familyPhoto,
    flag,
  }: IAddFamilySetup) => {
    dispatch(addFamilySettings({ familyName, familyPhoto, flag }));
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
