import React from 'react';
import { ImageStyle } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';

export const EyeIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="eye" />
);

export const EyeOffIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="eye-off" />
);

export const PersonIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="person" />
);

export const AtIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="at-outline" />
);

export const CameraIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="camera-outline" />
);

export const GalleryIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="image-outline" />
);

export const PencilIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="edit-outline" />
);

export const DeleteIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="trash-2-outline" />
);
