import React from 'react';
import { Icon } from '@ui-kitten/components';

import HomeScreen from '../containers/home';
import CalendarScreen from '../containers/calender';
import GridsScreen from '../containers/grid';
import PagesScreen from '../containers/page';

const HomeIcon = (props) => {
  return <Icon {...props} appearance="ghost" name="home-outline" />;
};

const CalenderIcon = (props) => <Icon {...props} name="calendar-outline" />;
const GridIcon = (props) => <Icon {...props} name="grid-outline" />;
const PagesIcon = (props) => <Icon {...props} name="list-outline" />;

const tabNavigationData = [
  {
    id: 1,
    name: 'Home',
    component: HomeScreen,
    icon: HomeIcon,
  },
  {
    id: 2,
    name: 'Calendar',
    component: CalendarScreen,
    icon: CalenderIcon,
  },
  {
    id: 3,
    name: 'Grids',
    component: GridsScreen,
    icon: GridIcon,
  },
  {
    id: 4,
    name: 'Pages',
    component: PagesScreen,
    icon: PagesIcon,
  },
];

export default tabNavigationData;
