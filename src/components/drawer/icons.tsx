import React from 'react';
import { ImageStyle, ImageProps } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';

export const EyeIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="eye" />
);
export const EyeOffIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="eye-off" />
);
export const PersonIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="person-outline" />
);
export const ListsIcon = (props: any): React.ReactElement<ImageProps> => (
  <Icon {...props} name="list-outline" />
);
export const TopicsIcon = (props: any): React.ReactElement<ImageProps> => (
  <Icon {...props} name="message-circle-outline" />
);
export const BookmarksIcon = (props: any): React.ReactElement<ImageProps> => (
  <Icon {...props} name="bookmark-outline" />
);
export const MomentsIcon = (props: any): React.ReactElement<ImageProps> => (
  <Icon {...props} name="flash-outline" />
);
export const ForwardIcon = (props: any): React.ReactElement<ImageProps> => (
  <Icon {...props} name="arrow-ios-forward" />
);
export const ChevronDownIcon = (props: any): React.ReactElement<ImageProps> => (
  <Icon {...props} name="arrow-ios-downward-outline" />
);
export const ChevronUpIcon = (props: any): React.ReactElement<ImageProps> => (
  <Icon {...props} name="arrow-ios-upward-outline" />
);
export const BulbIcon = (props: any): React.ReactElement<ImageProps> => (
  <Icon {...props} name="bulb-outline" />
);
export const QrIcon = (props: any): React.ReactElement<ImageProps> => (
  <Icon {...props} name="grid-outline" />
);

export const SignOutIcon = (props: any): React.ReactElement<ImageProps> => (
  <Icon {...props} name="log-out-outline" />
);
