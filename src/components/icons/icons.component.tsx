/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { colors } from '../../styles';

export const ArrowForward = () => {
  return (
    <AntIcon
      style={{ marginRight: 15 }}
      name="arrowright"
      size={25}
      color={colors.primaryBlue}
    />
  );
};

export const ArrowDown = () => {
  return (
    <AntIcon
      style={{ marginRight: 15 }}
      name="down"
      size={25}
      color={colors.primaryBlue}
    />
  );
};

export const ArrowUp = () => {
  return (
    <AntIcon
      style={{ marginRight: 15 }}
      name="up"
      size={25}
      color={colors.primaryBlue}
    />
  );
};

export const PencilIcon = () => (
  <AntIcon name="edit" size={15} color={colors.primaryBlue} />
);

export const DeleteIcon = () => (
  <AntIcon name="delete" size={15} color={colors.primaryBlue} />
);

export const UpIcon = () => (
  <AntIcon name="up" size={20} color={colors.primaryBlue} />
);

export const AddIcon = () => (
  <AntIcon name="plus" size={50} color={colors.primaryBlue} />
);
