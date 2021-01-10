import React from 'react';
import { ImageProps } from 'react-native';
import { Icon } from '@ui-kitten/components';

import i18n from '../translations';
import {
  HomeScreen,
  CalendarScreen,
  GridsScreen,
  PagesScreen,
} from '../containers';

const HomeIcon = (props: ImageProps) => (
  <Icon {...props} appearance="ghost" name="home-outline" />
);

const CalenderIcon = (props: ImageProps) => (
  <Icon {...props} name="calendar-outline" />
);
const GridIcon = (props: ImageProps) => <Icon {...props} name="grid-outline" />;
const PagesIcon = (props: ImageProps) => (
  <Icon {...props} name="list-outline" />
);

const tabNavigationData = [
  {
    id: 1,
    name: i18n.t('navigation.home'),
    component: HomeScreen,
    icon: HomeIcon,
  },
  {
    id: 2,
    name: i18n.t('navigation.calender'),
    component: CalendarScreen,
    icon: CalenderIcon,
  },
  {
    id: 3,
    name: i18n.t('navigation.grids'),
    component: GridsScreen,
    icon: GridIcon,
  },
  {
    id: 4,
    name: i18n.t('navigation.pages'),
    component: PagesScreen,
    icon: PagesIcon,
  },
];

export default tabNavigationData;
