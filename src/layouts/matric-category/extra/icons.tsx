import React from 'react';
import { ImageStyle } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { colors } from '../../../styles';

export const AddIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="plus-outline" />
);

export const PlusIcon = () => (
  <AntIcon name="pluscircleo" size={30} color={colors.primaryBlue} />
);
export const MinusIcon = () => (
  <AntIcon name="minuscircleo" size={30} color={colors.primaryBlue} />
);
